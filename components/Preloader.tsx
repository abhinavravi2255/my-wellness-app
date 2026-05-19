"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MWLogo = ({ size = 20, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20V7l5 6 5-6v13" />
    <path d="M12 4v13l5-6 5 6V4" />
  </svg>
);

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = preloaderRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    // Leaf spin & pulse
    tl.fromTo(".preloader-icon", 
      { scale: 0.5, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.5)" }
    )
    .to(".preloader-icon", { scale: 1.1, repeat: 1, yoyo: true, duration: 0.4 }, "-=0.2")
    // Text stagger reveal
    .fromTo(".preloader-text span", 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.6"
    )
    // Curtains wipe up
    .to(".preloader-content", { y: -30, opacity: 0, duration: 0.5, ease: "power3.in", delay: 0.8 })
    .to(".preloader-bg", { height: 0, duration: 0.8, ease: "power4.inOut", stagger: 0.1 }, "-=0.2")
    .set(el, { display: "none" });

    document.body.style.overflow = "hidden";
    tl.eventCallback("onComplete", () => {
      document.body.style.overflow = "";
    });

    return () => { tl.kill(); document.body.style.overflow = ""; };
  }, []);

  return (
    <div ref={preloaderRef} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      {/* Wipe background panels */}
      <div className="preloader-bg" style={{ position: "absolute", top: 0, left: 0, width: "33.333%", height: "100%", background: "var(--background)", zIndex: 1 }} />
      <div className="preloader-bg" style={{ position: "absolute", top: 0, left: "33.333%", width: "33.334%", height: "100%", background: "var(--background)", zIndex: 1 }} />
      <div className="preloader-bg" style={{ position: "absolute", top: 0, left: "66.667%", width: "33.333%", height: "100%", background: "var(--background)", zIndex: 1 }} />

      <div className="preloader-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", position: "relative", zIndex: 2 }}>
        <div className="preloader-icon" style={{
          width: "80px", height: "80px", borderRadius: "24px",
          background: "var(--gradient-primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--shadow-glow)",
        }}>
          <MWLogo size={36} color="white" />
        </div>

        <div className="preloader-text" style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "32px", fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "6px",
            display: "flex", gap: "6px", justifyContent: "center"
          }}>
            <span>Mission</span><span>444</span><span>Wellness</span><span>World</span>
          </div>
          <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              International
            </span>
            <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Lifestyle
            </span>
            <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Trainer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
