import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type FeaturedProject, featuredProjects } from "../portfolio/projects.data";

const previewGradients: Record<string, string> = {
  "sentinelai-ids": "linear-gradient(160deg,#1a1a2e,#16213e)",
  "vulnhawk-pentest": "linear-gradient(160deg,#1a2e1a,#162e16)",
  "cloudshield-cspm": "linear-gradient(160deg,#1a2e2e,#162e2e)",
  "packetprobe-forensics": "linear-gradient(160deg,#2e1a2e,#2e162e)",
  "riskmatrix-grc": "linear-gradient(160deg,#2e2e1a,#2e2e16)",
  "alertforge-siem": "linear-gradient(160deg,#2e1a1a,#2e1616)",
};

function PhoneMockup({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative">
      {/* Back phone */}
      <div className="absolute -top-8 left-[60%] rotate-[8deg] opacity-90">
        <div className="h-[440px] w-[220px] rounded-[34px] bg-[#0d0d0f] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div
            className="flex h-full w-full items-center justify-center rounded-[26px] p-4 text-center text-sm text-white/20"
            style={{
              background: previewGradients[project.id] || "linear-gradient(160deg,#1a1a2e,#16213e)",
            }}
          >
            <span className="font-serif italic">{project.category}</span>
          </div>
        </div>
      </div>
      {/* Front phone */}
      <div className="relative -translate-x-10 rotate-[-6deg]">
        <div className="h-[440px] w-[220px] rounded-[34px] bg-[#0d0d0f] p-2.5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div
            className="flex h-full w-full items-center justify-center rounded-[26px] p-4 text-center text-sm text-white/30"
            style={{
              background: previewGradients[project.id] || "linear-gradient(160deg,#1a1a2e,#16213e)",
            }}
          >
            <div>
              <div className="font-serif text-base font-medium text-white/60">{project.title}</div>
              <div className="mt-2 text-[10px] uppercase text-white/25">
                {project.category}
              </div>
              {project.metrics && (
                <div className="mt-3 rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-[#FF5A1F]/60">
                  {project.metrics}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const activeProject = featuredProjects[activeIndex];

  const handleNavigate = (projectId: string) => {
    navigate({ to: "/work/$projectId", params: { projectId } });
  };

  if (!activeProject) return null;

  return (
    <section aria-labelledby="work-heading" className="relative overflow-hidden bg-[#141416] px-5 py-24 sm:px-10 sm:py-32">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "130px 130px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          width: "70%",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 border-b border-white/5 pb-10 sm:flex-row sm:items-baseline sm:gap-12">
          <h2 id="work-heading" className="shrink-0 font-serif text-[clamp(2.5rem,6vw,44px)] font-medium italic text-white/90">
            Featured Security Projects & Labs
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/40">
            A selection of cybersecurity tools built for detection, response, and compliance across
            cloud, network, and application layers.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: project list */}
          <div className="flex flex-col">
            {featuredProjects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`View project: ${project.title}, ${project.category}`}
                aria-pressed={i === activeIndex}
                className={`min-h-[44px] w-full border-b border-white/5 py-5 text-left transition-colors ${
                  i === activeIndex
                    ? "border-l-2 border-l-[#FF5A1F] pl-6"
                    : "border-l-2 border-l-transparent pl-6 hover:border-l-white/20"
                }`}
              >
                <div>
                  <span
                    className={`font-serif text-xl font-medium transition-colors sm:text-2xl ${
                      i === activeIndex ? "text-white" : "text-white/50"
                    }`}
                  >
                    {project.title}
                  </span>
                  <span
                    className={`ml-2 text-[11px] uppercase transition-colors ${
                      i === activeIndex ? "text-white/50" : "text-white/35"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: preview panel */}
          <div
            className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-lg"
            style={{
              background:
                previewGradients[activeProject.id] || "linear-gradient(160deg,#1a1a2e,#16213e)",
            }}
          >
            <PhoneMockup project={activeProject} />

            {/* View details button */}
            <button
              onClick={() => handleNavigate(activeProject.id)}
              aria-label={`View details for ${activeProject.title}`}
              className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 min-h-[44px] text-xs text-white/60 backdrop-blur-sm transition-colors hover:border-[#FF5A1F]/50 hover:text-[#FF5A1F]"
            >
              View Details
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
