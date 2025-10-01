"use client";

import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  PointerEventHandler,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export const offerings = [
  {
    title: "Websites",
    icon: "🌐",
    highlights: [
      "Launch fast with a 1-Page Website",
      "Grow your brand with a 3–5 Page Business Site",
      "Custom Websites with booking, accounts, and rewards built-in",
      "Bilingual (English & Español) to reach more customers and clients",
    ],
  },
  {
    title: "Mobile Apps",
    icon: "📱",
    highlights: [
      "Simple App: your website, now in app form with push alerts",
      "Business App with logins, scheduling, and reminders",
      "E-Commerce & Food Ordering App with payments and rewards",
      "Scalable apps built to expand as your business grows",
    ],
  },
  {
    title: "Industry Solutions",
    icon: "🏗️",
    highlights: [
      "Trade & service websites with booking, automated follow-ups, and lead capture. Perfect for busy entrepreneurs who want more clients without the extra work.",
      "Restaurant, e-commerce, and service based websites and apps with integrated online ordering, reservations, and loyalty rewards.",
      "POS systems with worker tablets, customer kiosks, and displays",
      "Premium Robotics package with seating systems, POS systems, and service robots! Ask us for details.",
      "Simple CRM tools to keep track of clients and repeat business",
    ],
  },
  {
    title: "Custom Software & Automations",
    icon: "⚙️",
    highlights: [
      "Excel automations, financial report automations, finance dashboards, and automated payroll/accounting solutions.",
      "Automated invoicing, payments, and client follow-ups. Digital contracts, online verifications, file encryption, and e-signatures.",
      "Employee portals with clock-In systems, staff scheduling, workforce tracking,HR tools, incicdent reporting, automated notifications systems, and team communications.",
    ],
  },
  {
    title: "Add-Ons",
    icon: "🎨",
    highlights: [
      "Custom branding & logo design",
      "Flyers, menus, and marketing print materials",
      "Branded uniforms, clothing, and team merchandise",
      "Social media setup, digital ads, and campaign support",
      "Professional photography & promo video editing",
    ],
  },
];

const microcopyMessages = [
  "Bilingual: English & Español",
  "Reply in <24h",
  "Tailored plans in 48h",
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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

  useEffect(() => {
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
    if (typeof window === "undefined") return;
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

    return () => window.removeEventListener("deviceorientation", handleOrientation);
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

  const handleButtonPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
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

  const resetButtonOffset: PointerEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    setButtonOffset({ x: 0, y: 0 });
    const { currentTarget } = event;
    currentTarget.style.setProperty("--x", "50%");
    currentTarget.style.setProperty("--y", "50%");
  };

  const handleStickyCTA = () => {
    if (typeof window === "undefined") return;
    setStickyRipple(true);
    window.setTimeout(() => setStickyRipple(false), 400);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      window.location.href = "mailto:ask@codecompas.com";
    }, 750);
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
        <h2 className="heading lg:max-w-[40vw]">Services & Solutions</h2>
        <p className="text-white-200 md:mt-6 mt-4 max-w-3xl">
          Explore our favorite builds and add-ons, then ask us for a tailored
          quote. Every project starts with a conversation so we can make your
          idea come to life! 💻 ✨
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 mt-12">
        {offerings.map((category) => (
          <div
            key={category.title}
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg shadow-purple-500/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-2xl font-semibold text-white">
                {category.title}
              </h3>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {category.highlights.map((item) => (
                <li
                  key={`${category.title}-${item}`}
                  className="flex items-start gap-2 rounded-2xl bg-black/30 p-3"
                >
                  <span className="mt-1 text-purple">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
              All services are bilingual, tailored to your business, and
              kick off with a quick discovery chat. Tell us what you need and
              we&apos;ll reply in under a day with next steps.
            </p>
            <a
              href="mailto:ask@codecompas.com"
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
              <span className="relative z-10">Talk to us about your project 🤠</span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100 [background:radial-gradient(120px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.35),transparent_65%)]" />
            </a>
          </div>
        </div>
      </div>

      {showStickyCTA ? (
        <div className="fixed inset-x-0 bottom-6 z-20 flex justify-center px-6">
          <button
            type="button"
            onClick={handleStickyCTA}
            className="relative flex w-full max-w-xs items-center justify-center overflow-hidden rounded-full border border-white/20 bg-purple-600/90 px-6 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur"
          >
            Talk to us about your project 🤠
            <span
              className={`pointer-events-none absolute inset-0 scale-0 rounded-full bg-white/40 transition-transform duration-300 ease-out ${
                stickyRipple ? "scale-100" : ""
              }`}
            />
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Services;
