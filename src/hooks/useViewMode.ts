import { useCallback, useState } from "react";

export type ViewMode = "agency" | "ubuntu";

export function useViewMode(initial: ViewMode = "agency") {
  const [mode, setMode] = useState<ViewMode>(initial);
  const toggle = useCallback(() => setMode((m) => (m === "agency" ? "ubuntu" : "agency")), []);
  return { mode, setMode, toggle };
}
