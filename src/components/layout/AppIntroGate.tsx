import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

const INTRO_STORAGE_KEY = "site_intro_seen";

interface AppIntroGateProps {
  children: ReactNode;
}

function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return true;
  if (import.meta.env.MODE === "test") return true;

  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

const AppIntroGate = ({ children }: AppIntroGateProps) => {
  const initialLoading = useMemo(() => !hasSeenIntro(), []);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isSiteVisible, setIsSiteVisible] = useState(!initialLoading);

  const handleBackgroundFadeStart = useCallback(() => {
    setIsSiteVisible(true);
  }, []);

  const handleComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Ignore storage failures and still let the UI continue.
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && !isSiteVisible ? <div className="fixed inset-0 z-[9997] bg-[#050505]" aria-hidden="true" /> : null}

      <div
        style={{
          opacity: isSiteVisible ? 1 : 0,
          pointerEvents: isLoading ? "none" : "auto",
          transition: "opacity 0.5s ease-out",
        }}
      >
        {children}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? <LoadingScreen onComplete={handleComplete} onBackgroundFadeStart={handleBackgroundFadeStart} /> : null}
      </AnimatePresence>
    </>
  );
};

export default AppIntroGate;
