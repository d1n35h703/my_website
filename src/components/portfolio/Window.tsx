import type { ReactNode, RefObject } from "react";
import { m } from "framer-motion";
import { Minus, Square, X } from "lucide-react";

export function Window({
  title,
  children,
  zIndex,
  isMaximized,
  offset,
  constraintsRef,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: {
  title: string;
  children: ReactNode;
  zIndex: number;
  isMaximized: boolean;
  offset: { x: number; y: number };
  constraintsRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}) {
  return (
    <m.div
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={isMaximized ? { zIndex } : { zIndex, top: offset.y, left: offset.x }}
      className={
        isMaximized
          ? "absolute inset-2 flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          : "absolute flex h-[26rem] w-[min(38rem,88vw)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
      }
    >
      <header className="flex shrink-0 cursor-grab items-center gap-2 border-b border-border bg-background/70 px-3 py-2 active:cursor-grabbing">
        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label="Close window"
            onClick={onClose}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-destructive text-background"
          >
            <X className="h-2 w-2" />
          </button>
          <button
            aria-label="Minimize window"
            onClick={onMinimize}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-primary text-background"
          >
            <Minus className="h-2 w-2" />
          </button>
          <button
            aria-label="Maximize window"
            onClick={onMaximize}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-500 text-background"
          >
            <Square className="h-1.5 w-1.5" />
          </button>
        </div>
        <span className="mx-auto truncate font-mono text-xs text-muted-foreground">{title}</span>
        <span className="w-14 shrink-0" />
      </header>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </m.div>
  );
}
