// Security services: the seed source for Sanity "service" documents and the fallback when Sanity is unreachable.
// Edit the live copy in Sanity Studio; change this file only to alter the defaults.
export type ServiceContent = {
  slug: string;
  sortOrder: number;
  title: string;
  description: string;
  image: string;
  overview: string;
  features: { title: string; description: string }[];
  benefits: string[];
};

export const SERVICES: ServiceContent[] = [
  {
    "slug": "penetration-testing",
    "sortOrder": 1,
    "title": "Penetration Testing",
    "description": "Simulated attacks on your networks, applications, and infrastructure to identify vulnerabilities before real attackers do.",
    "image": "/imagestouse/cyber.jpg",
    "overview": "Our penetration testing services go beyond automated scanning. We simulate real-world attack patterns to identify security gaps in your infrastructure, web applications, and mobile platforms. By thinking like an adversary, we help you fix vulnerabilities before they can be exploited by malicious actors.",
    "features": [
      {
        "title": "Network Infrastructure Testing",
        "description": "Comprehensive assessment of internal and external networks, including wireless infrastructure and cloud environments."
      },
      {
        "title": "Web & Mobile App Testing",
        "description": "Deep-dive analysis of your applications to identify OWASP Top 10 vulnerabilities and logic flaws."
      },
      {
        "title": "API Security Assessment",
        "description": "Rigorous testing of your backend services and integrations to ensure data integrity and secure communication."
      },
      {
        "title": "Social Engineering",
        "description": "Testing your human firewall through phishing simulations and physical security assessments."
      }
    ],
    "benefits": [
      "Identify high-risk vulnerabilities before a breach",
      "Meet regulatory compliance requirements (BoU, PDPA)",
      "Detailed remediation roadmap for your IT team",
      "Validate the effectiveness of existing security controls"
    ]
  },
  {
    "slug": "iso-27001-compliance",
    "sortOrder": 2,
    "title": "ISO 27001 Compliance",
    "description": "End-to-end support for achieving and maintaining ISO 27001 certification -- gap analysis, documentation, and audit preparation.",
    "image": "/imagestouse/vde.jpeg",
    "overview": "ISO 27001 is the international standard for information security management systems (ISMS). We provide comprehensive guidance to help your organisation implement the necessary controls, documentation, and processes to achieve and maintain this prestigious certification.",
    "features": [
      {
        "title": "Gap Analysis",
        "description": "Initial assessment to identify where your current security posture stands against ISO 27001 requirements."
      },
      {
        "title": "ISMS Implementation",
        "description": "Designing and deploying a robust Information Security Management System tailored to your business operations."
      },
      {
        "title": "Documentation Support",
        "description": "Assistance in developing all required policies, procedures, and records for the certification process."
      },
      {
        "title": "Internal Audit & Training",
        "description": "Conducting pre-certification audits and training your staff on ISO 27001 standards and responsibilities."
      }
    ],
    "benefits": [
      "Global recognition of your security standards",
      "Enhanced customer trust and competitive advantage",
      "Systematic management of information security risks",
      "Easier compliance with local and international regulations"
    ]
  },
  {
    "slug": "bank-of-uganda-audit",
    "sortOrder": 3,
    "title": "Bank of Uganda Audit",
    "description": "Cybersecurity assessments aligned with Bank of Uganda regulatory requirements for supervised financial institutions.",
    "image": "/imagestouse/bfe.jpeg",
    "overview": "Financial institutions in Uganda must adhere to strict cybersecurity guidelines issued by the Bank of Uganda. We provide specialized audit services to ensure your organization meets all regulatory mandates, from risk management to incident reporting protocols.",
    "features": [
      {
        "title": "Regulatory Compliance Audit",
        "description": "Review of your cybersecurity framework against the latest BoU guidelines for supervised financial institutions."
      },
      {
        "title": "Third-Party Risk Assessment",
        "description": "Assessing the security posture of your vendors and service providers as required by financial regulations."
      },
      {
        "title": "BOU Guideline Alignment",
        "description": "Ensuring all security controls, from access management to encryption, align with specific BoU technical requirements."
      },
      {
        "title": "Audit Reporting",
        "description": "Preparation of detailed audit reports and remediation plans suitable for submission to regulatory bodies."
      }
    ],
    "benefits": [
      "Avoid regulatory penalties and sanctions",
      "Strengthen the security of financial transactions",
      "Identify and mitigate systemic financial risks",
      "Demonstrate commitment to financial sector stability"
    ]
  },
  {
    "slug": "threat-modelling",
    "sortOrder": 4,
    "title": "Threat Modelling",
    "description": "Systematic identification of threats to your systems and data, with prioritised mitigation strategies.",
    "image": "/imagestouse/div-cybersecurity.jpeg",
    "overview": "Threat modelling is a proactive approach to security that identifies potential threats at the design stage. By mapping out your systems and data flows, we help you understand where your most critical assets are vulnerable and how to protect them effectively.",
    "features": [
      {
        "title": "Asset Identification",
        "description": "Cataloguing all critical data, systems, and users within your organization's scope."
      },
      {
        "title": "Attack Surface Mapping",
        "description": "Visualizing all potential entry points and communication paths that an attacker could exploit."
      },
      {
        "title": "Threat Analysis",
        "description": "Using frameworks like STRIDE to systematically identify potential security threats to each component."
      },
      {
        "title": "Mitigation Planning",
        "description": "Developing prioritized strategies to address identified threats based on risk and impact."
      }
    ],
    "benefits": [
      "Secure by design -- identify flaws before code is written",
      "Cost-effective security by focusing on high-risk areas",
      "Better communication between security and development teams",
      "Informed decision-making for security investments"
    ]
  },
  {
    "slug": "incident-response",
    "sortOrder": 5,
    "title": "Incident Response",
    "description": "Rapid containment, investigation, and recovery when a breach occurs. 24-hour response commitment.",
    "image": "/imagestouse/tec.jpg",
    "overview": "In the event of a security breach, every second counts. Our incident response team provides rapid support to contain threats, investigate the root cause, and restore your operations securely. We offer a 24-hour commitment to ensure your business resilience.",
    "features": [
      {
        "title": "Threat Containment",
        "description": "Immediate actions to isolate compromised systems and prevent further damage or data exfiltration."
      },
      {
        "title": "Forensic Investigation",
        "description": "Deep-dive analysis to understand how the breach occurred and what data was accessed."
      },
      {
        "title": "Recovery & Restoration",
        "description": "Safe restoration of systems and data from backups, ensuring no persistent threats remain."
      },
      {
        "title": "Post-Incident Analysis",
        "description": "Detailed report with recommendations to prevent future occurrences and improve security posture."
      }
    ],
    "benefits": [
      "Minimize financial and reputational damage",
      "Expert guidance through high-pressure situations",
      "Compliance with data breach notification laws (PDPA)",
      "Improved resilience against future attacks"
    ]
  },
  {
    "slug": "regulatory-advisory",
    "sortOrder": 6,
    "title": "Regulatory Advisory",
    "description": "Expert guidance on Uganda PDPA 2019, NIST, and African data protection frameworks.",
    "image": "/imagestouse/tra.jpeg",
    "overview": "Navigating the complex landscape of data protection and cybersecurity regulations is a challenge for any organization. We provide expert advisory services to ensure you comply with the Uganda Data Protection and Privacy Act 2019, NIST, and other regional frameworks.",
    "features": [
      {
        "title": "Uganda PDPA 2019 Compliance",
        "description": "Comprehensive review and implementation support for the Data Protection and Privacy Act requirements."
      },
      {
        "title": "NIST Framework Alignment",
        "description": "Adopting the NIST Cybersecurity Framework to improve your organization's security posture and resilience."
      },
      {
        "title": "African Data Protection",
        "description": "Guidance on cross-border data transfer and compliance with various African data protection laws."
      },
      {
        "title": "Policy Development",
        "description": "Creating and updating organizational policies to reflect the latest regulatory requirements and best practices."
      }
    ],
    "benefits": [
      "Ensure legal compliance and avoid heavy fines",
      "Standardize security practices across your organization",
      "Build trust with partners and regulators",
      "Stay ahead of evolving regulatory requirements"
    ]
  }
];
