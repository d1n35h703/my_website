import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Battery, ChevronDown, MonitorSmartphone, Plus, Search, Volume2, Wifi } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Window } from "./Window";
import { TerminalApp } from "./Terminal";
import {
  AboutApp,
  ContactApp,
  ProjectsApp,
  ServicesApp,
  SettingsApp,
  appTitles,
  dockApps,
  type AppId,
} from "./apps";
import { defaultApps, APP_CATEGORIES, getStoredApps, type AppEntry } from "./apps.config";
import { AddServiceModal } from "./AddServiceModal";

type WinState = {
  id: AppId;
  minimized: boolean;
  maximized: boolean;
  z: number;
  offset: { x: number; y: number };
};

export function UbuntuView({ onSwitchMode }: { onSwitchMode?: () => void }) {
  const [wins, setWins] = useState<WinState[]>([]);
  const [clock, setClock] = useState(() => new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState(false);
  const zRef = useRef(10);
  const spawnRef = useRef(0);
  const deskRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setApps(getStoredApps());
  }, []);

  const refreshApps = () => setApps(getStoredApps());

  const open = (id: AppId) => {
    setWins((prev) => {
      const z = ++zRef.current;
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z } : w));
      }
      const i = spawnRef.current++;
      return [
        ...prev,
        {
          id,
          minimized: false,
          maximized: false,
          z,
          offset: { x: 90 + (i % 4) * 34, y: 60 + (i % 4) * 30 },
        },
      ];
    });
  };

  const update = (id: AppId, patch: Partial<WinState>) =>
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));

  const close = (id: AppId) => setWins((prev) => prev.filter((w) => w.id !== id));
  const focus = (id: AppId) => update(id, { z: ++zRef.current });

  const visible = wins.filter((w) => !w.minimized);
  const active = visible.reduce<WinState | null>((top, w) => (!top || w.z > top.z ? w : top), null);

  const body = (id: AppId) => {
    switch (id) {
      case "terminal":
        return <TerminalApp onOpen={open} />;
      case "projects":
        return <ProjectsApp />;
      case "about":
        return <AboutApp />;
      case "services":
        return <ServicesApp />;
      case "contact":
        return <ContactApp />;
      case "settings":
        return <SettingsApp />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[oklch(0.17_0.02_30)]">
      {/* wallpaper */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-ubuntu/40 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-electric/20 blur-[140px]" />
      </div>

      {/* top bar */}
      <div className="relative z-50 flex items-center justify-between bg-zinc-950/90 px-4 py-1 text-xs text-zinc-300">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 font-medium">Activities</span>
          <span className="truncate text-zinc-400">
            {active ? appTitles[active.id] : "Desktop"}
          </span>
        </div>
        <span className="hidden shrink-0 sm:block">
          {clock.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}{" "}
          {clock.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
        </span>
        <div className="relative flex shrink-0 items-center gap-2">
          {onSwitchMode && (
            <button
              onClick={onSwitchMode}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-zinc-800"
            >
              <MonitorSmartphone className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">Agency View</span>
            </button>
          )}
          <button
            onClick={() => setSearchQuery((v) => !v)}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-zinc-800"
            title="Search apps"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-zinc-800"
            title="Add service"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <Volume2 className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <span className="flex items-center gap-1">
            <Battery className="h-3.5 w-3.5" /> 87%
          </span>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-1 rounded px-1 py-0.5 hover:bg-zinc-800"
            aria-label="User menu"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              D
            </span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-7 w-44 rounded-lg border border-border bg-card p-1 text-zinc-200 shadow-xl">
              {["visitor", "Lock screen", "Log out"].map((m) => (
                <div key={m} className="rounded px-2 py-1.5 hover:bg-secondary">
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* search overlay */}
      {searchQuery && (
        <div className="absolute inset-x-0 top-7 z-50 mx-auto max-w-lg px-4 pt-2">
          <div className="rounded-xl border border-border bg-zinc-900/95 p-3 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search apps, services..."
                className="flex-1 bg-transparent text-sm outline-none"
                onBlur={() => setSearchQuery(false)}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {APP_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <span
                  key={cat}
                  className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="mt-2 max-h-48 overflow-y-auto">
              {apps.map((app) => (
                <a
                  key={app.id}
                  href={app.url}
                  target={app.openInNewTab ? "_blank" : undefined}
                  rel={app.openInNewTab ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary transition-colors"
                >
                  <span className="text-primary text-xs">{app.icon}</span>
                  <span className="truncate">{app.title}</span>
                  {app.status && (
                    <span className="ml-auto text-[10px] text-muted-foreground">{app.status}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {isMobile ? (
        <div className="relative z-10 h-[calc(100vh-1.75rem)] space-y-3 overflow-y-auto p-4 pb-28">
          <p className="text-xs text-zinc-400">
            Small screen detected - window manager disabled. Apps shown as cards.
          </p>
          {dockApps.map((a) => (
            <details
              key={a.id}
              className="rounded-xl border border-border bg-card/80 backdrop-blur-md"
            >
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm">
                <a.icon className="h-4 w-4 text-primary" /> {a.label}
              </summary>
              <div className="border-t border-border">{body(a.id)}</div>
            </details>
          ))}

          {/* Custom apps section */}
          {apps.filter((a) => !dockApps.some((d) => d.id === a.id)).length > 0 && (
            <>
              <p className="text-xs text-zinc-500 pt-2">Custom Services</p>
              {apps
                .filter((a) => !dockApps.some((d) => d.id === a.id))
                .map((app) => (
                  <a
                    key={app.id}
                    href={app.url}
                    target={app.openInNewTab ? "_blank" : undefined}
                    rel={app.openInNewTab ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/80 p-4 backdrop-blur-md"
                  >
                    <span className="text-xs text-primary">{app.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm">{app.title}</span>
                      <span className="block text-xs text-muted-foreground truncate">
                        {app.description}
                      </span>
                    </div>
                    {app.status && (
                      <span className="text-[10px] text-muted-foreground">{app.status}</span>
                    )}
                  </a>
                ))}
            </>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-xs text-muted-foreground hover:bg-secondary/50"
          >
            <Plus className="h-3.5 w-3.5" /> Add Service
          </button>
        </div>
      ) : (
        <>
          {/* dock */}
          <div className="absolute left-3 top-1/2 z-40 -translate-y-1/2">
            <div className="flex flex-col gap-2 rounded-2xl border border-border bg-zinc-900/70 p-2 backdrop-blur-md">
              {dockApps.map((a) => (
                <m.button
                  key={a.id}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => open(a.id)}
                  aria-label={`Open ${a.label}`}
                  title={a.label}
                  className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors ${
                    wins.some((w) => w.id === a.id)
                      ? "border-primary/60 bg-primary/15 text-primary"
                      : "border-transparent bg-zinc-800/70 text-zinc-300 hover:text-primary"
                  }`}
                >
                  <a.icon className="h-5 w-5" />
                </m.button>
              ))}
              {/* Add service button in dock */}
              <m.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                aria-label="Add service"
                title="Add service"
                className="grid h-11 w-11 place-items-center rounded-xl border border-dashed border-zinc-700 bg-zinc-800/40 text-zinc-500 hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </m.button>
            </div>
          </div>

          {/* desktop */}
          <div ref={deskRef} className="absolute inset-0 top-7 z-10">
            <AnimatePresence>
              {visible.map((w) => (
                <Window
                  key={w.id}
                  title={appTitles[w.id]}
                  zIndex={w.z}
                  isMaximized={w.maximized}
                  offset={w.offset}
                  constraintsRef={deskRef}
                  onFocus={() => focus(w.id)}
                  onClose={() => close(w.id)}
                  onMinimize={() => update(w.id, { minimized: true })}
                  onMaximize={() => update(w.id, { maximized: !w.maximized })}
                >
                  {body(w.id)}
                </Window>
              ))}
            </AnimatePresence>

            {wins.length === 0 && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
                <div>
                  <p className="text-sm text-zinc-400">
                    Double-click the dock to launch an app
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    or start with the Terminal and type <span className="text-primary">help</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* minimized tray */}
          {wins.some((w) => w.minimized) && (
            <div className="absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 gap-2 rounded-xl border border-border bg-zinc-900/80 p-2 backdrop-blur-md">
              {wins
                .filter((w) => w.minimized)
                .map((w) => (
                  <button
                    key={w.id}
                    onClick={() => open(w.id)}
                    className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:text-primary"
                  >
                    {w.id}
                  </button>
                ))}
            </div>
          )}
        </>
      )}

      {/* Add Service modal */}
      <AddServiceModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={refreshApps}
      />
    </div>
  );
}
