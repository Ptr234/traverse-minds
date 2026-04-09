import os
import io
import json
import logging
from typing import List, Optional
from datetime import datetime

import uvicorn
import easyocr
import instructor
import typesense
from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from pydantic import BaseModel, Field
from openai import OpenAI
from pdf2image import convert_from_path, convert_from_bytes
from PIL import Image
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Traverse Minds Africa - Document Ingestion Worker")

# Initialize OpenAI client with Instructor
client = instructor.patch(OpenAI(api_key=os.getenv("OPENAI_API_KEY")))

# Initialize EasyOCR reader
# English is primary, but could add Swahili ('sw'), etc.
reader = easyocr.Reader(['en'])

# Initialize Typesense client
typesense_client = typesense.Client({
    'nodes': [{
        'host': os.getenv("TYPESENSE_HOST", "localhost"),
        'port': os.getenv("TYPESENSE_PORT", "8108"),
        'protocol': os.getenv("TYPESENSE_PROTOCOL", "http")
    }],
    'api_key': os.getenv("TYPESENSE_API_KEY", "xyz"),
    'connection_timeout_seconds': 2
})

class DocumentMetadata(BaseModel):
    title: str = Field(..., description="The official title of the document")
    jurisdiction: str = Field(..., description="The country or region the document belongs to")
    document_type: str = Field(..., description="E.g., Gazette, Court Filing, Regulation")
    filing_date: Optional[str] = Field(None, description="The date the document was filed or published (YYYY-MM-DD)")
    parties_involved: List[str] = Field(default_factory=list, description="List of people, companies, or entities mentioned as primary parties")
    summary: str = Field(..., description="A concise 2-3 sentence summary of the document's content")
    key_terms: List[str] = Field(default_factory=list, description="Important legal or technical terms found in the document")

class IngestionResponse(BaseModel):
    job_id: str
    status: str
    message: str

def process_pdf_task(file_content: bytes, filename: str, jurisdiction: str):
    """
    Background task to process PDF: OCR -> LLM Structuring -> Indexing
    """
    try:
        logger.info(f"Starting processing for {filename}")
        
        # 1. Convert PDF to Images
        images = convert_from_bytes(file_content)
        
        # 2. Extract text using OCR (Process first few pages for metadata)
        full_text = ""
        # We only process up to 5 pages for metadata extraction to save costs/time
        for i, image in enumerate(images[:5]):
            # Convert PIL Image to bytes for EasyOCR
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='PNG')
            text_results = reader.readtext(img_byte_arr.getvalue(), detail=0)
            full_text += "
".join(text_results)
            
        logger.info(f"OCR completed for {filename}. Extracted {len(full_text)} characters.")

        # 3. Use LLM (Instructor) to extract structured data
        metadata = client.chat.completions.create(
            model="gpt-4o-mini",
            response_model=DocumentMetadata,
            messages=[
                {"role": "system", "content": "You are a legal document expert specializing in African government records. Extract structured metadata from the following OCR text."},
                {"role": "user", "content": f"Jurisdiction: {jurisdiction}

OCR Text:
{full_text[:12000]}"} # Limit context
            ]
        )
        
        logger.info(f"Structured metadata extracted for {filename}")

        # 4. Index into Typesense
        document_id = filename.replace(".", "_") # Simple ID generation
        
        doc_to_index = {
            "id": document_id,
            "title": metadata.title,
            "jurisdiction": metadata.jurisdiction,
            "document_type": metadata.document_type,
            "filing_date": int(datetime.strptime(metadata.filing_date, "%Y-%m-%d").timestamp()) if metadata.filing_date else 0,
            "summary": metadata.summary,
            "content": full_text,
            "tags": metadata.key_terms + metadata.parties_involved,
            "category": metadata.document_type
        }

        # Ensure collection exists (In production, this should be pre-created)
        # typesense_client.collections['documents'].documents.upsert(doc_to_index)
        
        logger.info(f"Successfully processed and ready to index: {metadata.title}")
        
        # Save results to a local JSON for audit/debug in this prototype
        with open(f"processed_{document_id}.json", "w") as f:
            json.dump(doc_to_index, f, indent=2)

    except Exception as e:
        logger.error(f"Error processing {filename}: {str(e)}")

@app.post("/ingest", response_model=IngestionResponse)
async def ingest_document(
    background_tasks: BackgroundTasks,
    jurisdiction: str,
    file: UploadFile = File(...)
):
    if not file.filename.endswith(".pdf"):
        throw HTTPException(status_code=400, detail="Only PDF files are supported")
        
    content = await file.read()
    job_id = f"job_{int(datetime.now().timestamp())}"
    
    background_tasks.add_task(process_pdf_task, content, file.filename, jurisdiction)
    
    return IngestionResponse(
        job_id=job_id,
        status="accepted",
        message="Document uploaded and processing started in background."
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
