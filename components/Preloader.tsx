"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }
    });

    // 1. Initial state for logo parts
    gsap.set(".preloader-logo .logo-path-1", { x: -20, opacity: 0 });
    gsap.set(".preloader-logo .logo-path-2", { x: 20, opacity: 0 });
    gsap.set(".preloader-logo .logo-path-3", { y: 20, opacity: 0 });
    gsap.set(".preloader-text", { y: 20, opacity: 0 });

    // 2. Animate logo parts coming together
    tl.to(".preloader-logo .logo-path", {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.5)"
    })
    // 3. Text fades in
    .to(".preloader-text", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4")
    // 4. Hold for a moment to let user see it
    .to({}, { duration: 0.6 })
    // 5. Scale up slightly and fade out
    .to(".preloader-content", {
      scale: 1.05,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    })
    // 6. Slide entire preloader screen up
    .to(".preloader-wrapper", {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut"
    });

    return () => {
      document.body.style.overflow = "auto";
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="preloader-wrapper"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div 
        className="preloader-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px"
        }}
      >
        <div className="preloader-logo">
          <Logo size={80} />
        </div>
        <div 
          className="preloader-text"
          style={{
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          TallyPro <span style={{ color: "var(--primary)" }}>Solutions</span>
        </div>
      </div>
    </div>
  );
}
