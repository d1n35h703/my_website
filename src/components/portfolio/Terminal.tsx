import { useEffect, useRef, useState, type ReactNode } from "react";
import { aboutText, contact, profile, projects, services, terminalFiles } from "./data";
import type { AppId } from "./apps";

type Line = { id: number; content: ReactNode };

const FILES = terminalFiles;

export function TerminalApp({ onOpen }: { onOpen: (app: AppId) => void }) {
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      content: (
        <span className="text-muted-foreground">
          Welcome to {profile.name}'s portfolio-os 24.04 LTS. Type{" "}
          <b className="text-primary">help</b> to begin.
        </span>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const idRef = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const push = (content: ReactNode) => setLines((l) => [...l, { id: idRef.current++, content }]);

  const link = (label: string, app: AppId) => (
    <button
      onClick={() => onOpen(app)}
      className="text-electric underline underline-offset-2 hover:text-primary"
    >
      {label}
    </button>
  );

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(
      <span>
        <span className="text-primary">{profile.handle}@portfolio</span>
        <span className="text-muted-foreground">:~$ </span>
        {cmd}
      </span>,
    );
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");

    switch (name) {
      case "":
        break;
      case "help":
        push(
          <div className="space-y-1">
            <div>
              <b className="text-primary">ls</b> - list files
            </div>
            <div>
              <b className="text-primary">cat &lt;file&gt;</b> - print a file (try cat about.txt)
            </div>
            <div>
              <b className="text-primary">projects</b> - list featured builds
            </div>
            <div>
              <b className="text-primary">contact</b> - open the contact window
            </div>
            <div>
              <b className="text-primary">open &lt;app&gt;</b> - projects | about | services |
              contact | terminal
            </div>
            <div>
              <b className="text-primary">clear</b> - clear the screen
            </div>
          </div>,
        );
        break;
      case "ls":
        push(
          <div className="flex flex-wrap gap-4">
            {FILES.map((f) => (
              <span key={f} className="text-electric">
                {f}
              </span>
            ))}
          </div>,
        );
        break;
      case "cat":
        if (arg === "about.txt") {
          push(<pre className="whitespace-pre-wrap">{aboutText}</pre>);
        } else if (arg === "services.sh") {
          push(
            <div className="space-y-1">
              {services.map((s) => (
                <div key={s.id}>
                  #!/{s.label} - {s.body}
                </div>
              ))}
            </div>,
          );
        } else if (arg === "contact.exe") {
          push(<span>Binary file. {link("Run it", "contact")} instead.</span>);
        } else if (arg === "projects.app") {
          push(<span>Application bundle. {link("Launch projects", "projects")}.</span>);
        } else {
          push(
            <span className="text-destructive">cat: {arg || "missing operand"}: No such file</span>,
          );
        }
        break;
      case "projects":
        push(
          <div className="space-y-1">
            {projects.map((p) => (
              <div key={p.name}>
                <span className="text-primary">{p.name}</span> - {p.blurb}{" "}
                <span className="text-muted-foreground">({p.metric})</span>
              </div>
            ))}
            <div>{link("Open the projects window", "projects")}</div>
          </div>,
        );
        break;
      case "contact":
        onOpen("contact");
        push(
          <div className="space-y-1">
            <div>email - {contact.email}</div>
            <div>github - {contact.github}</div>
            <div>location - {contact.location}</div>
            <div>{link("Open contact.exe", "contact")}</div>
          </div>,
        );
        break;
      case "open": {
        const valid: AppId[] = ["projects", "about", "services", "contact", "terminal", "settings"];
        if (valid.includes(arg as AppId)) {
          onOpen(arg as AppId);
          push(<span>Launching {arg}…</span>);
        } else {
          push(
            <span className="text-destructive">
              open: unknown app "{arg}". Try {valid.join(", ")}.
            </span>,
          );
        }
        break;
      }
      case "clear":
        setLines([]);
        return;
      default:
        push(
          <span className="text-destructive">
            {name}: command not found. Type <b className="text-primary">help</b>.
          </span>,
        );
    }
  };

  return (
    <div
      className="h-full bg-zinc-950/95 p-3 text-[13px] leading-relaxed text-zinc-200"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {lines.map((l) => (
          <div key={l.id}>{l.content}</div>
        ))}
      </div>
      <form
        className="mt-1 flex items-center gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
      >
        <span className="shrink-0">
          <span className="text-primary">{profile.handle}@portfolio</span>
          <span className="text-muted-foreground">:~$</span>
        </span>
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent outline-none"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
