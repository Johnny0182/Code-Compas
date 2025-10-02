import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { IoCopyOutline } from "react-icons/io5";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";

import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

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
  const [mode, setMode] = useState<"repel" | "attract">("repel");
  const [escapeCount, setEscapeCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const lastRepelRef = useRef<number>(0);

  const x = useSpring(0, { stiffness: 280, damping: 22, mass: 0.8 });
  const y = useSpring(0, { stiffness: 280, damping: 22, mass: 0.8 });
  const rotate = useSpring(0, { stiffness: 180, damping: 24 });
  const scale = useSpring(1, { stiffness: 420, damping: 32 });
  const glowX = useSpring(0, { stiffness: 140, damping: 28 });
  const glowY = useSpring(0, { stiffness: 140, damping: 28 });

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

  const clampPosition = useCallback(
    (targetX: number, targetY: number) => {
      const arena = arenaRef.current;
      const button = buttonRef.current;

      if (!arena || !button) {
        return { x: targetX, y: targetY };
      }

      const arenaRect = arena.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const maxX = arenaRect.width / 2 - buttonRect.width / 2 - 8;
      const maxY = arenaRect.height / 2 - buttonRect.height / 2 - 8;

      return {
        x: Math.max(-maxX, Math.min(maxX, targetX)),
        y: Math.max(-maxY, Math.min(maxY, targetY)),
      };
    },
    []
  );

  const moveButton = useCallback(
    (
      targetX: number,
      targetY: number,
      options: { immediate?: boolean } = {}
    ) => {
      const { x: clampedX, y: clampedY } = clampPosition(targetX, targetY);
      const targetRotation =
        ((Math.atan2(clampedY, clampedX) * 180) / Math.PI) * 0.12;

      if (options.immediate) {
        x.jump(clampedX);
        y.jump(clampedY);
        rotate.jump(targetRotation);
        glowX.jump(clampedX);
        glowY.jump(clampedY);
      } else {
        x.set(clampedX);
        y.set(clampedY);
        rotate.set(targetRotation);
        glowX.set(clampedX);
        glowY.set(clampedY);
      }
    },
    [clampPosition, glowX, glowY, rotate, x, y]
  );

  useEffect(() => {
    moveButton(0, 0, { immediate: true });
  }, [moveButton]);

  useEffect(() => {
    if (mode === "attract") {
      scale.jump(1.12);
      const timeout = setTimeout(() => scale.set(1.05), 220);
      return () => clearTimeout(timeout);
    }

    scale.set(1);
  }, [mode, scale]);

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

  useEffect(() => {
    if (escapeCount >= 3 && mode === "repel") {
      setMode("attract");
    }
  }, [escapeCount, mode]);

  const handleMouseEnter = useCallback(() => {
    setMode("repel");
    setEscapeCount(0);
    lastRepelRef.current = performance.now();
    if (!isCopied) {
      moveButton(0, 0);
    }
  }, [isCopied, moveButton]);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const arena = arenaRef.current;
      const button = buttonRef.current;

      if (!arena || !button) {
        return;
      }

      const arenaRect = arena.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const cardCenterX = arenaRect.left + arenaRect.width / 2;
      const cardCenterY = arenaRect.top + arenaRect.height / 2;

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const cursorX = event.clientX;
      const cursorY = event.clientY;

      const distanceToButton = Math.hypot(
        cursorX - buttonCenterX,
        cursorY - buttonCenterY
      );

      if (mode === "repel") {
        const repelRadius = 120;
        if (distanceToButton < repelRadius) {
          const now = performance.now();
          if (now - lastRepelRef.current > 180) {
            lastRepelRef.current = now;
            setEscapeCount((value) => Math.min(value + 1, 4));
          }

          const dx = buttonCenterX - cursorX;
          const dy = buttonCenterY - cursorY;
          const distance = Math.max(distanceToButton, 1);
          const intensity =
            ((repelRadius - distance) / repelRadius) * 140 + 24;

          const targetX =
            buttonCenterX - cardCenterX + (dx / distance) * intensity;
          const targetY =
            buttonCenterY - cardCenterY + (dy / distance) * intensity;

          moveButton(targetX, targetY);
          return;
        }
      } else {
        const cursorOffsetX = cursorX - cardCenterX;
        const cursorOffsetY = cursorY - cardCenterY;
        const snapRadius = 50;

        if (distanceToButton < snapRadius) {
          moveButton(cursorOffsetX, cursorOffsetY, { immediate: true });
        } else {
          moveButton(cursorOffsetX, cursorOffsetY);
        }
        return;
      }

      if (mode === "repel") {
        const currentX = x.get();
        const currentY = y.get();

        if (Math.abs(currentX) > 4 || Math.abs(currentY) > 4) {
          moveButton(currentX * 0.85, currentY * 0.85);
        } else {
          moveButton(0, 0);
        }
      }
    },
    [mode, moveButton, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    setMode("repel");
    setEscapeCount(0);
    moveButton(0, 0);
  }, [moveButton]);

  const handleCopy = useCallback(() => {
    if (isCopied) {
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).catch(() => undefined);
    }

    setIsCopied(true);
    setShowConfetti(true);
    setMode("repel");
    setEscapeCount(0);
    moveButton(0, 0, { immediate: true });

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
      setShowConfetti(false);
      setMode("repel");
      setEscapeCount(0);
      moveButton(0, 0);
    }, 3000);
  }, [emailAddress, isCopied, moveButton]);

  return (
    <div className="relative flex h-full flex-col justify-between gap-6 px-6 py-8 lg:px-10 lg:py-12">
      <div className="relative z-10 space-y-3 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#98A2D7]/70">
          Say hello
        </p>
        {title && (
          <h3 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
            {title}
          </h3>
        )}
        <p className="text-sm text-[#C1C2D3]/80">
          Prefer email? Copy our address in one click and we will respond
          within one business day.
        </p>
      </div>

      <div
        ref={arenaRef}
        className="relative flex h-48 w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: mode === "attract" ? "pointer" : "default" }}
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ x: glowX, y: glowY }}
        >
          <div className="h-16 w-40 rounded-full bg-[radial-gradient(circle_at_center,_rgba(108,92,231,0.35)_0%,_rgba(108,92,231,0)_70%)] blur-xl" />
        </motion.div>

        <motion.div
          ref={buttonRef}
          className="absolute left-1/2 top-1/2 w-full max-w-[220px] -translate-x-1/2 -translate-y-1/2"
          style={{ x, y, rotate, scale }}
        >
          <MagicButton
            title={isCopied ? "Email copied!" : "Copy our email address"}
            icon={<IoCopyOutline />}
            position="left"
            handleClick={handleCopy}
            otherClasses="!bg-[#6C5CE7] text-white shadow-[0_0_35px_rgba(108,92,231,0.35)] hover:!bg-[#7A6FF2]"
            containerClassName="w-full"
          />
        </motion.div>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              key="confetti"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lottie options={confettiOptions} height={260} width={320} />
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
  const containerClasses = cn(
    "row-span-1 relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080C1A] group/bento transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(15,19,45,0.45)]",
    className
  );

  if (id === 6) {
    return (
      <div className={containerClasses}>
        <ContactCard title={title} />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
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
