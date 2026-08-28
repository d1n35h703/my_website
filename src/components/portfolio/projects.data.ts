export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  previewImage?: string;
  githubUrl: string;
  metrics?: string;
  status: "Live" | "WIP" | "Archived";
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "soc-alert-triage",
    title: "SOC Alert Triage Dashboard",
    category: "Security Operations",
    description:
      "Real-time alert triage system processing SIEM telemetry with automated SLA tracking and escalation workflows.",
    longDescription:
      "Built a centralized dashboard for SOC analysts to triage, prioritize, and track security alerts across multiple data sources. Includes automated SLA compliance monitoring and escalation path visualization.",
    tags: ["SIEM", "Python", "React", "Threat Detection"],
    githubUrl: "https://github.com/dibbadadinesh",
    metrics: "15% faster response",
    status: "Live",
  },
  {
    id: "sap-access-governance",
    title: "SAP Access Governance",
    category: "Identity & Access Management",
    description:
      "Automated SoD control monitoring and access risk analysis across SAP GRC with real-time violation alerts.",
    longDescription:
      "Designed and implemented a comprehensive access governance framework for SAP environments, automating Segregation of Duties checks and reducing policy violations by 65%.",
    tags: ["SAP GRC", "ARA", "EAM", "ABAP"],
    githubUrl: "https://github.com/dibbadadinesh",
    metrics: "65% fewer violations",
    status: "Live",
  },
  {
    id: "vuln-scanner",
    title: "Vulnerability Scanner CLI",
    category: "Security Tooling",
    description:
      "CLI tool wrapping Tenable Nessus and Nmap for automated vulnerability assessment with structured JSON reporting.",
    longDescription:
      "A command-line vulnerability assessment tool that orchestrates Nessus scans, parses results, and generates audit-ready remediation tickets aligned with ITIL workflows.",
    tags: ["Python", "Nessus", "Nmap", "JSON"],
    githubUrl: "https://github.com/dibbadadinesh",
    status: "WIP",
  },
  {
    id: "forensics-toolkit",
    title: "Digital Forensics Toolkit",
    category: "Incident Response",
    description:
      "Evidence collection and disk image analysis scripts for internal investigations with chain-of-custody logging.",
    longDescription:
      "A forensic analysis toolkit built for internal incident response, supporting disk image mounting, evidence hashing, timeline reconstruction, and structured evidence reporting.",
    tags: ["Python", "Autopsy", "Linux", "Forensics"],
    githubUrl: "https://github.com/dibbadadinesh",
    status: "WIP",
  },
  {
    id: "portfolio-os",
    title: "Portfolio OS",
    category: "Creative",
    description:
      "Linux desktop-inspired interactive portfolio built with TanStack Start, Framer Motion, and Three.js.",
    longDescription:
      "The portfolio you're viewing - a fully interactive Linux desktop environment rendered in the browser, complete with a window manager, terminal emulator, and app launcher.",
    tags: ["React", "TypeScript", "Three.js", "TanStack"],
    githubUrl: "https://github.com/dibbadadinesh",
    status: "Live",
  },
];
