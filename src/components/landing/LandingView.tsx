import { useEffect, useState } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
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

const ROTATING = ["PURPOSE", "IMPACT", "INTENT"];

const BIO =
  "I'm Dinesh - a cybersecurity analyst with 2+ years across SOC operations, SAP GRC and vulnerability management. I turn security signals into measurable outcomes.";

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function LandingView({
  onSwitchMode,
  onLogin,
}: {
  onSwitchMode?: () => void;
  onLogin?: () => void;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [bioKey, setBioKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<DrawerView>("menu");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setBioKey((k) => k + 1), 7000);
    return () => clearInterval(id);
  }, []);

  const openDrawer = (view: DrawerView) => {
    setDrawerView(view);
    setDrawerOpen(true);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        className="relative z-10 min-h-screen bg-[#141416] text-white"
        style={{ isolation: "isolate" }}
      >
        {mounted && <ParticleBackground />}

        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#141416]/80 px-5 py-5 backdrop-blur-md sm:px-10">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Dinesh Dibbada, home"
          >
            <span className="font-display text-xl uppercase text-white sm:text-2xl">Dinesh</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5A1F] text-black transition-transform duration-500 group-hover:rotate-180">
              &#10022;
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {[
              { href: "#work", label: "WORK" },
              { href: "#expertise", label: "EXPERTISE" },
              { href: "#experience", label: "EXPERIENCE" },
              { href: "#contact", label: "CONTACT" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-[44px] flex items-center py-1.5 text-xs uppercase text-white/70 transition-colors hover:text-[#FF5A1F]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="flex min-h-[44px] items-center gap-2 bg-[#FF5A1F] px-4 py-2.5 text-[10px] uppercase text-black transition-opacity hover:opacity-85 sm:px-6"
              aria-label="Get in touch"
            >
              <Mail className="h-3.5 w-3.5 sm:hidden" />
              <span className="hidden sm:inline">Get in Touch</span>
              <span className="sm:hidden">Get in Touch</span>
            </a>
          </div>
        </header>

        {/* HERO */}
        <section
          id="top"
          className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden px-5 pb-20 pt-14 sm:px-10 sm:pt-20"
        >
          <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
            {/* Left: intro */}
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2.5 border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A1F] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5A1F]" />
                </span>
                {profile.eyebrow}
              </span>

              <h1 className="mt-7 font-display uppercase leading-[0.88] -tracking-[0.02em] text-white text-[clamp(2.6rem,7vw,6rem)]">
                Hi, I&apos;m
                <br />
                <span className="text-[#FF5A1F]">Dinesh Dibbada</span>
              </h1>

              <div className="mt-5 flex items-center gap-3">
                <span className="font-sans text-[clamp(1.15rem,2.6vw,2rem)] font-medium text-white">
                  {profile.role}
                </span>
                <span
                  className="inline-block h-6 w-[3px] animate-pulse bg-[#FF5A1F] sm:h-9"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                <span>Focus</span>
                <span className="text-white/25">/</span>
                <ScrambleText text={ROTATING[wordIndex]} className="text-[#FF5A1F]/80" />
              </div>

              <p
                className="hero-summary mt-7 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base"
                aria-label="About Dinesh Dibbada"
              >
                {BIO.split("").map((char, index) => (
                  <m.span
                    key={`${bioKey}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02, duration: 0.05 }}
                  >
                    {char}
                  </m.span>
                ))}
              </p>

              <p className="sr-only">
                <strong>Dinesh Dibbada</strong> is a Cybersecurity Analyst focusing on defensive
                security operations, threat hunting, and infrastructure protection. Experienced in
                monitoring security events, triaging incidents, and implementing hardened
                architectures to protect enterprise digital assets.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.12em] text-white/45">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#FF5A1F]" />
                  {contact.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" aria-hidden="true" />
                  Available now
                </span>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={resumeAsset.url}
                  download="Dinesh-Dibbada-Resume.pdf"
                  className="flex min-h-[44px] items-center gap-2 bg-[#FF5A1F] px-6 py-3 text-xs uppercase text-black transition-opacity hover:opacity-85"
                >
                  Resume <ArrowDownToLine className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="flex min-h-[44px] items-center gap-2 border border-white/20 px-6 py-3 text-xs uppercase text-white transition-colors hover:border-[#FF5A1F] hover:text-[#FF5A1F]"
                >
                  Get in Touch <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Follow</span>
                <a
                  href={`https://${contact.github}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-white/50 transition-colors hover:text-[#FF5A1F]"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={`https://${contact.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/50 transition-colors hover:text-[#FF5A1F]"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Email"
                  className="text-white/50 transition-colors hover:text-[#FF5A1F]"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Right: portrait with orange sun-glow */}
            <div className="relative order-1 flex items-end justify-center lg:order-2 lg:justify-end">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92%] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/25 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[76%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/90 blur-[2px]"
                aria-hidden="true"
              />
              <img
                src={heroSubject}
                alt="Dinesh Dibbada - Cybersecurity Analyst"
                width={1024}
                height={1536}
                loading="eager"
                fetchPriority="high"
                className="relative z-10 h-[46vh] max-h-[560px] w-auto max-w-none object-contain object-bottom brightness-95 contrast-110 grayscale drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)] sm:h-[58vh]"
              />
            </div>
          </div>
        </section>

        {/* HERO IMAGE BREAK */}
        <section className="relative bg-[#141416]">
          <img
            src={heroSecurity}
            alt="Security operations workstation with multiple monitors displaying threat analysis dashboards"
            width={1920}
            height={820}
            loading="lazy"
            className="block aspect-[16/7] w-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141416] via-transparent to-[#141416]" />
        </section>

        {/* ABOUT INTRO */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionReveal}
          transition={{ duration: 0.7 }}
          className="relative bg-[#141416] px-5 py-32 sm:px-10 sm:py-44"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-sans text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] text-white">
              Securing digital infrastructure with{" "}
              <span className="italic text-white/70">precision</span> and{" "}
              <span className="italic text-white/70">measurable impact</span>.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {profile.aboutLead}
            </p>
          </div>
        </m.section>

        {/* STATS */}
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionReveal}
          transition={{ duration: 0.6 }}
          className="relative border-y border-white/5 bg-[#141416] px-5 py-24 sm:px-10 sm:py-32"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-16 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-sans text-[clamp(3rem,8vw,6rem)] leading-none text-white">
                  {stat.value}
                </div>
                <p className="mt-4 max-w-[12ch] mx-auto text-[11px] uppercase leading-relaxed text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </m.section>

        {/* SELECTED WORK */}
        <div id="work">
          <WorkSection />
        </div>

        {/* EXPERTISE */}
        <section
          id="expertise"
          className="relative border-y border-white/5 bg-[#141416] px-5 py-32 sm:px-10 sm:py-44"
        >
          <div className="mx-auto max-w-6xl">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl"
            >
              <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white">
                Core <span className="italic text-white/50">competencies</span>.
              </h2>
            </m.div>

            <div className="grid gap-px bg-white/5 md:grid-cols-2">
              {[
                {
                  title: "SOC Operations",
                  body: "SIEM triage, L1 alerts, SLA-led incident response and threat monitoring.",
                },
                {
                  title: "SAP GRC",
                  body: "Access control, ARA, EAM, SoD policies and audit reporting.",
                },
                {
                  title: "Vulnerability Management",
                  body: "Nessus scans, risk assessment, structured remediation tickets.",
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
                  className="group bg-[#141416] p-10 transition-colors hover:bg-[#1E1E22] sm:p-14"
                >
                  <span className="text-[10px] uppercase text-white/40">0{i + 1}</span>
                  <h3 className="mt-4 font-sans text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] text-white transition-colors group-hover:text-[#FF5A1F]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                    {service.body}
                  </p>
                </m.div>
              ))}
            </div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-20 grid grid-cols-2 gap-10 pt-10 md:grid-cols-4"
            >
              {skills.map((group) => (
                <div key={group.label}>
                  <p className="text-[10px] uppercase text-[#FF5A1F]/70">{group.label}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/60">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="relative bg-[#141416] px-5 py-32 sm:px-10 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl"
            >
              <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white">
                Technical Experience & <span className="italic text-white/50">Infrastructure</span>.
              </h2>
            </m.div>

            <div className="space-y-0">
              {experience.map((item) => (
                <m.article
                  key={`${item.role}-${item.company}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionReveal}
                  transition={{ duration: 0.5 }}
                  className="group border-t border-white/5 py-12 transition-colors hover:bg-white/[0.01] sm:py-16"
                >
                  <div className="grid gap-6 sm:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr_1.2fr]">
                    <span className="text-xs uppercase text-[#FF5A1F]/70">{item.year}</span>
                    <div>
                      <h3 className="font-sans text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] text-white transition-colors group-hover:text-[#FF5A1F]">
                        {item.role}
                      </h3>
                      <p className="mt-2 text-sm text-white/65">{item.company}</p>
                      <p className="mt-1 text-[10px] uppercase text-white/40">{item.location}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                      {item.note}
                    </p>
                  </div>
                </m.article>
              ))}
              <div className="border-t border-white/5" />
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTS */}
        <section className="relative border-y border-white/5 bg-[#141416] px-5 py-32 sm:px-10 sm:py-44">
          <div className="mx-auto max-w-6xl">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.6 }}
              className="mb-20 max-w-3xl"
            >
              <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white">
                Education & <span className="italic text-white/60">credentials</span>.
              </h2>
            </m.div>

            <div className="grid gap-20 lg:grid-cols-2">
              <div>
                <div className="space-y-0">
                  {education.map((item) => (
                    <m.article
                      key={item.degree}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={sectionReveal}
                      transition={{ duration: 0.5 }}
                      className="border-t border-white/5 py-8"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-sans text-2xl text-white sm:text-3xl">{item.degree}</h3>
                        <span className="text-[10px] uppercase text-white/30">{item.year}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/60">{item.school}</p>
                      <p className="mt-1 text-[10px] uppercase text-white/40">{item.location}</p>
                    </m.article>
                  ))}
                  <div className="border-t border-white/5" />
                </div>
              </div>

              <div>
                <p className="mb-6 text-[10px] uppercase text-[#FF5A1F]/70">Certifications</p>
                <div className="space-y-0">
                  {certifications.map((item) => (
                    <div
                      key={item}
                      className="flex items-baseline justify-between gap-4 border-t border-white/5 py-5"
                    >
                      <span className="text-sm text-white/65">{item}</span>
                      <span className="shrink-0 text-[9px] uppercase text-[#FF5A1F]/60">
                        Verified
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-white/5" />
                </div>

                <p className="mb-6 mt-14 text-[10px] uppercase text-[#FF5A1F]/70">Volunteering</p>
                <div className="space-y-0">
                  {volunteering.map((item) => (
                    <m.article
                      key={item.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={sectionReveal}
                      transition={{ duration: 0.5 }}
                      className="border-t border-white/5 py-6"
                    >
                      <h3 className="font-sans text-lg text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{item.note}</p>
                    </m.article>
                  ))}
                  <div className="border-t border-white/5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="relative overflow-hidden bg-[#141416] px-5 py-32 sm:px-10 sm:py-44"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.05),transparent_60%)]" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl text-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              transition={{ duration: 0.7 }}
            >
              <h2 id="contact-heading" className="font-sans text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] text-white">
                Let&apos;s <span className="italic text-white/60">strengthen</span> what matters.
              </h2>
              <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
                {contact.replyTime}
              </p>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex min-h-[44px] items-center gap-3 border border-white/15 px-8 py-4 text-xs uppercase text-white transition-all hover:border-[#FF5A1F]/50 hover:text-[#FF5A1F]"
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
                  <label htmlFor="contact-name" className="block text-xs uppercase text-white/50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    className="w-full min-h-[44px] rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase text-white/50 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="w-full min-h-[44px] rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase text-white/50 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FF5A1F]/50 focus:outline-none focus:ring-1 focus:ring-[#FF5A1F]/30"
                    placeholder="How can I help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full min-h-[44px] rounded bg-[#FF5A1F] px-6 py-3 text-xs uppercase text-black transition-opacity hover:opacity-85"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
              <a
                href={`https://${contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] flex items-center py-1 transition-colors hover:text-[#FF5A1F]/70"
              >
                LinkedIn
              </a>
              <span className="text-white/20" aria-hidden="true">/</span>
              <a
                href={`https://${contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] flex items-center py-1 transition-colors hover:text-[#FF5A1F]/70"
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
        <footer className="relative border-t border-white/5 bg-[#141416] px-5 py-10 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-[11px] text-white/35">
            <span>&copy; 2026 {profile.name}</span>
            <div className="flex items-center gap-4">
              <span>{contact.location}</span>
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
