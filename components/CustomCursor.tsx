"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Set initial position immediately to avoid flicker
    gsap.set([cursor, follower], { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const onMouseMove = (e: MouseEvent) => {
      // Main dot follows instantly
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
      // Ring follows with delay
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isHoverable = target.closest("a, button, input, textarea, select, .product-card, .service-card, .industry-item");
      
      if (isHoverable) {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, { 
          scale: 1.5, 
          backgroundColor: "rgba(61, 107, 79, 0.1)",
          borderColor: "var(--primary)",
          duration: 0.3 
        });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent", 
          borderColor: "var(--accent)", 
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Make sure cursor stays hidden when leaving window
    const onMouseLeave = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    const onMouseEnter = () => gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
    
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="hidden lg:block"
        style={{
          position: "fixed", top: 0, left: 0, width: "8px", height: "8px",
          backgroundColor: "var(--accent)", borderRadius: "50%",
          transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 99999,
        }} 
      />
      <div 
        ref={followerRef} 
        className="hidden lg:block"
        style={{
          position: "fixed", top: 0, left: 0, width: "44px", height: "44px",
          border: "2px solid var(--accent)", borderRadius: "50%",
          transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 99998,
        }} 
      />
    </>
  );
}
