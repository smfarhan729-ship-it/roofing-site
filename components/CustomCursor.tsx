"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });
  const ringX = useSpring(0, { damping: 20, stiffness: 180 });
  const ringY = useSpring(0, { damping: 20, stiffness: 180 });

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer'
      );
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Central crisp dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 0 : 1,
        }}
        className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_#ea580c]"
      />

      {/* Trailing glass ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? "rgba(234, 88, 12, 0.85)" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isHovered ? "rgba(234, 88, 12, 0.12)" : "rgba(255, 255, 255, 0.02)",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 220 }}
        className="rounded-full border backdrop-blur-[1px]"
      />
    </div>
  );
}
