"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BulkTrainingModal } from "./BulkTrainingModal";

export function BulkTrainingQuoteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        Request Bulk Training Quote
        <ArrowRight className="h-4 w-4" />
      </Button>

      <BulkTrainingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
