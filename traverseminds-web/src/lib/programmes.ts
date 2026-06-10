export interface Programme {
  id: string;
  slug: string;
  title: string;
  audience: "students" | "business" | "teachers" | "government";
  duration: string;
  format: string;
  description: string;
  longDescription: string;
  topics: string[];
  learningOutcomes: string[];
  image: string;
  secondaryImage: string;
  color: string;
}

export const programmes: Programme[] = [
  {
    id: "1",
    slug: "cybersafe-schools",
    title: "CyberSafe Schools",
    audience: "students",
    duration: "4 Weeks",
    format: "In-person Workshops",
    description: "Equipping students with the skills to identify online grooming, cyberbullying, and misinformation.",
    longDescription: "Our CyberSafe Schools programme is designed to empower the next generation with the critical thinking skills needed to navigate the digital world safely. We move beyond basic 'don't talk to strangers' advice to provide practical, hands-on training that addresses the real-world challenges students face online today.",
    topics: ["Password Safety", "Privacy Settings", "Digital Footprint", "Online Grooming Awareness", "Cyberbullying Prevention", "Fact-checking & Misinformation"],
    learningOutcomes: [
      "Understand how to create and manage unbreakable passwords.",
      "Identify the warning signs of online grooming and exploitation.",
      "Recognize and safely report cyberbullying incidents.",
      "Manage their digital footprint to protect future opportunities.",
      "Critically evaluate information found on social media."
    ],
    image: "/imagestouse/Digital Literacy.jpeg",
    secondaryImage: "/imagestouse/use/learn.jpg",
    color: "#ff4c00"
  },
  {
    id: "2",
    slug: "sme-security-essentials",
    title: "SME Security Essentials",
    audience: "business",
    duration: "2 Days",
    format: "Intensive Boot Camp",
    description: "Practical security training for business owners and employees. From phishing to basic encryption.",
    longDescription: "Small and Medium Enterprises are increasingly targeted by cybercriminals. This intensive boot camp provides business owners and their teams with the essential tools and knowledge to protect their assets, customer data, and reputation without requiring a massive IT budget.",
    topics: ["Phishing Awareness", "Device Security", "Data Backups", "Basic Encryption", "Secure Payments", "Incident Response for Small Business"],
    learningOutcomes: [
      "Implement a basic but robust security policy for the workplace.",
      "Secure business devices and accounts with multi-factor authentication.",
      "Identify and avoid sophisticated social engineering attacks.",
      "Set up automated and secure data backup routines.",
      "Respond effectively to a security breach or data loss."
    ],
    image: "/imagestouse/bfe.jpeg",
    secondaryImage: "/imagestouse/use/learn (1).jpg",
    color: "#ff4c00"
  },
  {
    id: "3",
    slug: "digital-safety-for-educators",
    title: "Digital Safety for Educators",
    audience: "teachers",
    duration: "1 Week",
    format: "Hybrid (Online + In-person)",
    description: "Training teachers to integrate digital citizenship and online safety into their daily curriculum.",
    longDescription: "Educators are on the front lines of the digital revolution. This programme equips teachers with the confidence and resources to teach digital citizenship and online safety as an integral part of any subject, while also securing their own professional digital presence.",
    topics: ["Classroom Policy", "Online Resources", "Parent Engagement", "Digital Citizenship Curriculum", "Teacher Privacy", "Educational Technology Risks"],
    learningOutcomes: [
      "Develop and implement a digital safety policy for the classroom.",
      "Access and utilize high-quality digital citizenship resources.",
      "Engage parents in meaningful conversations about online safety.",
      "Protect their professional reputation and privacy online.",
      "Safely evaluate and implement educational technology tools."
    ],
    image: "/imagestouse/tra.jpeg",
    secondaryImage: "/imagestouse/use/learn (2).jpg",
    color: "#ff4c00"
  },
  {
    id: "4",
    slug: "public-sector-cyber-literacy",
    title: "Public Sector Cyber Literacy",
    audience: "government",
    duration: "3 Days",
    format: "Closed Workshop",
    description: "Critical security awareness for government staff handling sensitive citizen data and public services.",
    longDescription: "Public sector employees handle some of the most sensitive data in the country. This specialized workshop focuses on the unique security requirements and compliance standards of government service, emphasizing the protection of citizen privacy and the continuity of public services.",
    topics: ["Information Handling", "Social Engineering", "Compliance", "Data Privacy Laws (PDPA)", "Secure Communication", "Insider Threat Awareness"],
    learningOutcomes: [
      "Understand and apply government data classification and handling rules.",
      "Recognize social engineering tactics targeting public officials.",
      "Ensure compliance with national data protection regulations.",
      "Use secure communication channels for sensitive official business.",
      "Identify and report potential security vulnerabilities within their department."
    ],
    image: "/imagestouse/cyber.jpg",
    secondaryImage: "/imagestouse/use/learn (3).jpg",
    color: "#ff4c00"
  }
];
