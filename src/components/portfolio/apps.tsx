import { Cpu, Folder, Mail, Settings, Terminal, User } from "lucide-react";
import { aboutText, contact, experience, projects, services, stats } from "./data";

export type AppId = "terminal" | "projects" | "about" | "services" | "contact" | "settings";

export const dockApps: { id: AppId; label: string; icon: typeof Terminal }[] = [
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
];

export const appTitles: Record<AppId, string> = {
  terminal: "visitor@portfolio: ~",
  projects: "Files - Projects",
  about: "about.txt - Text Editor",
  services: "services.sh - System",
  contact: "Contact",
  settings: "Settings",
};

export function ProjectsApp() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      {projects.map((p) => (
        <div key={p.name} className="rounded-lg border border-border bg-background/50 p-4">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-primary" />
            <span className="font-medium">{p.name}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
          <div className="mt-2 text-xs text-primary">{p.metric}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span
                key={t}
                className="rounded bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutApp() {
  return (
    <div className="p-4">
      <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{aboutText}</pre>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border p-3">
            <div className="text-lg font-bold text-primary">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {experience.map((e) => (
          <div key={e.role} className="text-sm">
            <span className="text-xs text-muted-foreground">{e.year}</span> - {e.role}
            <div className="text-xs text-muted-foreground">{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesApp() {
  return (
    <div className="space-y-3 p-4 text-sm">
      {services.map((s) => (
        <div key={s.id} className="rounded-lg border border-border bg-background/50 p-4">
          <div className="text-primary">$ ./{s.id}.sh</div>
          <div className="mt-1 font-semibold">{s.title}</div>
          <p className="mt-1 text-muted-foreground">{s.body}</p>
          <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">
            {s.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ContactApp() {
  return (
    <div className="space-y-3 p-4 text-sm">
      <p className="text-muted-foreground">Reach me on any of these channels:</p>
      <div className="space-y-2 font-mono">
        <div>
          <span className="text-primary">email</span> - {contact.email}
        </div>
        <div>
          <span className="text-primary">github</span> - {contact.github}
        </div>
        <div>
          <span className="text-primary">linkedin</span> - {contact.linkedin}
        </div>
        <div>
          <span className="text-primary">location</span> - {contact.location}
        </div>
      </div>
      <a
        href={`mailto:${contact.email}`}
        className="mt-2 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Compose email
      </a>
    </div>
  );
}

export function SettingsApp() {
  return (
    <div className="space-y-3 p-4 text-sm">
      <div className="rounded-lg border border-border p-4">
        <div className="font-medium">portfolio-os 24.04 LTS</div>
        <div className="mt-1 text-xs text-muted-foreground">
          GNOME 46 · React 19 · TanStack Start
        </div>
      </div>
      <div className="rounded-lg border border-border p-4 text-xs text-muted-foreground">
        Tip: drag window title bars, use the dock to launch apps, or type
        <span className="text-primary"> help </span> in the terminal.
      </div>
    </div>
  );
}
