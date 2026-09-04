import { useState, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Menu, X } from "lucide-react";
import {
  certifications,
  contact,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/components/portfolio/data";
import resumeAsset from "@/assets/dinesh-resume.pdf.asset.json";

export type DrawerView = "menu" | "projects" | "experience" | "about" | "resume" | "work";

const MENU: { id: DrawerView; label: string }[] = [
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "about", label: "ABOUT" },
  { id: "resume", label: "RESUME" },
  { id: "work", label: "LET'S WORK" },
];

const field =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 font-sans text-base text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#CCFF00]";

export function InfoDrawer({
  open,
  view,
  onViewChange,
  onClose,
}: {
  open: boolean;
  view: DrawerView;
  onViewChange: (view: DrawerView) => void;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
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
            className="fixed inset-0 z-40 bg-black/60"
          />
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-white/5 bg-[#333333] sm:max-w-xl md:max-w-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#333333]/90 px-6 py-5 backdrop-blur-md sm:px-10">
              <button
                type="button"
                onClick={() => onViewChange("menu")}
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-white/70 transition-colors hover:text-[#CCFF00]"
              >
                {view === "menu" ? <Menu className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                {view === "menu" ? "MENU" : "BACK"}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#CCFF00] hover:text-[#CCFF00]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 pb-20 pt-8 sm:px-10">
              <AnimatePresence mode="wait">
                <m.div
                  key={view}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {view === "menu" && (
                    <nav>
                      <ul>
                        {MENU.map((item, index) => (
                          <li key={item.id} className="border-b border-white/10">
                            <button
                              type="button"
                              onClick={() => onViewChange(item.id)}
                              className="group flex w-full items-center justify-between py-6 text-left"
                            >
                              <span className="font-display text-4xl uppercase tracking-wide text-white transition-colors group-hover:text-[#CCFF00] sm:text-6xl">
                                {item.label}
                              </span>
                              <span className="text-xs text-white/40">0{index + 1}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10 space-y-2 text-xs text-white/50">
                        <p>{contact.email}</p>
                        <p>{contact.location}</p>
                      </div>
                    </nav>
                  )}

                  {view === "projects" && (
                    <Panel title="PROJECTS">
                      <ul className="space-y-8">
                        {projects.map((project) => (
                          <li key={project.name} className="border-b border-white/10 pb-8">
                            <div className="flex items-baseline justify-between gap-4">
                              <h3 className="font-display text-2xl uppercase text-white sm:text-3xl">
                                {project.name}
                              </h3>
                              <span className="text-xs text-[#CCFF00]">{project.metric}</span>
                            </div>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                              {project.blurb}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {project.stack.map((tag) => (
                                <span
                                  key={tag}
                                  className="border border-white/15 px-3 py-1 text-[10px] uppercase tracking-widest text-white/60"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  )}

                  {view === "experience" && (
                    <Panel title="EXPERIENCE">
                      <ul className="space-y-8">
                        {experience.map((item) => (
                          <li key={item.company} className="border-b border-white/10 pb-8">
                            <p className="text-xs text-[#CCFF00]">{item.year}</p>
                            <h3 className="mt-3 font-display text-2xl uppercase text-white">
                              {item.role}
                            </h3>
                            <p className="mt-1 text-sm text-white/70">
                              {item.company} - {item.location}
                            </p>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                              {item.note}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  )}

                  {view === "about" && (
                    <Panel title="ABOUT">
                      <p className="max-w-xl text-lg leading-relaxed text-white/80">
                        {profile.aboutLead}
                      </p>
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        {skills.map((group) => (
                          <div key={group.label}>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[#CCFF00]">
                              {group.label}
                            </p>
                            <ul className="mt-3 space-y-1 text-sm text-white/60">
                              {group.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  )}

                  {view === "resume" && (
                    <Panel title="RESUME">
                      <ul className="space-y-6">
                        {education.map((item) => (
                          <li key={item.degree} className="border-b border-white/10 pb-6">
                            <div className="flex items-baseline justify-between gap-4">
                              <h3 className="text-lg font-medium text-white">{item.degree}</h3>
                              <span className="text-xs text-white/40">{item.year}</span>
                            </div>
                            <p className="mt-1 text-sm text-white/60">
                              {item.school} - {item.location}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-[#CCFF00]">
                        Certifications
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-white/60">
                        {certifications.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a
                        href={resumeAsset.url}
                        download="Dinesh-Dibbada-Resume.pdf"
                        className="mt-10 inline-flex items-center gap-2 bg-[#CCFF00] px-6 py-3 text-xs uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85"
                      >
                        Download PDF <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Panel>
                  )}

                  {view === "work" && (
                    <Panel title="LET'S WORK">
                      {sent ? (
                        <div className="flex items-center gap-3 border border-[#CCFF00]/40 px-5 py-4 text-sm text-white/80">
                          <Check className="h-4 w-4 text-[#CCFF00]" />
                          Thanks - your message is ready to send to {contact.email}.
                        </div>
                      ) : (
                        <form onSubmit={submit} className="space-y-6">
                          <input className={field} placeholder="Your name" required />
                          <input className={field} type="email" placeholder="Email" required />
                          <select className={`${field} appearance-none`} defaultValue="">
                            <option value="" disabled className="bg-[#333333]">
                              Engagement type
                            </option>
                            {["Full-time role", "Contract", "Consulting", "Something else"].map(
                              (option) => (
                                <option key={option} value={option} className="bg-[#333333]">
                                  {option}
                                </option>
                              ),
                            )}
                          </select>
                          <textarea className={field} rows={4} placeholder="Tell me about it" />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-[#CCFF00] px-8 py-4 text-xs uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85"
                          >
                            Send message <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </form>
                      )}
                    </Panel>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-8 font-display text-5xl uppercase tracking-wide text-[#CCFF00] sm:text-7xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
