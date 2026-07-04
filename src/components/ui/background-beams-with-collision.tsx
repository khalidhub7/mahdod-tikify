"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BeamOptions = {
  initialX: string; // use percentages for responsiveness
  translateX?: string;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  heightClass?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
};

type CollisionState = {
  detected: boolean;
  coordinates: { x: number; y: number } | null;
};

const BEAMS: BeamOptions[] = [
  { initialX: "5%", heightClass: "h-10", duration: 7, repeatDelay: 3, delay: 0.5 },
  { initialX: "12%", heightClass: "h-16", duration: 6, repeatDelay: 4, delay: 1.5 },
  { initialX: "20%", heightClass: "h-8", duration: 8, repeatDelay: 5, delay: 0.2 },
  { initialX: "28%", heightClass: "h-14", duration: 5, repeatDelay: 3, delay: 2 },
  { initialX: "36%", heightClass: "h-20", duration: 9, repeatDelay: 6, delay: 1 },
  { initialX: "45%", heightClass: "h-12", duration: 6, repeatDelay: 2, delay: 0.8 },
  { initialX: "54%", heightClass: "h-24", duration: 10, repeatDelay: 5, delay: 2.5 },
  { initialX: "63%", heightClass: "h-9", duration: 7, repeatDelay: 4, delay: 1.2 },
  { initialX: "72%", heightClass: "h-16", duration: 8, repeatDelay: 3, delay: 0.6 },
  { initialX: "80%", heightClass: "h-6", duration: 5, repeatDelay: 4, delay: 1.8 },
  { initialX: "88%", heightClass: "h-14", duration: 9, repeatDelay: 6, delay: 0.4 },
  { initialX: "95%", heightClass: "h-10", duration: 7, repeatDelay: 5, delay: 2.2 },
];

export function BackgroundBeamsWithCollision({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const collisionLineRef = useRef<HTMLDivElement>(null);

  // optional: slightly fewer beams on small screens
  const beams = useMemo(() => BEAMS, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900",
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionBeam
          key={`${beam.initialX}-${index}`}
          beamOptions={beam}
          parentRef={parentRef}
          collisionLineRef={collisionLineRef}
        />
      ))}

      <div className="relative z-10">{children}</div>

      {/* collision surface */}
      <div
        ref={collisionLineRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-neutral-100 dark:bg-neutral-950"
        style={{
          boxShadow:
            "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}

function CollisionBeam({
  beamOptions,
  parentRef,
  collisionLineRef,
}: {
  beamOptions: BeamOptions;
  parentRef: React.RefObject<HTMLDivElement | null>;
  collisionLineRef: React.RefObject<HTMLDivElement | null>;
}) {
  const beamRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const hasCollidedThisCycleRef = useRef(false);

  const [beamKey, setBeamKey] = useState(0);
  const [collision, setCollision] = useState<CollisionState>({
    detected: false,
    coordinates: null,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCollisionCheck = () => {
    if (
      hasCollidedThisCycleRef.current ||
      !beamRef.current ||
      !collisionLineRef.current ||
      !parentRef.current
    ) {
      return;
    }

    const beamRect = beamRef.current.getBoundingClientRect();
    const collisionRect = collisionLineRef.current.getBoundingClientRect();
    const parentRect = parentRef.current.getBoundingClientRect();

    if (beamRect.bottom >= collisionRect.top) {
      hasCollidedThisCycleRef.current = true;

      const x = beamRect.left - parentRect.left + beamRect.width / 2;
      const y = beamRect.bottom - parentRect.top;

      setCollision({
        detected: true,
        coordinates: { x, y },
      });

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        hasCollidedThisCycleRef.current = false;
        setBeamKey((prev) => prev + 1);
      }, 900);
    }
  };

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{
          y: beamOptions.initialY ?? -250,
          x: beamOptions.initialX,
          rotate: beamOptions.rotate ?? 0,
        }}
        animate={{
          y: beamOptions.translateY ?? 1600,
          x: beamOptions.translateX ?? beamOptions.initialX,
          rotate: beamOptions.rotate ?? 0,
        }}
        transition={{
          duration: beamOptions.duration ?? 8,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay ?? 0,
        }}
        onUpdate={handleCollisionCheck}
        className={cn(
          "absolute top-0 left-0 w-px rounded-full bg-linear-to-t from-indigo-500 via-purple-500 to-transparent",
          "opacity-70 will-change-transform",
          beamOptions.heightClass ?? "h-14"
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}-${beamKey}`}
            style={{
              left: collision.coordinates.x,
              top: collision.coordinates.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Explosion({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        x: Math.floor(Math.random() * 80 - 40),
        y: Math.floor(Math.random() * -60 - 12),
        duration: Math.random() * 0.8 + 0.4,
      })),
    []
  );

  return (
    <div
      {...props}
      className={cn("pointer-events-none absolute z-20 h-2 w-2", className)}
    >
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute -left-6 top-0 h-[2px] w-14 rounded-full bg-linear-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 blur-[1px]"
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0.6,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: particle.duration, ease: "easeOut" }}
          className="absolute left-0 top-0 h-1 w-1 rounded-full bg-linear-to-b from-indigo-400 to-purple-500"
        />
      ))}
    </div>
  );
}