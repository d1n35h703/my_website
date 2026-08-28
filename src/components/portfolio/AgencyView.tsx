import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeAsset from "@/assets/dinesh-resume.pdf.asset.json";
import heroSecurity from "@/assets/dinesh-security-hero.jpg";
import workSoc from "@/assets/case-soc-monitoring.jpg";
import workGovernance from "@/assets/case-access-governance.jpg";
import workVulnerability from "@/assets/case-vulnerability.jpg";
import {
  certifications,
  contact,
  education,
  experience,
  navLinks,
  profile,
  projects,
  services,
  skills,
  stats,
  volunteering,
} from "./data";

const shots: Record<string, string> = {
  soc: workSoc,
  governance: workGovernance,
  vulnerability: workVulnerability,
};

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AgencyView({ onSwitchMode }: { onSwitchMode?: () => void }) {
  const [activeService, setActiveService] = useState(services[0]?.id ?? "soc");
  const reduceMotion = useReducedMotion();
  const service = services.find((item) => item.id === activeService) ?? services[0];

  return (
    <div className="editorial min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-background/95">
        <div className="mx-auto flex w-[min(1240px,92vw)] items-center gap-5 border-b border-border py-4">
          <a href="#home" className="text-sm font-semibold" aria-label="Dinesh Dibbada, home">
            {profile.logo.text}
            <span className="font-normal text-muted-foreground">{profile.logo.suffix}</span>
          </a>
          <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            {onSwitchMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwitchMode}
                className="rounded-full px-2 sm:px-3"
              >
                <TerminalSquare />
                <span className="hidden sm:inline">Ubuntu OS</span>
              </Button>
            )}
            <Button asChild size="sm" className="rounded-full shadow-none">
              <a href={`mailto:${contact.email}`}>
                Contact <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1240px,92vw)] pb-28 sm:pb-40">
        <section id="home" className="pt-12 sm:pt-20">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
                {profile.eyebrow}
              </p>
              <h1 className="mt-5 max-w-5xl text-[clamp(3.1rem,8vw,7.5rem)] font-semibold leading-[0.88]">
                {profile.tagline[0]}
                <br />
                <span className="text-muted-foreground">{profile.tagline[1]}</span>
              </h1>
            </div>
            <div className="pb-1 lg:pb-3">
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full shadow-none">
                  <a href={resumeAsset.url} download="Dinesh-Dibbada-Resume.pdf">
                    Resume <ArrowDownToLine />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full shadow-none">
                  <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer">
                    LinkedIn <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 overflow-hidden bg-secondary"
          >
            <img
              src={heroSecurity}
              width={1600}
              height={1100}
              alt="Security operations workstation with event monitoring displays"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/8]"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-between gap-3 bg-foreground/90 px-5 py-4 text-xs uppercase tracking-[0.12em] text-background sm:px-7">
              <span>{profile.role}</span>
              <span>{contact.location}</span>
            </div>
          </m.div>
        </section>

        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionReveal}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-x-5 gap-y-10 border-t border-border pt-10 md:mt-28 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <div className="text-[clamp(2.5rem,10vw,4.8rem)] font-semibold leading-none tabular-nums md:text-[clamp(3rem,5vw,4.8rem)]">
                {stat.value}
              </div>
              <p className="mt-3 max-w-44 text-xs leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </m.section>

        <Section id="about" label="01 / About">
          <div className="max-w-4xl">
            <p className="text-[clamp(1.65rem,3.5vw,3.25rem)] leading-[1.12]">
              {profile.aboutLead}
            </p>
            <ol className="mt-12 grid gap-6 sm:grid-cols-3">
              {profile.values.map((value, index) => (
                <li key={value} className="border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">0{index + 1}</span>
                  <p className="mt-5 text-sm font-medium">{value}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="impact" label="02 / Selected impact">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project, index) => (
              <m.article
                key={project.name}
                whileHover={reduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group ${index === 2 ? "md:col-span-2" : ""}`}
              >
                <div className="overflow-hidden bg-secondary">
                  <m.img
                    whileHover={reduceMotion ? {} : { scale: 1.03 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    src={shots[project.image]}
                    loading="lazy"
                    width={1400}
                    height={1050}
                    alt={`${project.name} visual`}
                    className={`w-full object-cover ${index === 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-border pt-4">
                  <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
                  <span className="shrink-0 text-sm font-medium text-accent">{project.metric}</span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {project.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </m.article>
            ))}
          </div>
        </Section>

        <Section id="expertise" label="03 / Expertise">
          <div className="grid gap-10 lg:grid-cols-[21rem_1fr]">
            <div className="border-t border-border lg:sticky lg:top-28 lg:self-start">
              {services.map((item, index) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onMouseEnter={() => setActiveService(item.id)}
                  onFocus={() => setActiveService(item.id)}
                  onClick={() => setActiveService(item.id)}
                  className="h-auto w-full justify-between rounded-none border-b border-border px-0 py-5 text-left text-lg shadow-none hover:bg-transparent"
                >
                  <span
                    className={
                      activeService === item.id ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    0{index + 1} - {item.label}
                  </span>
                  <ArrowUpRight
                    className={activeService === item.id ? "opacity-100" : "opacity-0"}
                  />
                </Button>
              ))}
            </div>
            {service && (
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={service.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="max-w-3xl text-[clamp(2rem,4vw,4rem)] font-semibold leading-[1.02]">
                    {service.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                  <ul className="mt-10 max-w-2xl">
                    {service.points.map((point) => (
                      <li key={point} className="border-t border-border py-4 text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </m.div>
              </AnimatePresence>
            )}
          </div>
        </Section>

        <Section id="experience" label="04 / Experience">
          <div className="border-t border-border">
            {experience.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="grid gap-3 border-b border-border py-8 sm:grid-cols-[12rem_1fr] lg:grid-cols-[14rem_1fr_1.4fr]"
              >
                <span className="text-sm text-muted-foreground">{item.year}</span>
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm">{item.company}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" label="05 / Education & credentials">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border-t border-border">
              {education.map((item) => (
                <article key={item.degree} className="border-b border-border py-6">
                  <div className="flex justify-between gap-4">
                    <h3 className="font-semibold">{item.degree}</h3>
                    <span className="text-sm text-muted-foreground">{item.year}</span>
                  </div>
                  <p className="mt-2 text-sm">{item.school}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </article>
              ))}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Certifications
              </p>
              <ul className="mt-4 border-t border-border">
                {certifications.map((item) => (
                  <li key={item} className="border-b border-border py-4 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">{group.label}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section label="06 / Beyond work">
          <div className="grid gap-8 md:grid-cols-2">
            {volunteering.map((item) => (
              <article key={item.title} className="border-t border-border pt-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </Section>

        <section id="contact" className="mt-24 border-t border-border pt-12 sm:mt-36 sm:pt-16">
          <p className="text-xs uppercase tracking-[0.12em] text-accent">07 / Contact</p>
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-4xl text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95]">
                Let’s strengthen what matters.
              </h2>
              <p className="mt-6 text-muted-foreground">{contact.replyTime}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full shadow-none">
                <a href={`mailto:${contact.email}`}>
                  Email me <ArrowUpRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full shadow-none">
                <a href={resumeAsset.url} download="Dinesh-Dibbada-Resume.pdf">
                  Resume <ArrowDownToLine />
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border py-5 text-xs text-muted-foreground">
            <span>© 2026 {profile.name}</span>
            <span>{contact.location}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <m.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionReveal}
      transition={{ duration: 0.5 }}
      className="mt-24 border-t border-border pt-10 sm:mt-36 sm:pt-14"
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[13rem_1fr]">
        <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground lg:sticky lg:top-24 lg:self-start">
          {label}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </m.section>
  );
}
