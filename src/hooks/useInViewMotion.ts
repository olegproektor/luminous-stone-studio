import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function canObserve() {
  return typeof IntersectionObserver !== "undefined";
}

/** One-shot fade. Stays shown after the first intersection. */
export function useOnceInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduceMotion || !canObserve()) {
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, threshold]);

  return { ref, shown: reduceMotion || shown };
}

/** Continuous visibility. Used to pause hero autoplay off-screen. */
export function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || !canObserve()) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
