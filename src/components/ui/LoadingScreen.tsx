import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  onBackgroundFadeStart?: () => void;
}

interface LottiePlayer {
  destroy: () => void;
  play?: () => void;
  playSegments?: (segments: [number, number] | number[], forceFlag?: boolean) => void;
  stop?: () => void;
  goToAndStop?: (value: number, isFrame?: boolean) => void;
  addEventListener?: (name: string, callback: () => void) => void;
  removeEventListener?: (name: string, callback: () => void) => void;
}

interface LottieRuntime {
  loadAnimation: (config: {
    container: Element;
    renderer: "svg";
    loop: boolean;
    autoplay: boolean;
    path: string;
    rendererSettings?: {
      preserveAspectRatio?: string;
    };
  }) => LottiePlayer;
}

declare global {
  interface Window {
    lottie?: LottieRuntime;
  }
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COMPLETE_DELAY_MS = 980;
const SWITCH_ON_END_FRAME = 120;
const CONTENT_FADE_DELAY_MS = 400;
const REVEAL_DELAY_MS = CONTENT_FADE_DELAY_MS + 760;
const LOTTIE_SCRIPT_SRC = "https://unpkg.com/lottie-web@5.12.2/build/player/lottie.min.js";
const SCENE_PATH = `/intro/scene.json?v=${Date.now()}`;

let lottieScriptPromise: Promise<LottieRuntime> | null = null;

function loadLottieRuntime(): Promise<LottieRuntime> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window is not available"));
  }

  if (window.lottie) {
    return Promise.resolve(window.lottie);
  }

  if (!lottieScriptPromise) {
    lottieScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>('script[data-lottie-runtime="true"]');
      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => {
            if (window.lottie) resolve(window.lottie);
            else reject(new Error("Lottie runtime was not attached to window"));
          },
          { once: true },
        );
        existingScript.addEventListener("error", () => reject(new Error("Failed to load lottie runtime")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = LOTTIE_SCRIPT_SRC;
      script.async = true;
      script.dataset.lottieRuntime = "true";
      script.onload = () => {
        if (window.lottie) resolve(window.lottie);
        else reject(new Error("Lottie runtime was not attached to window"));
      };
      script.onerror = () => reject(new Error("Failed to load lottie runtime"));
      document.head.appendChild(script);
    });
  }

  return lottieScriptPromise;
}

const LoadingScreen = ({ onComplete, onBackgroundFadeStart }: LoadingScreenProps) => {
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isContentRevealing, setIsContentRevealing] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [hasAnimationError, setHasAnimationError] = useState(false);
  const animationHostRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<LottiePlayer | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onBackgroundFadeStartRef = useRef(onBackgroundFadeStart);
  const completeTimeoutRef = useRef<number | null>(null);
  const contentRevealTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onBackgroundFadeStartRef.current = onBackgroundFadeStart;
  }, [onBackgroundFadeStart]);

  useEffect(() => {
    const host = animationHostRef.current;
    if (!host) return;

    let cancelled = false;
    let player: LottiePlayer | null = null;

    const handleAnimationComplete = () => {
      if (cancelled) return;

      setIsRevealing(true);
      onBackgroundFadeStartRef.current?.();
      contentRevealTimeoutRef.current = window.setTimeout(() => {
        setIsContentRevealing(true);
      }, reduceMotion ? 0 : CONTENT_FADE_DELAY_MS);
      completeTimeoutRef.current = window.setTimeout(() => {
        onCompleteRef.current();
      }, reduceMotion ? 120 : REVEAL_DELAY_MS);
    };

    loadLottieRuntime()
      .then((lottie) => {
        if (cancelled || !animationHostRef.current) return;

        player = lottie.loadAnimation({
          container: animationHostRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: SCENE_PATH,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        animationRef.current = player;
        player.goToAndStop?.(0, true);
        player.stop?.();
        player.addEventListener?.("complete", handleAnimationComplete);
        setIsAnimationReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setHasAnimationError(true);
        }
      });

    return () => {
      cancelled = true;
      player?.removeEventListener?.("complete", handleAnimationComplete);
      animationRef.current?.destroy();
      animationRef.current = null;
      if (completeTimeoutRef.current !== null) {
        window.clearTimeout(completeTimeoutRef.current);
      }
      if (contentRevealTimeoutRef.current !== null) {
        window.clearTimeout(contentRevealTimeoutRef.current);
      }
    };
  }, [reduceMotion]);

  const handleEnter = () => {
    if (isPlaying || isRevealing) return;

    if (hasAnimationError) {
      setIsRevealing(true);
      onBackgroundFadeStartRef.current?.();
      contentRevealTimeoutRef.current = window.setTimeout(() => {
        setIsContentRevealing(true);
      }, reduceMotion ? 0 : CONTENT_FADE_DELAY_MS);
      completeTimeoutRef.current = window.setTimeout(() => {
        onCompleteRef.current();
      }, reduceMotion ? 120 : COMPLETE_DELAY_MS);
      return;
    }

    if (!isAnimationReady) return;

    setIsPlaying(true);
    if (animationRef.current?.playSegments) {
      animationRef.current.playSegments([0, SWITCH_ON_END_FRAME], true);
      return;
    }

    animationRef.current?.play?.();
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[#050505]"
        initial={false}
        animate={{ opacity: isRevealing ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_24%,rgba(0,0,0,0)_100%)]" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.button
          type="button"
          aria-label="Открыть сайт"
          onClick={handleEnter}
          disabled={isPlaying || isRevealing}
          className="relative flex items-center justify-center rounded-[40px] bg-transparent p-0 disabled:cursor-default"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: EASE }}
          whileHover={isPlaying || isRevealing || reduceMotion ? undefined : { scale: 1.01 }}
          whileTap={isPlaying || isRevealing || reduceMotion ? undefined : { scale: 0.99 }}
        >
          <motion.div
            className="relative flex flex-col items-center gap-4 sm:gap-5"
            animate={
              isContentRevealing
                ? {
                    scale: 1,
                    opacity: 0,
                  }
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{
              duration: reduceMotion ? 0.2 : 0.72,
              ease: EASE,
            }}
          >
            <motion.div
              className="w-[min(86vw,560px)] text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isContentRevealing ? 0 : 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.7,
                delay: reduceMotion ? 0 : isContentRevealing ? 0 : 0.22,
                ease: EASE,
              }}
            >
              <p className="mx-auto font-body text-[1.08rem] uppercase tracking-[0.22em] text-[#f2e6cf] drop-shadow-[0_0_18px_rgba(242,230,207,0.3)] sm:text-[1.32rem] md:text-[1.68rem]">
                Включите свет
              </p>
            </motion.div>

            <div className="relative h-[300px] w-[400px] sm:h-[360px] sm:w-[480px] md:h-[450px] md:w-[600px]">
              <div
                ref={animationHostRef}
                className="relative z-[1] h-full w-full [&>svg]:h-full [&>svg]:w-full"
              />

              {hasAnimationError ? (
                <div className="absolute inset-0 z-[2] flex items-center justify-center rounded-[32px] border border-white/10 bg-black/70 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="font-display text-3xl uppercase tracking-[0.16em] text-white">
                      Вход
                    </div>
                    <div className="mt-2 font-body text-[10px] uppercase tracking-[0.28em] text-white/45">
                      Нажмите, чтобы войти
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <p className="w-[min(78vw,460px)] text-center font-body text-[11px] uppercase tracking-[0.18em] text-[#f2e6cf] drop-shadow-[0_0_10px_rgba(242,230,207,0.14)] sm:text-xs md:text-[13px]">
              СВЕТИЛЬНИКИ ИЗ КАМНЯ ДЛЯ АРХИТЕКТУРНЫХ ПРОСТРАНСТВ
            </p>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default LoadingScreen;
