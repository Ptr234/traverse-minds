// Organisations on the Meet Christine page: seed source for Sanity "organisation" documents and the offline fallback.
export type OrganisationContent = { name: string; role: string; description: string; logo: string; website: string; sortOrder: number };

export const ORGANISATIONS: OrganisationContent[] = [
  {
    "name": "Uganda Investment Authority",
    "role": "Information Security Specialist",
    "description": "Leading cybersecurity initiatives for Uganda's primary investment promotion agency. Strengthened national digital infrastructure by implementing vulnerability management across 15+ government portals, reducing exposure by 60%.",
    "logo": "/logo/uganda-investment-authority-uia-logo-png_seeklogo-548098.png",
    "website": "https://www.ugandainvest.go.ug/",
    "sortOrder": 1
  },
  {
    "name": "Centenary Bank",
    "role": "Cyber Security Consultant",
    "description": "Conducted deep-dive security assessments and penetration testing for mobile banking platforms, ensuring compliance with Bank of Uganda's stringent cybersecurity guidelines.",
    "logo": "/logo/centenary-bank-logo.png",
    "website": "https://www.centenarybank.co.ug/",
    "sortOrder": 2
  },
  {
    "name": "Tilenga Project",
    "role": "Information Security Advisor",
    "description": "Providing strategic security guidance for critical infrastructure digital systems in the energy sector, focusing on threat modeling and industrial control systems (ICS) protection.",
    "logo": "/logo/Tilengalogo.png",
    "website": "",
    "sortOrder": 3
  },
  {
    "name": "Applied Principles Consulting",
    "role": "Digital Forensics Analyst & Lead IT Security Operations",
    "description": "Managed 15+ digital forensic investigations in financial fraud cases, recovering $2M+ in assets. Led cross-sector security assessments spanning banking, telecommunications, and government.",
    "logo": "/logo/Appliedprincipleslogo.png",
    "website": "",
    "sortOrder": 4
  },
  {
    "name": "NITA-U",
    "role": "Information Security Graduate Trainee",
    "description": "Co-developed the National Information Security Framework (NISF) and established national CERT capabilities. Trained 300+ government personnel on encryption and web application security.",
    "logo": "/logo/NITA.LOGOS8-07.png",
    "website": "https://www.nita.go.ug/",
    "sortOrder": 5
  },
  {
    "name": "Kikorongo Safari Lodge",
    "role": "Founder & CEO",
    "description": "Established a luxury eco-tourism venture creating 30+ direct employment opportunities. Designed 15 unique accommodation facilities across 15 hectares, promoting environmental conservation.",
    "logo": "/logo/kikorongologo.png",
    "website": "https://kikorongosafarilodge.com",
    "sortOrder": 6
  },
  {
    "name": "TMFE Group, Sydney",
    "role": "Cyber Security Consultant",
    "description": "Provided strategic cybersecurity guidance for digital transformation initiatives. Authored 6 technical papers on IoT security, ML applications, and threat modeling for C-suite decision-making.",
    "logo": "/logo/logo-TMFE-Black.svg",
    "website": "",
    "sortOrder": 7
  },
  {
    "name": "H&G Advocates",
    "role": "Cyber Security Consultant",
    "description": "Advising the firm on cyber law, data protection, and privacy compliance—bridging legal practice with technical security to guide clients through Uganda's Data Protection and Privacy Act and emerging digital regulations.",
    "logo": "/logo/hg-advocates-logo.svg",
    "website": "",
    "sortOrder": 8
  }
];
