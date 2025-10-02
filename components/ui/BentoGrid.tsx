import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import animationData from "@/data/confetti.json";
type BentoGridProps = {
  className?: string;
  children?: React.ReactNode;
};

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

type BentoGridItemProps = {
  className?: string;
  id: number;
  title?: ReactNode;
  description?: ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
};

const ContactCard = ({ title }: { title?: ReactNode }) => {
  const emailAddress = "ask@codecompas.com";
  const [isCopied, setIsCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const confettiOptions = useMemo(
    () => ({
      loop: false,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }),
    []
  );

  const handleCopy = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).catch(() => undefined);
    }

    setIsCopied(true);
    setShowConfetti(true);
    setShowToast(true);

    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current);
    }
    confettiTimeoutRef.current = setTimeout(() => {
      setShowConfetti(false);
    }, 1200);

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    resetTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      setShowToast(false);
      setShowConfetti(false);
    }, 3000);
  }, [emailAddress]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }
    };
  }, []);

  const label = isCopied ? "Email copied!" : "Copy Email";

  return (
    <div className="relative flex h-full flex-col justify-between gap-6 px-6 py-8 lg:px-10 lg:py-12">
      <div className="relative z-10 space-y-3 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#98A2D7]/70">
          Let’s talk about your project 🙌
        </p>
        {title && (
          <h3 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
            {title}
          </h3>
        )}
        <p className="text-sm text-[#C1C2D3]/80">
          No booking needed for a quote. Just email us and we’ll reply within 24
          hours. 📬 One click to copy.
        </p>
      </div>

      <div className="relative flex h-48 w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
        <motion.button
          type="button"
          onClick={handleCopy}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "relative isolate flex w-full max-w-[240px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300",
            "shadow-[0_18px_36px_rgba(21,24,45,0.35)] hover:shadow-[0_26px_50px_rgba(33,36,65,0.45)] focus:outline-none",
            isCopied && "bg-white/[0.08]"
          )}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-[#6C5CE7] via-[#8C7DFF] to-[#C6B1FF]"
            initial={false}
            animate={{ y: isHovered ? "0%" : "110%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            style={{ originY: 0 }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 z-[-1] rounded-full bg-white/5"
            initial={false}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 z-0 rounded-full bg-[radial-gradient(120%_120%_at_50%_50%,rgba(138,96,255,0.45),transparent)] blur-xl"
            initial={false}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.35 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <motion.span
              aria-hidden
              initial={false}
              animate={{
                rotate: isHovered ? -8 : 0,
                scale: isCopied ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="text-lg leading-none"
            >
              🤠
            </motion.span>
            <span className="text-center leading-snug">{label}</span>
          </span>
        </motion.button>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              key="confetti"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie options={confettiOptions} height={220} width={280} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showToast && (
            <motion.div
              key="toast"
              className="pointer-events-none absolute bottom-4 left-1/2 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 rounded-2xl bg-white/10 px-4 py-3 text-center text-xs font-medium text-white backdrop-blur"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: BentoGridItemProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: rect.width / 2, y: rect.height * 0.4, active: false });
  }, []);

  const spotlightStyle = useMemo<CSSProperties>(() => {
    const position = spotlight.active
      ? `${spotlight.x}px ${spotlight.y}px`
      : "50% 40%";

    return {
      background: `radial-gradient(360px circle at ${position}, rgba(138, 96, 255, 0.24), transparent 65%)`,
      opacity: spotlight.active ? 1 : 0.35,
      transition: "opacity 220ms ease, background 220ms ease",
    };
  }, [spotlight]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setSpotlight({ x, y, active: true });
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  }, []);

  const containerClasses = cn(
    "row-span-1 relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080C1A] group/bento transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(15,19,45,0.45)]",
    className
  );

  if (id === 6) {
    return (
      <div
        ref={cardRef}
        className={containerClasses}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-screen"
          style={spotlightStyle}
        />
        <ContactCard title={title} />
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={containerClasses}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl mix-blend-screen"
        style={spotlightStyle}
      />
      <div className="relative flex h-full flex-col">
        {img && (
          <div className="absolute inset-0">
            <img
              src={img}
              alt=""
              className={cn(
                "h-full w-full object-cover object-center",
                imgClassName
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C1A] via-[#080C1A]/70 to-transparent" />
          </div>
        )}

        {spareImg && (
          <div
            className={cn(
              "absolute right-0 -bottom-5",
              id === 5 ? "w-full opacity-80" : "w-40"
            )}
          >
            <img
              src={spareImg}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        <div
          className={cn(
            "relative z-10 flex min-h-40 flex-col gap-3 px-6 py-8 transition-transform duration-300 ease-out group-hover/bento:translate-x-2 lg:px-10 lg:py-12",
            titleClassName
          )}
        >
          {description && (
            <div className="font-sans text-sm font-extralight text-[#C1C2D3] md:max-w-32 md:text-xs lg:text-base">
              {description}
            </div>
          )}
          {title && (
            <div className="font-sans text-lg font-bold text-white lg:text-3xl">
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
