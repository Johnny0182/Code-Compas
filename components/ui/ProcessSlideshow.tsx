"use client";

import type {
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const processSlides = [
  {
    title: "1. Planning & Approval",
    description:
      "Every project starts with planning—feature roadmaps, pricing that sticks, and design direction locked before we ever open the repo.",
    icon: "📋",
    stageLabel: "Scope",
  },
  {
    title: "2. Bilingual Execution",
    description:
      "Native English & Español delivery, rhythm of live check-ins and async updates, plus hands-on training that keeps teams confident.",
    icon: "🌐",
    stageLabel: "Build",
  },
  {
    title: "3. Launch & Beyond",
    description:
      "Code Compas steers launch, optimization, and support—your dedicated lead keeps momentum high well past go-live.",
    icon: "🚀",
    stageLabel: "Launch",
  },
] as const;

const slideCount = processSlides.length;
const slideTransition =
  "transform 540ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease-out";
const layerTransition = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";

const fontSwapStyle = { fontDisplay: "swap" } as unknown as CSSProperties;

const normalizeOffset = (index: number, current: number) => {
  let offset = index - current;
  if (offset > slideCount / 2) offset -= slideCount;
  if (offset < -slideCount / 2) offset += slideCount;
  return offset;
};

const ProcessSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const autoAdvanceRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isPaused = isHovered || isFocused;

  const clearAutoAdvance = () => {
    if (autoAdvanceRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    clearAutoAdvance();
    if (isPaused) {
      return () => clearAutoAdvance();
    }

    autoAdvanceRef.current = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => {
      clearAutoAdvance();
    };
  }, [currentSlide, isPaused]);

  useEffect(() => {
    return () => {
      clearAutoAdvance();
    };
  }, []);

  const goToSlide = (nextIndex: number) => {
    clearAutoAdvance();
    setCurrentSlide((prev) => {
      if (nextIndex === prev) return prev;
      const normalized = (nextIndex + slideCount) % slideCount;
      return normalized;
    });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (containerRef.current?.contains(event.target as Node)) {
      setIsFocused(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const related = event.relatedTarget as Node | null;
    if (related && containerRef.current?.contains(related)) {
      return;
    }
    setIsFocused(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide((currentSlide + 1) % slideCount);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }
  };

  const dots = useMemo(() => Array.from({ length: slideCount }), []);

  return (
    <div
      ref={containerRef}
      className="group/process relative flex w-full flex-col items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"
      role="region"
      aria-label="Code Compas engagement process"
      tabIndex={0}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={fontSwapStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-y-6 rounded-[40px] bg-purple-500/30 opacity-30 blur-3xl transition-opacity duration-500 group-hover/process:opacity-60"
      />

      <div className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0f2b]/85 px-7 py-9 text-white shadow-[0_22px_120px_rgba(104,48,255,0.32)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-purple/35 opacity-60 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-20 -left-16 h-36 w-36 rounded-full bg-blue-500/30 opacity-60 blur-[90px]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_65%)] opacity-40"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.2),_rgba(255,255,255,0)_35%,_rgba(255,255,255,0)_65%,_rgba(255,255,255,0.32))] opacity-0 animate-[shimmer_10s_linear_infinite]"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-white/60">
            <span>Our process</span>
            <span>{`${currentSlide + 1}/${slideCount}`}</span>
          </div>

          <div className="relative h-[230px] w-full">
            {processSlides.map((slide, index) => {
              const offset = normalizeOffset(index, currentSlide);
              const isActive = offset === 0;
              return (
                <div
                  key={slide.title}
                  className="absolute inset-0 flex h-full w-full items-center justify-center"
                  aria-hidden={!isActive}
                  style={{
                    transform: `translateX(${offset * 100}%)`,
                    opacity: isActive ? 1 : 0,
                    transition: slideTransition,
                    pointerEvents: isActive ? "auto" : "none",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      transform: `translateX(${offset * 24}%) scale(${isActive ? 1 : 0.94})`,
                      transition: layerTransition,
                      willChange: "transform",
                    }}
                  >
                    <div className="h-full w-full rounded-[24px] bg-[radial-gradient(circle_at_center,_rgba(128,90,255,0.3),_transparent_70%)] opacity-80" />
                  </div>

                  <div
                    className="relative flex w-full max-w-[460px] flex-col items-center gap-4 rounded-[24px] border border-white/15 bg-white/5 px-6 py-7 text-center backdrop-blur-xl"
                    style={{
                      transform: `translateX(${offset * 18}%)`,
                      transition: slideTransition,
                      willChange: "transform",
                    }}
                  >
                    <span
                      className="text-4xl drop-shadow"
                      aria-hidden="true"
                      role="img"
                      loading="eager"
                      style={{
                        transform: `translateX(${offset * 12}%) translateY(${isActive ? 0 : offset * 6}%)`,
                        transition: layerTransition,
                        willChange: "transform",
                      }}
                    >
                      {slide.icon}
                    </span>
                    <div
                      className="space-y-2"
                      style={{
                        transform: `translateX(${offset * 8}%)`,
                        transition: layerTransition,
                        willChange: "transform",
                      }}
                    >
                      <h3 className="text-xl font-semibold md:text-2xl">
                        {slide.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/80 md:text-[15px]">
                        {slide.description}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/45">
                      {slide.stageLabel}
                    </span>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => goToSlide((currentSlide - 1 + slideCount) % slideCount)}
              aria-label="Show previous process step"
              className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg text-white/80 opacity-0 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70 focus:opacity-100 md:flex md:group-hover/process:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goToSlide((currentSlide + 1) % slideCount)}
              aria-label="Show next process step"
              className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg text-white/80 opacity-0 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70 focus:opacity-100 md:flex md:group-hover/process:opacity-100"
            >
              ›
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {dots.map((_, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={`process-dot-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => goToSlide(index)}
                  className="h-2.5 w-2.5 rounded-full border border-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(138, 96, 255, 0.95)"
                      : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {processSlides[currentSlide].title}: {processSlides[currentSlide].description}
      </span>
    </div>
  );
};

export default ProcessSlideshow;
