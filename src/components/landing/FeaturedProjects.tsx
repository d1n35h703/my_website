import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type FeaturedProject, featuredProjects } from "../portfolio/projects.data";

const statusColors: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  WIP: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

/* ── Overlays ── */

function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.04]">
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
        }}
      />
    </div>
  );
}

function GlowOrb({ color = "#CCFF00" }: { color?: string }) {
  return (
    <div
      className="absolute -bottom-6 left-1/2 h-12 w-32 -translate-x-1/2 rounded-full blur-2xl opacity-20"
      style={{ backgroundColor: color }}
    />
  );
}

/* ── Single carousel card ── */

function CarouselCard({
  project,
  onHoverStart,
  onHoverEnd,
}: {
  project: FeaturedProject;
  onHoverStart: (id: string, el: HTMLAnchorElement) => void;
  onHoverEnd: () => void;
}) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => onHoverStart(project.id, e.currentTarget)}
      onMouseLeave={onHoverEnd}
      className="group relative flex-shrink-0 w-[280px] sm:w-[340px] snap-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.05] cursor-pointer"
    >
      {/* Thumbnail area */}
      <div className="relative mb-4 h-36 overflow-hidden rounded-lg bg-gradient-to-br from-white/[0.03] to-transparent">
        <ScanlineOverlay />
        <GlowOrb />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] text-white/20">
            preview/{project.id}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-sans text-base sm:text-lg text-white/90 group-hover:text-white transition-colors truncate">
            {project.title}
          </h3>
          {project.status && (
            <span
              className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] ${statusColors[project.status] || ""}`}
            >
              {project.status}
            </span>
          )}
        </div>
        <p className="text-[10px] text-white/25 uppercase">{project.category}</p>
        <p className="text-[13px] leading-relaxed text-white/40 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-0.5 text-[9px] text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/0 to-transparent group-hover:via-[#CCFF00]/20 transition-all" />
    </a>
  );
}

/* ── Floating preview popover ── */

function PreviewPopover({
  project,
  anchorRect,
}: {
  project: FeaturedProject;
  anchorRect: DOMRect;
}) {
  if (!project) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="pointer-events-none fixed z-[200] w-[min(380px,88vw)]"
      style={{
        left: Math.min(anchorRect.left, window.innerWidth - 400),
        top: anchorRect.top - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60">
        {/* Preview visual */}
        <div className="relative h-24 bg-gradient-to-br from-white/[0.04] to-transparent">
          <ScanlineOverlay />
          <GlowOrb />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] text-white/20">
              preview/{project.id}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center gap-2">
            <h4 className="font-sans text-sm text-white/90">{project.title}</h4>
            {project.status && (
              <span
                className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8px] ${statusColors[project.status] || ""}`}
              >
                {project.status}
              </span>
            )}
          </div>
          <p className="text-xs leading-relaxed text-white/50">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/[0.05] bg-white/[0.02] px-1.5 py-0.5 text-[9px] text-white/35"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 pt-0.5 text-[10px] text-white/25">
            <span>Click to open GitHub</span>
            <ArrowUpRight className="h-2.5 w-2.5" />
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ── Main component ── */

export function FeaturedProjects() {
  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  // Pause marquee on hover
  const handleHoverStart = useCallback((id: string, el: HTMLAnchorElement) => {
    setPaused(true);
    setHoveredId(id);
    setAnchorRect(el.getBoundingClientRect());
  }, []);

  const handleHoverEnd = useCallback(() => {
    setPaused(false);
    setHoveredId(null);
    setAnchorRect(null);
  }, []);

  // Double the items for seamless loop
  const items = [...featuredProjects, ...featuredProjects];

  const hoveredProject = featuredProjects.find((p) => p.id === hoveredId) ?? null;

  return (
    <section className="relative bg-[#050505] overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-24 sm:px-10 sm:pt-32">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="font-sans text-3xl sm:text-4xl text-white/90 italic">Featured Projects</h2>
        </m.div>
      </div>

      {/* Marquee track */}
      <div className="relative mt-12 sm:mt-16">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050505] to-transparent" />

        {isMobile ? (
          /* Mobile: horizontal swipe scroll */
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-none">
            {featuredProjects.map((project) => (
              <CarouselCard
                key={project.id}
                project={project}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
              />
            ))}
          </div>
        ) : (
          /* Desktop: infinite CSS marquee */
          <div
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHoveredId(null);
              setAnchorRect(null);
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-5 w-max"
              style={{
                animation: "marquee-projects 40s linear infinite",
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {items.map((project, i) => (
                <CarouselCard
                  key={`${project.id}-${i}`}
                  project={project}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating preview popover */}
      <AnimatePresence>
        {hoveredProject && anchorRect && (
          <PreviewPopover project={hoveredProject} anchorRect={anchorRect} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="px-5 pb-20 pt-12 sm:px-10 sm:pb-28">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mx-auto max-w-5xl flex items-center gap-2 text-xs text-white/20"
        >
          <span>All projects on</span>
          <a
            href="https://github.com/dibbadadinesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[24px] items-center gap-1 py-1 text-white/35 hover:text-white/50 transition-colors"
          >
            GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
        </m.div>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#CCFF00]/[0.02] blur-[100px]" />
    </section>
  );
}
