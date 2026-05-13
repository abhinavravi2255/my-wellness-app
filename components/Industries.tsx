"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, ShoppingBag, Utensils, Heart, Car, GraduationCap, Gem, Home, Wheat, Factory } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const industries = [
  { icon: Factory, label: "Manufacturing", color: "#0066FF" },
  { icon: ShoppingBag, label: "Retail & FMCG", color: "#00D4FF" },
  { icon: Utensils, label: "Hospitality", color: "#F59E0B" },
  { icon: Heart, label: "Healthcare", color: "#EF4444" },
  { icon: Car, label: "Automobile", color: "#7C3AED" },
  { icon: GraduationCap, label: "Education", color: "#22C55E" },
  { icon: Gem, label: "Jewellery", color: "#FFC107" },
  { icon: Home, label: "Real Estate", color: "#EC4899" },
  { icon: Wheat, label: "Agriculture", color: "#84CC16" },
  { icon: Building2, label: "Construction", color: "#06B6D4" },
];

const logos = ["Tally Solutions", "Microsoft Azure", "GSTN Portal", "Income Tax Dept", "MCA21", "Zoho Books", "QuickBooks", "SAP B1", "Oracle NetSuite", "Tally ERP 9"];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".industries-header", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".industry-item", { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.5)", scrollTrigger: { trigger: ".industries-grid", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" style={{ padding: "100px 0", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div className="industries-header" style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-tag" style={{ marginBottom: "16px" }}><Building2 size={14} /> Industries We Serve</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, marginBottom: "16px" }}>
            Tailored Solutions for <span className="text-gradient">Every Industry</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
            Deep domain expertise across 10+ industries with custom Tally modules for specific business workflows.
          </p>
        </div>

        {/* Grid */}
        <div className="industries-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px", marginBottom: "64px" }}>
          {industries.map(ind => {
            const Icon = ind.icon;
            return (
              <div key={ind.label} className="industry-item" style={{
                background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "16px",
                padding: "28px 16px", textAlign: "center", transition: "all 0.3s ease", cursor: "pointer",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${ind.color}44`; el.style.background = `${ind.color}08`; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.background = "var(--surface-2)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${ind.color}18`, border: `1px solid ${ind.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon size={22} style={{ color: ind.color }} />
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{ind.label}</div>
              </div>
            );
          })}
        </div>

        <div className="divider" style={{ marginBottom: "60px" }} />

        {/* Partner marquee */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Certified & Integrated With
          </p>
        </div>
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
          <div className="animate-marquee" style={{ display: "flex", gap: "24px", width: "max-content" }}>
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "14px 28px", fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) { .industries-grid { grid-template-columns: repeat(4,1fr) !important; } }
        @media (max-width: 768px) { .industries-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 480px) { .industries-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
