import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Archive, Github } from "lucide-react";
import { featuredProjects } from "@/components/portfolio/projects.data";

export const Route = createFileRoute("/work/$projectId")({
  component: WorkDetail,
});

const statusConfig = {
  Live: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  WIP: {
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  Archived: {
    icon: Archive,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
  },
} as const;

function WorkDetail() {
  const { projectId } = Route.useParams();
  const project = featuredProjects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030014] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-white/50">Project not found</p>
          <a href="/" className="mt-6 inline-block text-sm text-[#CCFF00] hover:underline">
            Back to portfolio
          </a>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#030014]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-10">
          <a
            href="/"
            className="group flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#CCFF00]"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 pt-20 sm:px-10 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${status.color} ${status.bg} ${status.border}`}
            >
              <StatusIcon className="h-3 w-3" />
              {project.status}
            </span>
            <span className="text-xs uppercase text-white/30">{project.category}</span>
          </div>

          <h1 className="mt-6 font-serif text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1.05] italic text-white/90">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
            {project.description}
          </p>

          {project.metrics && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/20 bg-[#CCFF00]/5 px-4 py-2 text-sm text-[#CCFF00]/80">
              {project.metrics}
            </div>
          )}

          <div className="mt-8">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70 transition-all hover:border-[#CCFF00]/50 hover:bg-[#CCFF00]/10 hover:text-[#CCFF00]"
            >
              <Github className="h-4 w-4" />
              See more on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Preview panel */}
      <section className="px-5 py-16 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
                }}
              />
            </div>

            <div className="relative flex min-h-[400px] items-center justify-center p-10 sm:min-h-[500px]">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <span className="font-serif text-2xl text-white/40">{project.title[0]}</span>
                </div>
                <p className="text-sm text-white/30">preview/{project.id}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-5 pb-20 sm:px-10 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
            {/* Left: description */}
            <div>
              <h2 className="text-xs uppercase text-[#CCFF00]/70">About this project</h2>
              <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Right: meta */}
            <div className="space-y-8">
              {/* Tech stack */}
              <div>
                <h3 className="text-xs uppercase text-white/30">Tech Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-xs uppercase text-white/30">Links</h3>
                <div className="mt-4 space-y-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#CCFF00]"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-xs uppercase text-white/30">Status</h3>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${status.color} ${status.bg} ${status.border}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
