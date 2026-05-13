"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, ArrowRight, Gift } from "lucide-react";
import MagneticButton from "./MagneticButton";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.to(".cta-glow", {
        scale: 1.25, opacity: 0.5, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "80px 24px", position: "relative", overflow: "hidden", background: "var(--surface)" }}>
      <div className="cta-glow orb orb-primary" style={{ width: "700px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.25 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="cta-content" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent-glow)", border: "1px solid var(--accent)", borderRadius: "100px", padding: "8px 18px", marginBottom: "28px", fontSize: "13px", fontWeight: 700, color: "var(--accent)" }}>
          <Gift size={14} /> Limited Time Offer — Free Implementation Worth ₹15,000
        </div>
        <h2 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "20px" }}>
          Transform Your Business with<br /><span className="text-gradient">TallyPrime Today</span>
        </h2>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Get started with India's #1 business software. Free consultation, free implementation, and a dedicated support team that actually picks up the phone.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {["✓ Free Implementation", "✓ Free Data Migration", "✓ 24/7 Support", "✓ No-Cost EMI Available", "✓ GST Ready"].map(f => (
            <span key={f} style={{ background: "var(--primary-glow)", border: "1px solid var(--border-active)", borderRadius: "100px", padding: "6px 14px", fontSize: "13px", color: "var(--primary-light)", fontWeight: 600 }}>{f}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <MagneticButton>
            <a href="#contact" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
              <Zap size={18} /> Get in Touch Now
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="tel:+919847482559" className="btn-outline" style={{ fontSize: "16px", padding: "14px 32px" }}>
              Call Us Now <ArrowRight size={16} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
