import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus, X } from "lucide-react";
import { type AppEntry, saveCustomApp } from "./apps.config";

const ICON_OPTIONS = [
  "Shield",
  "Lock",
  "Terminal",
  "Globe",
  "Database",
  "Cpu",
  "Cloud",
  "Code",
  "Layers",
  "Zap",
  "Book",
  "Key",
];

const CATEGORY_OPTIONS = [
  "Security Operations",
  "Infrastructure & Tools",
  "Incident Response",
  "AI & Automation",
  "Personal Projects",
];

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export function AddServiceModal({ open, onClose, onAdded }: AddServiceModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("Globe");
  const [status, setStatus] = useState<"Live" | "Self-Hosted" | "WIP">("WIP");

  const reset = () => {
    setTitle("");
    setCategory(CATEGORY_OPTIONS[0]);
    setDescription("");
    setUrl("");
    setIcon("Globe");
    setStatus("WIP");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const app: AppEntry = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      icon,
      url: url.trim(),
      openInNewTab: true,
      status,
    };

    saveCustomApp(app);
    reset();
    onClose();
    onAdded();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[101] sm:w-[460px] sm:max-h-[85vh] overflow-auto rounded-xl border border-border bg-zinc-900 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Add Service</span>
              </div>
              <button
                onClick={onClose}
                className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  App Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Tool"
                  required
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>

              {/* URL */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  URL
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this service"
                  rows={2}
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary/50 resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary/50"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  Status
                </label>
                <div className="flex gap-2">
                  {(["Live", "Self-Hosted", "WIP"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                        status === s
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-border hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2">
                  {ICON_OPTIONS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIcon(ic)}
                      className={`rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors ${
                        icon === ic
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-border px-4 py-2 text-xs text-muted-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Add to Dashboard
                </button>
              </div>
            </form>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
