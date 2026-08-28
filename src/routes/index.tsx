import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LazyMotion, m, domAnimation } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import { useViewMode } from "@/hooks/useViewMode";
import { LandingView } from "@/components/landing/LandingView";
import { UbuntuView } from "@/components/portfolio/UbuntuView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dinesh Dibbada - Cybersecurity Analyst Portfolio" },
      {
        name: "description",
        content:
          "Cybersecurity analyst portfolio - SOC operations, SAP GRC, vulnerability assessment and threat monitoring.",
      },
      { property: "og:title", content: "Dinesh Dibbada - Cybersecurity Analyst Portfolio" },
      {
        property: "og:description",
        content:
          "SOC operations, SAP GRC access control, vulnerability management and digital forensics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { mode, toggle } = useViewMode();

  return (
    <main className="relative min-h-screen bg-background">
      {mode === "ubuntu" && (
        <div className="fixed right-4 bottom-4 z-[100]">
          <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full glass-pill px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/60"
          >
            <MonitorSmartphone className="h-4 w-4 text-primary" />
            Agency View
          </button>
        </div>
      )}

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence mode="wait">
          <m.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {mode === "agency" ? (
              <LandingView onSwitchMode={toggle} />
            ) : (
              <UbuntuView onSwitchMode={toggle} />
            )}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </main>
  );
}
