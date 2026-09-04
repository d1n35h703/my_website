import { useCallback, useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lock, Terminal } from "lucide-react";

const CORRECT_CODE = "284639";

type LoginScreenProps = {
  onAuthenticated: () => void;
};

export function LoginScreen({ onAuthenticated }: LoginScreenProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const bootLines = [
    "portfolio-os 24.04 LTS",
    "Kernel 6.8.0-generic on x86_64",
    "",
    "Initializing security modules...",
    "Loading threat intelligence feeds...",
    "Starting SIEM correlation engine...",
    "All systems nominal.",
    "",
    "Authentication required.",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (bootPhase < bootLines.length) {
      const timer = setTimeout(() => setBootPhase((p) => p + 1), 180);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setShowInput(true), 300);
    return () => clearTimeout(timer);
  }, [bootPhase, bootLines.length]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (error) setError(false);
      if (!/^\d*$/.test(value)) return;

      const next = [...code];
      next[index] = value.slice(-1);
      setCode(next);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (next.every((d) => d !== "")) {
        const entered = next.join("");
        setTimeout(() => {
          if (entered === CORRECT_CODE) {
            onAuthenticated();
          } else {
            setError(true);
            setCode(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
          }
        }, 200);
      }
    },
    [code, error, onAuthenticated],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("").concat(Array(6 - pasted.length).fill(""));
    setCode(next.slice(0, 6));
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A1F]/[0.02] blur-[120px]" />
      </div>

      <m.div
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Terminal window */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12] shadow-2xl shadow-black/50">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#141418] px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 flex-1 text-center text-[10px] text-white/30">
              portfolio-os — login
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-xs">
            {/* Boot lines */}
            <div className="space-y-1">
              {bootLines.slice(0, bootPhase).map((line, i) => (
                <div
                  key={i}
                  className={line.startsWith("All systems") ? "text-[#28c840]" : "text-white/40"}
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>

            {/* Input section */}
            <AnimatePresence>
              {showInput && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <div className="mb-4 flex items-center gap-2 text-white/50">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Enter TOTP code to access desktop</span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        autoFocus={i === 0}
                        className={`h-12 w-10 rounded-lg border bg-white/5 text-center text-lg font-medium text-white outline-none transition-all ${
                          error
                            ? "border-red-500/60 animate-pulse"
                            : digit
                              ? "border-[#FF5A1F]/40 bg-[#FF5A1F]/5"
                              : "border-white/10 focus:border-[#FF5A1F]/50"
                        }`}
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {error && (
                      <m.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 flex items-center justify-center gap-2 text-[11px] text-red-400"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Invalid code. Access denied.
                      </m.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 border-t border-white/5 pt-4 text-center text-[10px] text-white/20">
                    Hint: check your authenticator app
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer branding */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/15">
          <Terminal className="h-3 w-3" />
          <span>Portfolio OS v24.04</span>
        </div>
      </m.div>
    </div>
  );
}
