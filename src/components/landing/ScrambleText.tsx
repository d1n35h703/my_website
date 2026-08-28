import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Cycles random uppercase glyphs before settling on `text`. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    let raf = 0;
    frame.current = 0;
    const total = text.length * 4 + 14;

    const tick = () => {
      const f = frame.current++;
      const settled = Math.floor(f / 4);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < settled) out += text[i];
        else if (text[i] === " ") out += " ";
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (f < total) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
