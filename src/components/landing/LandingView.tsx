import { useEffect, useRef, useState } from "react";
import { LazyMotion, m, domAnimation, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
} from "lucide-react";
import heroSubject from "@/assets/hero-subject.avif";
import heroSecurity from "@/assets/dinesh-security-hero.jpg";
import resumeAsset from "@/assets/dinesh-resume.pdf.asset.json";
import {
  certifications,
  contact,
  education,
  experience,
  profile,
  skills,
  stats,
  volunteering,
} from "@/components/portfolio/data";
import { ParticleBackground } from "./ParticleBackground";
import { ScrambleText } from "./ScrambleText";
import { WorkSection } from "./WorkSection";
import { InfoDrawer, type DrawerView } from "./InfoDrawer";

const ROTATING = ["THREAT DETECTION", "SOC OPERATIONS", "SAP GRC", "VULN MANAGEMENT"];

const BIO =
  "Cybersecurity analyst with 2+ years across SOC operations, SAP GRC and vulnerability management. I turn raw security signals into measurable, defensible outcomes.";

const TICKER = [
  "SOC OPERATIONS",
  "THREAT HUNTING",
  "INCIDENT RESPONSE",
  "SAP GRC",
  "VULNERABILITY MGMT",
  "DIGITAL FORENSICS",
  "SIEM TRIAGE",
];

const NAV = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#expertise", label: "Expertise", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  index,
  kicker,
  children,
}: {
  index: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={sectionReveal}
      transition={{ duration: 0.6 }}
      className="mb-16 sm:mb-20"
    >
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF5A1F]">
        <span>{index}</span>
        <span className="h-px w-12 bg-[#FF5A1F]/50" />
        <span className="text-white/45">{kicker}</span>
      </div>
      <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[0.92] -tracking-[0.01em] text-white text-balance">
        {children}
      </h2>
    </m.div>
  );
}

export function LandingView({
  onSwitchMode,
  onLogin,
}: {
  onSwitchMode?: () => void;
  onLogin?: () => void;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<DrawerView>("menu");

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sunY = useTransform(heroProgress, [0, 1], [0, 160]);
  const sunScale = useTransform(heroProgress, [0, 1], [1, 1.35]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, 90]);
  const nameY = useTransform(heroProgress, [0, 1], [0, -70]);
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING.length), 3200);
    return () => clearInterval(id);
  }, []);

  const openMenu = () => {
    setDrawerView("menu");
    setDrawerOpen(true);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="relative z-10 min-h-screen bg-[#0E0E10] text-white"
        style={{ isolation: "isolate" }}
      >
        {mounted && <ParticleBackground />}

        {/* Scroll progress rail */}
        <m.div
          style={{ scaleX: progressScale }}
          className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-[#FF5A1F]"
          aria-hidden="true"
        />

        {/* HUD top bar */}
        <div className="fixed inset-x-0 top-[3px] z-40 hidden items-center justify-between border-b border-white/5 bg-[#0E0E10]/70 px-6 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 backdrop-blur-md lg:flex">
          <span>SYS // SEC-OPS</span>
          <span className="text-white/25">LAT 17.3850° N — LON 78.4867° E</span>
          <span className="flex items-center gap-2 text-[#FF5A1F]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF5A1F]" />
            ONLINE
          </span>
        </div>

        {/* Header */}
        <header className="sticky top-[3px] z-30 flex items-center justify-between px-5 py-4 sm:px-8 lg:top-[34px]">
          <a href="#top" className="group flex items-center gap-3" aria-label="Dinesh Dibbada, home">
            <span className="flex h-9 w-9 items-center justify-center border border-[#FF5A1F] font-display text-sm font-bold text-[#FF5A1F] transition-colors group-hover:bg-[#FF5A1F] group-hover:text-black">
              DD
            </span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-white/60 sm:inline">
              Dinesh Dibbada
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex min-h-[44px] items-center gap-1.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
              >
                <span className="text-[#FF5A1F]/60 transition-colors group-hover:text-[#FF5A1F]">
                  {item.index}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-[44px] items-center gap-2 bg-[#FF5A1F] px-6 font-mono text-[11px] uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5 sm:flex"
            >
              Get in Touch
            </a>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-[#FF5A1F] hover:text-[#FF5A1F] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* HERO */}
        <section
          id="top"
          ref={heroRef}
          className="relative min-h-[100svh] overflow-hidden px-5 pb-0 pt-24 sm:px-8 lg:pt-28"
        >
          {/* backdrops */}
          <div className="pointer-events-none absolute inset-0 hud-grid opacity-60" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,90,31,0.10),transparent_55%)]" aria-hidden="true" />

          {/* vertical left rail */}
          <div
            className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block"
            aria-hidden="true"
          >
            <span className="block origin-left -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
              Portfolio — 2026 / Cybersecurity
            </span>
          </div>
          {/* vertical right socials */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
            <span className="h-16 w-px bg-white/15" aria-hidden="true" />
            <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/40 transition-colors hover:text-[#FF5A1F]">
              <Github className="h-4 w-4" />
            </a>
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/40 transition-colors hover:text-[#FF5A1F]">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`mailto:${contact.email}`} aria-label="Email" className="text-white/40 transition-colors hover:text-[#FF5A1F]">
              <Mail className="h-4 w-4" />
            </a>
            <span className="h-16 w-px bg-white/15" aria-hidden="true" />
          </div>

          <m.div
            style={{ opacity: heroFade }}
            className="relative z-20 mx-auto flex h-full min-h-[calc(100svh-8rem)] w-full max-w-6xl flex-col justify-center"
          >
            {/* status row */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45"
            >
              <span className="flex items-center gap-2 text-[#FF5A1F]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A1F] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5A1F]" />
                </span>
                {profile.eyebrow}
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <MapPin className="h-3 w-3" />
                {contact.location}
              </span>
            </m.div>

            {/* name + portrait composition */}
            <div className="relative mt-6 grid items-center gap-6 lg:mt-8 lg:grid-cols-[1fr_auto]">
              <m.div style={{ y: nameY }} className="relative z-20">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.4em] text-white/50 sm:text-sm">
                  Hi, I&apos;m
                </p>
                <h1 className="font-display font-bold uppercase leading-[0.82] -tracking-[0.02em]">
                  <span className="block text-[clamp(3.2rem,13vw,11rem)] text-white">Dinesh</span>
                  <span className="block text-outline text-[clamp(3.2rem,13vw,11rem)]">
                    Dibbada
                  </span>
                </h1>

                <div className="mt-6 flex items-center gap-3">
                  <span className="font-display text-[clamp(1.1rem,2.4vw,1.9rem)] font-semibold uppercase tracking-wide text-white">
                    {profile.role}
                  </span>
                  <span className="inline-block h-6 w-[3px] animate-pulse bg-[#FF5A1F] sm:h-8" aria-hidden="true" />
                </div>

                <div className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <span className="text-white/30">FOCUS //</span>
                  <ScrambleText text={ROTATING[wordIndex]} className="text-[#FF5A1F]" />
                </div>
              </m.div>

              {/* portrait */}
              <m.div
                style={{ y: portraitY }}
                className="relative order-first mx-auto flex w-full max-w-[280px] items-end justify-center lg:order-none lg:mx-0 lg:max-w-[380px]"
              >
                <m.div
                  style={{ y: sunY, scale: sunScale }}
                  className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/25 blur-3xl"
                  aria-hidden="true"
                />
                <m.div
                  style={{ y: sunY }}
                  className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[82%] rounded-full bg-[#FF5A1F]"
                  aria-hidden="true"
                />
                {/* HUD brackets */}
                <span className="pointer-events-none absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-[#FF5A1F]" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-[#FF5A1F]" aria-hidden="true" />
                <img
                  src={heroSubject}
                  alt="Dinesh Dibbada, Cybersecurity Analyst"
                  width={1024}
                  height={1536}
                  loading="eager"
                  fetchPriority="high"
                  className="relative z-10 h-[42vh] max-h-[520px] w-auto object-contain object-bottom contrast-110 grayscale drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] sm:h-[50vh]"
                />
              </m.div>
            </div>

            {/* bio + actions */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-10"
            >
              <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                {BIO}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={resumeAsset.url}
                  download="Dinesh-Dibbada-Resume.pdf"
                  className="group flex min-h-[44px] items-center gap-2 bg-[#FF5A1F] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
                >
                  Resume <ArrowDownToLine className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="group flex min-h-[44px] items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                >
                  Contact <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </m.div>
          </m.div>

          {/* hero ticker */}
          <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y border-white/10 bg-[#0E0E10]/60 py-3 backdrop-blur-sm">
            <div className="flex w-max animate-ticker">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                  {TICKER.map((t) => (
                    <span
                      key={`${dup}-${t}`}
                      className="flex items-center gap-4 px-6 font-mono text-xs uppercase tracking-[0.3em] text-white/40"
                    >
                      {t}
                      <span className="text-[#FF5A1F]">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE BREAK */}
        <section className="relative bg-[#0E0E10]">
          <img
            src={heroSecurity}
            alt="Security operations workstation with multiple monitors displaying threat analysis dashboards"
            width={1920}
            height={820}
            loading="lazy"
            className="block aspect-[16/7] w-full object-cover opacity-45 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10] via-transparent to-[#0E0E10]" />
          <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" aria-hidden="true" />
        </section>

        {/* ABOUT INTRO */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionReveal}
          transition={{ duration: 0.7 }}
          className="relative bg-[#0E0E10] px-5 py-28 sm:px-8 sm:py-40"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF5A1F]">
              // Mission
            </p>
            <h2 className="font-display text-[clamp(1.9rem,5vw,4rem)] font-semibold uppercase leading-[1.02] -tracking-[0.01em] text-white text-balance">
              Securing digital infrastructure with{" "}
              <span className="text-[#FF5A1F]">precision</span> and{" "}
              <span className="text-outline-white">measurable impact.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {profile.aboutLead}
            </p>
          </div>
        </m.section>

        {/* STATS */}
        <section className="relative border-y border-white/10 bg-[#0E0E10] px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <m.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionReveal}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#0E0E10] p-8 transition-colors hover:bg-[#17171A] sm:p-10"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF5A1F]/70">
                  0{i + 1}
                </span>
                <div className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-none text-white transition-colors group-hover:text-[#FF5A1F]">
                  {stat.value}
                </div>
                <p className="mt-4 text-[11px] uppercase leading-relaxed tracking-wide text-white/50">
                  {stat.label}
                </p>
              </m.div>
            ))}
          </div>
        </section>

        {/* SELECTED WORK */}
        <div id="work">
          <WorkSection />
        </div>

        {/* EXPERTISE */}
        <section
          id="expertise"
          className="relative border-y border-white/10 bg-[#0E0E10] px-5 py-28 sm:px-8 sm:py-40"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading index="02" kicker="Capabilities">
              Core <span className="text-[#FF5A1F]">Competencies</span>
            </SectionHeading>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {[
                {
                  title: "SOC Operations",
                  body: "SIEM triage, L1 alerts, SLA-led incident response and continuous threat monitoring.",
                },
                {
                  title: "SAP GRC",
                  body: "Access control, ARA, EAM, SoD policies and audit-ready reporting.",
                },
                {
                  title: "Vulnerability Management",
                  body: "Nessus scans, risk assessment and structured remediation tickets.",
                },
                {
                  title: "Digital Forensics",
                  body: "Autopsy investigations, disk image analysis and evidence reporting.",
                },
              ].map((service, i) => (
                <m.div
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionReveal}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative bg-[#0E0E10] p-10 transition-colors hover:bg-[#17171A] sm:p-14"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(1.4rem,3vw,2.3rem)] font-semibold uppercase leading-[1.05] text-white transition-colors group-hover:text-[#FF5A1F]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                    {service.body}
                  </p>
                  <ArrowUpRight className="absolute right-8 top-10 h-5 w-5 text-white/20 transition-all group-hover:right-6 group-hover:text-[#FF5A1F]" />
                </m.div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
              {skills.map((group, i) => (
                <m.div
                  key={group.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={sectionReveal}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF5A1F]/70">
                    {group.label}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/60">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 bg-[#FF5A1F]/60" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="relative bg-[#0E0E10] px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionHeading index="03" kicker="Track record">
              Technical <span className="text-[#FF5A1F]">Experience</span>
            </SectionHeading>

            <div>
              {experience.map((item, i) => (
                <m.article
                  key={`${item.role}-${item.company}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionReveal}
                  transition={{ duration: 0.5 }}
                  className="group border-t border-white/10 py-10 transition-colors hover:bg-white/[0.02] sm:py-14"
                >
                  <div className="grid gap-6 sm:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr_1.2fr]">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#FF5A1F]/70">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(1.4rem,3vw,2.3rem)] font-semibold uppercase leading-[1.05] text-white transition-colors group-hover:text-[#FF5A1F]">
                        {item.role}
                      </h3>
                      <p className="mt-2 text-sm text-white/65">{item.company}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                        {item.location}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 sm:text-base">{item.note}</p>
                  </div>
                </m.article>
              ))}
              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTS */}
        <section className="relative border-y border-white/10 bg-[#0E0E10] px-5 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionHeading index="04" kicker="Credentials">
              Education &amp; <span className="text-[#FF5A1F]">Certs</span>
            </SectionHeading>

            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                {education.map((item) => (
                  <m.article
                    key={item.degree}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionReveal}
                    transition={{ duration: 0.5 }}
                    className="border-t border-white/10 py-8"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl font-semibold uppercase text-white sm:text-3xl">
                        {item.degree}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{item.school}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {item.location}
                    </p>
                  </m.article>
                ))}
                <div className="border-t border-white/10" />
              </div>

              <div>
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF5A1F]/70">
                  Certifications
                </p>
                <div>
                  {certifications.map((item) => (
                    <div
                      key={item}
                      className="flex items-baseline justify-between gap-4 border-t border-white/10 py-5"
                    >
                      <span className="text-sm text-white/65">{item}</span>
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-[#FF5A1F]/60">
                        Verified
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-white/10" />
                </div>

                <p className="mb-6 mt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF5A1F]/70">
                  Volunteering
                </p>
                <div>
                  {volunteering.map((item) => (
                    <m.article
                      key={item.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={sectionReveal}
                      transition={{ duration: 0.5 }}
                      className="border-t border-white/10 py-6"
                    >
                      <h3 className="text-lg text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{item.note}</p>
                    </m.article>
                  ))}
                  <div className="border-t border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative overflow-hidden bg-[#0E0E10] px-5 py-28 sm:px-8 sm:py-40"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.08),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 hud-grid opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF5A1F]">
                // Get in touch
              </p>
              <h2
                id="contact-heading"
                className="font-display text-[clamp(2.4rem,8vw,6.5rem)] font-bold uppercase leading-[0.92] -tracking-[0.02em] text-white text-balance"
              >
                Let&apos;s strengthen <span className="text-outline">what matters.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
                {contact.replyTime}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex min-h-[44px] items-center gap-3 border border-white/15 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition-all hover:border-[#FF5A1F]/50 hover:text-[#FF5A1F]"
                >
                  {contact.email}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Contact Form */}
              <form
                action={`mailto:${contact.email}`}
                method="post"
                encType="text/plain"
                className="mx-auto mt-16 max-w-lg space-y-6 text-left"
              >
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    className="min-h-[44px] w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="min-h-[44px] w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="How can I help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[44px] w-full bg-[#FF5A1F] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-black transition-transform hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/30">
                <a
                  href={`https://${contact.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center py-1 transition-colors hover:text-[#FF5A1F]/70"
                >
                  LinkedIn
                </a>
                <span className="text-white/20" aria-hidden="true">/</span>
                <a
                  href={`https://${contact.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center py-1 transition-colors hover:text-[#FF5A1F]/70"
                >
                  GitHub
                </a>
                <span className="text-white/10">/</span>
                <span>{contact.location}</span>
              </div>
            </m.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative border-t border-white/10 bg-[#0E0E10] px-5 py-8 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
            <span>&copy; 2026 {profile.name}</span>
            <div className="flex items-center gap-4">
              <span>{contact.location}</span>
              {onSwitchMode && (
                <button
                  onClick={onSwitchMode}
                  className="min-h-[44px] py-1 text-white/40 transition-colors hover:text-[#FF5A1F]/70"
                >
                  Switch mode
                </button>
              )}
              {onLogin && (
                <button
                  onClick={onLogin}
                  className="min-h-[44px] py-1 text-white/50 transition-colors hover:text-[#FF5A1F]/70"
                >
                  inlog
                </button>
              )}
            </div>
          </div>
        </footer>

        <InfoDrawer
          open={drawerOpen}
          view={drawerView}
          onViewChange={setDrawerView}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </LazyMotion>
  );
}
