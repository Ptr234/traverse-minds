"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** max tilt angle in degrees */
  maxTilt?: number;
  /** perspective distance */
  perspective?: number;
  /** glow follows cursor */
  glowOnHover?: boolean;
  /** glow color in rgb */
  glowColor?: string;
  /** scale on hover */
  hoverScale?: number;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  perspective = 1000,
  glowOnHover = true,
  glowColor = "249, 115, 22",
  hoverScale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    rotateX.set((y - 0.5) * -maxTilt * 2);
    rotateY.set((x - 0.5) * maxTilt * 2);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          scale: isHovering ? hoverScale : 1,
          transition: "scale 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Cursor glow overlay */}
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
            style={{
              background: isHovering
                ? `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(${glowColor}, 0.12) 0%, transparent 60%)`
                : "none",
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Shine line */}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 overflow-hidden"
          style={{ opacity: isHovering ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)`,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
