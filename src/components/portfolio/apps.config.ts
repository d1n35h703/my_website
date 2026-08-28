export interface AppEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  url: string;
  openInNewTab: boolean;
  pinned?: boolean;
  status?: "Live" | "Self-Hosted" | "WIP";
}

export const defaultApps: AppEntry[] = [
  {
    id: "siem-dashboard",
    title: "SIEM Dashboard",
    category: "Security Operations",
    description: "Real-time security event monitoring and alert management console.",
    icon: "Shield",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    pinned: true,
    status: "Live",
  },
  {
    id: "soc-alert-triage",
    title: "SOC Alert Triage",
    category: "Security Operations",
    description: "Automated alert triage with SLA tracking and escalation workflows.",
    icon: "AlertTriangle",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "Live",
  },
  {
    id: "vuln-scanner",
    title: "Vuln Scanner",
    category: "Security Operations",
    description: "CLI tool wrapping Nessus and Nmap for vulnerability assessments.",
    icon: "Scan",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "WIP",
  },
  {
    id: "sap-grc",
    title: "SAP GRC Console",
    category: "Infrastructure & Tools",
    description: "Access governance and SoD control monitoring for SAP environments.",
    icon: "Lock",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "Live",
  },
  {
    id: "forensics-toolkit",
    title: "Forensics Toolkit",
    category: "Incident Response",
    description: "Evidence collection and disk analysis for internal investigations.",
    icon: "Search",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "WIP",
  },
  {
    id: "portfolio",
    title: "Portfolio OS",
    category: "Personal Projects",
    description: "Linux desktop-inspired interactive portfolio website.",
    icon: "Monitor",
    url: "#",
    openInNewTab: false,
    pinned: true,
    status: "Live",
  },
  {
    id: "threat-intel",
    title: "Threat Intel Feed",
    category: "AI & Automation",
    description: "Automated threat intelligence aggregation and IOC extraction.",
    icon: "Rss",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "WIP",
  },
  {
    id: "playbook-runner",
    title: "Playbook Runner",
    category: "AI & Automation",
    description: "Automated incident response playbook orchestration engine.",
    icon: "Play",
    url: "https://github.com/dibbadadinesh",
    openInNewTab: true,
    status: "WIP",
  },
];

export const APP_CATEGORIES = [
  "All",
  "Security Operations",
  "Infrastructure & Tools",
  "Incident Response",
  "AI & Automation",
  "Personal Projects",
];

export function getStoredApps(): AppEntry[] {
  if (typeof window === "undefined") return defaultApps;
  try {
    const stored = localStorage.getItem("portfolio-custom-apps");
    if (stored) {
      const parsed = JSON.parse(stored) as AppEntry[];
      const ids = new Set(defaultApps.map((a) => a.id));
      const userApps = parsed.filter((a) => !ids.has(a.id));
      return [...defaultApps, ...userApps];
    }
  } catch {
    // localStorage unavailable or parse error - fall through to defaults
  }
  return defaultApps;
}

export function saveCustomApp(app: AppEntry): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredApps();
    const filtered = existing.filter((a) => a.id !== app.id);
    filtered.push(app);
    localStorage.setItem("portfolio-custom-apps", JSON.stringify(filtered));
  } catch {
    // silently ignore storage failures
  }
}

export function removeCustomApp(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredApps().filter((a) => a.id !== id);
    localStorage.setItem("portfolio-custom-apps", JSON.stringify(existing));
  } catch {
    // silently ignore storage failures
  }
}
