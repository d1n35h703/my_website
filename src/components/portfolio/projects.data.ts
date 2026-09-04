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
    id: "sentinelai-ids",
    title: "SentinelAI",
    category: "Intrusion Detection",
    description:
      "ML-powered network intrusion detection system using Random Forest and MLP ensembles with rule-based fallback and CICIDS2017-compatible feature extraction.",
    longDescription:
      "A network-based IDS that classifies traffic using Random Forest and MLP ensembles with a rule-based fallback. Extracts CICIDS2017-compatible feature vectors from live packet capture or PCAP files and generates correlated, deduplicated alerts. Includes a Flask dashboard for real-time monitoring and a FastAPI REST API for integration.",
    tags: ["Python", "Scikit-learn", "Flask", "FastAPI", "Scapy"],
    githubUrl: "https://github.com/dibbadadinesh/SentinelAI-IDS",
    metrics: "98% detection rate",
    status: "Live",
  },
  {
    id: "vulnhawk-pentest",
    title: "VulnHawk",
    category: "Penetration Testing",
    description:
      "Automated web application vulnerability scanner that crawls targets, injects payloads, and detects SQLi, XSS, path traversal, and CSRF with CVSS v3.1 scoring.",
    longDescription:
      "An automated web application vulnerability scanner that crawls targets, injects payloads, and detects SQL injection, XSS, path traversal, CSRF, and security header misconfigurations. Scores results with CVSS v3.1 and generates audit-ready HTML and JSON reports.",
    tags: ["Python", "AsyncIO", "aiohttp", "BeautifulSoup", "CVSS"],
    githubUrl: "https://github.com/dibbadadinesh/VulnHawk-Pentest",
    metrics: "6 vuln classes detected",
    status: "Live",
  },
  {
    id: "cloudshield-cspm",
    title: "CloudShield",
    category: "Cloud Security Posture",
    description:
      "Multi-cloud CSPM tool detecting misconfigurations across AWS, Azure, and GCP using a YAML policy engine mapped to CIS, NIST, SOC2, PCI-DSS, and HIPAA frameworks.",
    longDescription:
      "A multi-cloud CSPM tool that detects misconfigurations across AWS, Azure, and GCP using a YAML policy rule engine. Maps findings to CIS, NIST, SOC2, PCI-DSS, and HIPAA compliance frameworks with a Flask dashboard API for reporting and remediation tracking.",
    tags: ["Python", "boto3", "Azure SDK", "GCP SDK", "Flask"],
    githubUrl: "https://github.com/dibbadadinesh/CloudShield-CSPM",
    metrics: "37 security rules",
    status: "Live",
  },
  {
    id: "packetprobe-forensics",
    title: "PacketProbe",
    category: "Network Forensics",
    description:
      "Network forensics toolkit for PCAP analysis, session reconstruction, protocol-level traffic analysis, IOC extraction, and chain-of-custody evidence management.",
    longDescription:
      "A network forensics toolkit for PCAP analysis, TCP/UDP session reconstruction, protocol-level traffic analysis (HTTP, DNS, SMTP), IOC extraction, chronological timeline building, and evidence management with chain-of-custody documentation and hash verification.",
    tags: ["Python", "Scapy", "PyYAML", "Forensics", "Evidence"],
    githubUrl: "https://github.com/dibbadadinesh/PacketProbe-Forensics",
    metrics: "Full chain-of-custody",
    status: "WIP",
  },
  {
    id: "riskmatrix-grc",
    title: "RiskMatrix",
    category: "Governance, Risk & Compliance",
    description:
      "GRC platform with 5x5 risk scoring matrix, compliance assessments against NIST CSF, ISO 27001, and SOC 2, and policy lifecycle management.",
    longDescription:
      "A GRC platform for security risk management with a 5x5 likelihood/impact risk scoring matrix, compliance assessments against NIST CSF, ISO 27001, and SOC 2. Features policy lifecycle management with state machine transitions and JSONL audit logging.",
    tags: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "GRC"],
    githubUrl: "https://github.com/dibbadadinesh/RiskMatrix-GRC",
    metrics: "12 REST endpoints",
    status: "Live",
  },
  {
    id: "alertforge-siem",
    title: "AlertForge",
    category: "SIEM",
    description:
      "SIEM system with multi-format log ingestion, 13 detection rules, noise reduction, alert correlation into incidents, and Signal mobile notifications.",
    longDescription:
      "A SIEM system with multi-format log ingestion (syslog, JSON, raw text), 13 built-in detection rules, noise reduction via whitelisting and deduplication, alert correlation into incidents, and Signal mobile notifications for critical alerts. Docker Compose ready with optional Elasticsearch and Kibana integration.",
    tags: ["Python", "FastAPI", "Docker", "Elasticsearch", "Signal"],
    githubUrl: "https://github.com/dibbadadinesh/AlertForge-SIEM",
    metrics: "13 detection rules",
    status: "Live",
  },
];
