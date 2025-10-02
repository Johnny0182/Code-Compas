"use client";

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  PointerEventHandler,
} from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export const offerings = [
  {
    title: "Websites",
    icon: "🌐",
    badge: "Launch-ready",
    description:
      "Signature marketing sites, crafted to convert visitors into booked calls and loyal fans.",
    price: "$1,250",
    priceCaption: "Starting at",
    timeline: "2–4 weeks",
    highlights: [
      "Conversion-first landing pages, multi-page sites, and bilingual experiences (English & Español)",
      "Lead capture, booking flows, chat widgets, and CRM-ready automations built in",
      "On-page SEO, analytics setup, and concierge handoff so you’re launch-ready from day one",
    ],
    ctaLabel: "Plan your website",
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    badge: "Fan-favorite",
    description:
      "Premium iOS, Android, and web apps that keep your community close and engaged.",
    price: "$6,500",
    priceCaption: "Starting at",
    timeline: "4–8 weeks",
    highlights: [
      "Cross-platform builds with secure logins, personalized dashboards, and push notifications",
      "In-app commerce, loyalty rewards, and subscription funnels to grow revenue",
      "App Store & Play Store launch support with analytics, A/B testing, and growth playbooks",
    ],
    ctaLabel: "Design my app",
  },
  {
    title: "Industry Solutions",
    icon: "🏗️",
    badge: "Tailored",
    description:
      "Pre-vetted digital stacks built for restaurants, retailers, trades, hospitality, and beyond.",
    price: "$3,800",
    priceCaption: "Starting at",
    timeline: "3–6 weeks",
    highlights: [
      "Online ordering, reservations, field service scheduling, and automated follow-ups",
      "POS systems, kiosks, and digital signage that sync with your existing tools",
      "Smart robotics, inventory tracking, and compliance workflows on one connected dashboard",
    ],
    ctaLabel: "Explore industry kits",
  },
  {
    title: "Custom Software & Automations",
    icon: "⚙️",
    badge: "Most requested",
    description:
      "From back-office automation to AI-assisted workflows, we build exactly what your team needs.",
    price: "$2,950",
    priceCaption: "Starting at",
    timeline: "2–5 weeks",
    highlights: [
      "Internal dashboards, ERP connectors, and real-time data visualizations",
      "Secure portals with digital signatures, audit trails, and bilingual support",
      "API integrations, RPA, and low-code orchestration to replace manual busywork",
    ],
    ctaLabel: "Automate my ops",
  },
];

const addOns = [
  "Brand identity suites & launch kits",
  "Content, photo & promo video production",
  "Paid ads, CRM tuning & lifecycle campaigns",
  "Merch, uniforms & on-site signage",
];

const microcopyMessages = [
  "Bilingual: English & Español",
  "Reply in <24h",
  "Tailored plans in 48h",
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const processSlides = [
  {
    title: "1. Planning & Approval",
    description:
      "Every project starts with a planning stage where we map out features, lock in pricing, and get your approval on design direction before we write a single line of code.",
    icon: "📋",
  },
  {
    title: "2. Bilingual Execution",
    description:
      "You get native bilingual execution (English & Español), hands-on training for your team, and regular meetings to keep things moving forward.",
    icon: "🌐",
  },
  {
    title: "3. Launch & Beyond",
    description:
      "Code Compas has you covered from first meeting to final launch and beyond—with a dedicated project lead keeping you in the loop every step.",
    icon: "🚀",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });
  const [messageIndex, setMessageIndex] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [stickyRipple, setStickyRipple] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const autoAdvanceRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const interval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % microcopyMessages.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlight({ x: rect.width / 2, y: rect.height * 0.25, active: false });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (!mediaQuery.matches) return;

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable <= 0 ? 1 : window.scrollY / scrollable;
      setShowStickyCTA(progress > 0.3);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (!mediaQuery.matches) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = clamp(event.beta ?? 0, -45, 45);
      const gamma = clamp(event.gamma ?? 0, -45, 45);

      setTilt((prev) => ({
        ...prev,
        rotateX: clamp(-(beta / 6), -6, 6),
        rotateY: clamp(gamma / 6, -6, 6),
      }));
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const spotlightStyle = useMemo(() => {
    const position = spotlight.active
      ? `${spotlight.x}px ${spotlight.y}px`
      : "50% 20%";

    return {
      background: `radial-gradient(600px circle at ${position}, rgba(138, 96, 255, 0.25), transparent 65%)`,
      opacity: spotlight.active ? 1 : 0.55,
      transition: "background 150ms ease, opacity 400ms ease",
    } as const;
  }, [spotlight]);

  const cardGlowStyle = useMemo(
    () => ({
      background: `radial-gradient(200px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.15), transparent 70%)`,
    }),
    [tilt.glowX, tilt.glowY]
  );

  const handleSectionPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlight({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  const handleSectionPointerLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      rotateX: clamp(((y - centerY) / centerY) * -8, -8, 8),
      rotateY: clamp(((x - centerX) / centerX) * 8, -8, 8),
      glowX: clamp((x / rect.width) * 100, 0, 100),
      glowY: clamp((y / rect.height) * 100, 0, 100),
    });
  };

  const resetTilt = () => {
    setTilt((prev) => ({ ...prev, rotateX: 0, rotateY: 0 }));
  };

  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current && typeof window !== "undefined") {
      window.clearTimeout(autoAdvanceRef.current);
    }
    autoAdvanceRef.current = null;
  }, []);

  const scheduleAutoAdvance = useCallback(() => {
    if (typeof window === "undefined") return;
    autoAdvanceRef.current = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % processSlides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    clearAutoAdvance();
    if (isCarouselHovered) return;
    scheduleAutoAdvance();
    return clearAutoAdvance;
  }, [clearAutoAdvance, scheduleAutoAdvance, currentSlide, isCarouselHovered]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((prev) => {
      if (index === prev) return prev;
      return (index + processSlides.length) % processSlides.length;
    });
  }, []);

  const handleCarouselKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide((currentSlide + 1) % processSlides.length);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(
          (currentSlide - 1 + processSlides.length) % processSlides.length
        );
      }
    },
    [currentSlide, goToSlide]
  );

  const handleCarouselPointerEnter = useCallback(() => {
    setIsCarouselHovered(true);
    clearAutoAdvance();
  }, [clearAutoAdvance]);

  const handleCarouselPointerLeave = useCallback(() => {
    setIsCarouselHovered(false);
  }, []);

  const handleCarouselFocus = useCallback(() => {
    setIsCarouselHovered(true);
    clearAutoAdvance();
  }, [clearAutoAdvance]);

  const handleCarouselBlur = useCallback(() => {
    setIsCarouselHovered(false);
  }, []);

  const handleManualNavigation = useCallback(
    (nextIndex: number) => {
      goToSlide(nextIndex);
      if (typeof window !== "undefined") {
        clearAutoAdvance();
        scheduleAutoAdvance();
      }
    },
    [clearAutoAdvance, goToSlide, scheduleAutoAdvance]
  );

  const handleButtonPointerMove = (
    event: ReactPointerEvent<HTMLAnchorElement>
  ) => {
    const { currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const percentX = clamp(((x + rect.width / 2) / rect.width) * 100, 0, 100);
    const percentY = clamp(((y + rect.height / 2) / rect.height) * 100, 0, 100);
    setButtonOffset({
      x: clamp((x / rect.width) * 16, -12, 12),
      y: clamp((y / rect.height) * 16, -12, 12),
    });
    currentTarget.style.setProperty("--x", `${percentX}%`);
    currentTarget.style.setProperty("--y", `${percentY}%`);
  };

  const resetButtonOffset: PointerEventHandler<HTMLAnchorElement> = (event) => {
    setButtonOffset({ x: 0, y: 0 });
    const { currentTarget } = event;
    currentTarget.style.setProperty("--x", "50%");
    currentTarget.style.setProperty("--y", "50%");
  };

  const handleStickyCTA = () => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    setStickyRipple(true);
    window.setTimeout(() => setStickyRipple(false), 400);
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const emailInput = contactSection?.querySelector(
        "input[name='email']"
      ) as HTMLInputElement | null;
      emailInput?.focus();
    }, 600);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20"
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-slate-950/80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={spotlightStyle}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-white/60">
          Code Compas 🤠
        </p>
        <h2 className="heading lg:max-w-[40vw]">
          Services &amp; Signature Packages
        </h2>
      </div>

      <div className="relative z-10 mt-6 flex w-full justify-center px-6">
        <div
          role="region"
          aria-label="Code Compas process carousel"
          tabIndex={0}
          className="group/carousel relative w-full max-w-[600px] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple/60"
          onPointerEnter={handleCarouselPointerEnter}
          onPointerLeave={handleCarouselPointerLeave}
          onFocus={handleCarouselFocus}
          onBlur={handleCarouselBlur}
          onKeyDown={handleCarouselKeyDown}
        >
          <div
            className="pointer-events-none absolute inset-0 -translate-y-4 rounded-[36px] bg-purple/20 opacity-40 blur-3xl transition-opacity duration-700 group-hover/carousel:opacity-80 group-focus-visible/carousel:opacity-80"
            aria-hidden="true"
          />
          <div className="relative rounded-[32px] bg-gradient-to-r from-purple-500/70 via-blue-500/70 to-purple-500/70 p-[1px]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0e27]/80 px-8 py-10 text-center shadow-2xl shadow-purple-500/30 backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0">
                <span
                  aria-hidden="true"
                  className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-purple/30 opacity-60 blur-3xl animate-first"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-12 h-32 w-32 rounded-full bg-blue-500/25 opacity-60 blur-3xl animate-second"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)] opacity-40"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.25),_rgba(255,255,255,0)_35%,_rgba(255,255,255,0)_65%,_rgba(255,255,255,0.35))] opacity-0 animate-[shimmer_8s_linear_infinite]"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6 text-white">
                <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.32em] text-white/50">
                  <span>Our process</span>
                  <span>{`${currentSlide + 1}/${processSlides.length}`}</span>
                </div>

                <div className="relative w-full min-h-[180px]">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={currentSlide}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex h-full flex-col items-center gap-4"
                    >
                      <span className="text-4xl drop-shadow">{
                        processSlides[currentSlide].icon
                      }</span>
                      <h3 className="text-2xl font-semibold md:text-[28px]">
                        {processSlides[currentSlide].title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/80 md:text-base">
                        {processSlides[currentSlide].description}
                      </p>
                    </motion.article>
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() =>
                      handleManualNavigation(
                        (currentSlide - 1 + processSlides.length) %
                          processSlides.length
                      )
                    }
                    aria-label="Show previous step"
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg text-white/80 opacity-0 transition hover:border-purple/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70 focus:opacity-100 focus:pointer-events-auto pointer-events-none group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100 group-focus-visible/carousel:pointer-events-auto group-focus-visible/carousel:opacity-100"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleManualNavigation(
                        (currentSlide + 1) % processSlides.length
                      )
                    }
                    aria-label="Show next step"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg text-white/80 opacity-0 transition hover:border-purple/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70 focus:opacity-100 focus:pointer-events-auto pointer-events-none group-hover/carousel:pointer-events-auto group-hover/carousel:opacity-100 group-focus-visible/carousel:pointer-events-auto group-focus-visible/carousel:opacity-100"
                  >
                    ›
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                  {processSlides.map((_, index) => (
                    <button
                      key={`process-dot-${index}`}
                      type="button"
                      aria-label={`Show slide ${index + 1}`}
                      aria-pressed={index === currentSlide}
                      onClick={() => handleManualNavigation(index)}
                      className="h-2.5 w-2.5 rounded-full border border-white/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple/70"
                      style={{
                        backgroundColor:
                          index === currentSlide
                            ? "rgba(138, 96, 255, 0.9)"
                            : "rgba(255, 255, 255, 0.18)",
                      }}
                    />
                  ))}
                </div>

                <span className="sr-only" aria-live="polite">
                  {processSlides[currentSlide].title}: {
                    processSlides[currentSlide].description
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-4">
        {offerings.map((category) => (
          <article
            key={category.title}
            className="group relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-xl shadow-purple-500/10 transition duration-300 ease-out hover:-translate-y-2 hover:border-purple-300/40 hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl drop-shadow-sm">{category.icon}</span>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {category.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.32em] text-purple-100/70">
                    {category.badge}
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-purple-300/40 bg-purple-300/10 px-3 py-1 text-xs font-medium text-purple-100">
                {category.timeline}
              </div>
            </div>

            <p className="relative text-sm text-white/80 sm:text-base">
              {category.description}
            </p>

            <div className="relative flex items-end justify-between gap-4 rounded-2xl bg-black/40 px-4 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
                  {category.priceCaption}
                </p>
                <p className="text-2xl font-semibold text-white sm:text-3xl">
                  {category.price}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg">
                  →
                </span>
                <span className="hidden text-right font-medium uppercase tracking-[0.24em] sm:block">
                  Reply in &lt;24h
                </span>
              </div>
            </div>

            <ul className="relative flex flex-col gap-3 text-sm text-white/90">
              {category.highlights.map((item) => (
                <li
                  key={`${category.title}-${item}`}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/30 p-3 transition duration-200 group-hover:border-purple-200/40"
                >
                  <span className="mt-1 text-purple">✦</span>
                  <span className="leading-relaxed text-pretty">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-purple-200/30 bg-gradient-to-r from-purple-600/70 via-fuchsia-500/60 to-purple-600/70 px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_40px_rgba(109,40,217,0.35)] transition hover:shadow-[0_18px_55px_rgba(109,40,217,0.55)]"
            >
              {category.ctaLabel}
              <span className="text-base">→</span>
            </a>
          </article>
        ))}
      </div>

      <div className="relative z-10 mt-10 flex flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 text-center shadow-lg shadow-purple-500/10">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/60">
          Add-ons to layer in
        </p>
        <p className="max-w-2xl text-sm text-white/75 sm:text-base">
          Elevate any package with creative extras—branding, content, marketing
          ops, on-site collateral, and more. Ask about bundle pricing when we
          scope your project.
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          {addOns.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur"
            >
              <span className="text-purple">＋</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-16 flex justify-center px-6">
        <div
          ref={cardRef}
          className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/10 px-8 py-10 text-center shadow-2xl backdrop-blur-xl transition-transform duration-200 ease-out will-change-transform"
          onPointerMove={handleCardPointerMove}
          onPointerLeave={resetTilt}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[32px] opacity-80"
            style={cardGlowStyle}
          />
          <div className="relative z-10 flex flex-col items-center gap-5 text-white">
            <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-100/80 transition-opacity">
              {microcopyMessages[messageIndex]}
            </span>
            <h3 className="text-3xl font-semibold md:text-4xl">
              Ready to take your digital presence to the next level?
            </h3>
            <p className="text-sm text-white/80 md:text-base">
              All services are bilingual, tailored to your business, and kick
              off with a quick discovery chat. Tell us what you need and
              we&apos;ll reply in under a day with next steps.
            </p>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-purple-300/30 bg-gradient-to-r from-purple-500/80 via-fuchsia-500/70 to-purple-500/80 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_15px_45px_rgba(109,40,217,0.35)] transition duration-150 ease-out"
              style={
                {
                  transform: `translate3d(${buttonOffset.x}px, ${buttonOffset.y}px, 0)`,
                  "--x": "50%",
                  "--y": "50%",
                } as CSSProperties
              }
              onPointerMove={handleButtonPointerMove}
              onPointerLeave={resetButtonOffset}
            >
              <span className="relative z-10">
                Talk to us about your project 🤠
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(120px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.35),transparent_65%)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
