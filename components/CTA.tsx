"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Leaf } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content",
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-content", start: "top 80%" } }
      );

      // Pulse orbs
      gsap.to(".cta-orb-1", { scale: 1.2, opacity: 0.8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".cta-orb-2", { scale: 1.15, opacity: 0.6, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} id="cta" style={{
      position: "relative", overflow: "hidden",
      padding: "100px 0",
    }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--gradient-primary)",
      }} />

      {/* Decorative orbs */}
      <div className="cta-orb-1" style={{
        position: "absolute", width: "600px", height: "600px",
        borderRadius: "50%", background: "rgba(255,255,255,0.05)",
        top: "-200px", left: "-150px", pointerEvents: "none",
      }} />
      <div className="cta-orb-2" style={{
        position: "absolute", width: "400px", height: "400px",
        borderRadius: "50%", background: "rgba(255,255,255,0.06)",
        bottom: "-100px", right: "-100px", pointerEvents: "none",
      }} />

      {/* Pattern overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div className="cta-content">
          {/* Icon */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
            backdropFilter: "blur(10px)",
          }}>
            <Leaf size={28} style={{ color: "white" }} />
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 700,
            color: "white", lineHeight: 1.08,
            letterSpacing: "-0.02em", marginBottom: "24px",
          }}>
            Ready to Begin Your<br />Wellness Journey?
          </h2>

          <p style={{
            fontSize: "18px", color: "rgba(255,255,255,0.82)", lineHeight: 1.7,
            maxWidth: "560px", margin: "0 auto 44px",
          }}>
            Take the first step toward your healthiest, most vibrant self. Book a complimentary discovery call with Asuhar B today — zero pressure, 100% value.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "white", color: "var(--primary-dark)",
              padding: "16px 36px", borderRadius: "100px",
              fontWeight: 700, fontSize: "16px",
              transition: "all 0.3s ease", textDecoration: "none",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Book Free Discovery Call <ArrowRight size={18} />
            </a>
            <a href="#services" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.12)", color: "white",
              padding: "16px 36px", borderRadius: "100px",
              fontWeight: 600, fontSize: "16px",
              border: "1.5px solid rgba(255,255,255,0.3)",
              transition: "all 0.3s ease", textDecoration: "none",
              backdropFilter: "blur(10px)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View All Programs
            </a>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: "52px", display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {[
              { value: "500+", label: "Clients Transformed" },
              { value: "4.9★", label: "Average Rating" },
              { value: "100%", label: "Satisfaction Guaranteed" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "white", fontFamily: "var(--font-cormorant), Georgia, serif" }}>{item.value}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
