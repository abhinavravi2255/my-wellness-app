"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Brain, Apple, Moon, Activity, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: <Heart size={28} />,
    title: "Holistic Wellness Coaching",
    desc: "A whole-person approach integrating physical health, emotional wellbeing, and spiritual balance.",
    color: "var(--primary)",
    span: "col-span-2 row-span-2",
    features: ["1:1 tailored sessions", "Weekly deep check-ins", "Complete lifestyle assessment", "Continuous messaging support"],
  },
  {
    icon: <Brain size={24} />,
    title: "Mental Fitness",
    desc: "Rewire limiting beliefs and build unshakeable resilience.",
    color: "var(--accent)",
    span: "col-span-1 row-span-1",
  },
  {
    icon: <Apple size={24} />,
    title: "Nutrition & Intuitive Eating",
    desc: "Personalised guidance that works with your body and lifestyle — no fad diets.",
    color: "var(--primary-light)",
    span: "col-span-1 row-span-1",
  },
  {
    icon: <Moon size={24} />,
    title: "Sleep Optimisation",
    desc: "Unlock peak energy through science-backed recovery protocols.",
    color: "var(--text-secondary)",
    span: "col-span-1 row-span-1",
  },
  {
    icon: <Activity size={24} />,
    title: "Vitality Movement",
    desc: "Sustainable movement practices tailored to your goals.",
    color: "var(--accent-light)",
    span: "col-span-1 row-span-1",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".services-header", start: "top 80%" } }
      );
      gsap.fromTo(".bento-item",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".bento-grid", start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-pad" style={{
      position: "relative", overflow: "hidden",
      background: "var(--background)",
    }}>
      <div className="dot-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="services-header" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ marginBottom: "20px" }}>
            <Sparkles size={12} /> Transformative Pathways
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(36px, 4.5vw, 60px)",
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Programs Built Around <br />
            <span className="text-gradient">Your Unique Biology</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
            Discover an interconnected approach to wellness. We don't just treat symptoms; we rebuild your foundation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(240px, auto)", gap: "20px",
        }}>
          {services.map((s, i) => (
            <div key={i} className={`bento-item ${s.span} bento-mobile-reset`} style={{
              background: i === 0 ? "var(--surface-2)" : "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: i === 0 ? "48px 40px" : "32px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              position: "relative", overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--border-active)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "var(--shadow-glow)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              
              {/* Top/Icon */}
              <div style={{ marginBottom: i === 0 ? "40px" : "24px", position: "relative" }}>
                <div style={{
                  width: i === 0 ? "64px" : "48px", height: i === 0 ? "64px" : "48px",
                  borderRadius: "16px",
                  background: "var(--primary-glow)", border: "1px solid var(--border-active)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, marginBottom: "20px", position: "relative", zIndex: 2,
                }}>
                  {s.icon}
                </div>

                {/* Portrait integration on the first card */}
                {i === 0 && (
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "100px", height: "100px", borderRadius: "50%",
                    overflow: "hidden", border: "4px solid var(--surface-2)",
                    boxShadow: "var(--shadow-card)", zIndex: 1,
                  }}>
                    <Image
                      src="/asuhar-new.jpeg"
                      alt="Coach Asuhar B"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                <h3 style={{
                  fontSize: i === 0 ? "32px" : "22px", fontWeight: 700,
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "var(--text-primary)", marginBottom: "12px",
                  lineHeight: 1.1,
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: i === 0 ? "16px" : "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>

              {/* Bottom/Features (Only for primary large card) */}
              {s.features && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "auto" }}>
                  {s.features.map((f, fi) => (
                    <div key={fi} style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      background: "var(--surface)", border: "1px solid var(--border)",
                      padding: "8px 14px", borderRadius: "100px",
                      fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)",
                    }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)" }} />
                      {f}
                    </div>
                  ))}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 14px", fontSize: "14px", fontWeight: 700, color: "var(--primary)",
                  }}>
                    Explore Program <ArrowRight size={14} />
                  </div>
                </div>
              )}

              {/* Decorative corner accent on small cards */}
              {!s.features && (
                <div style={{ position: "absolute", bottom: "24px", right: "24px", opacity: 0.3, color: s.color }}>
                  <ArrowRight size={20} style={{ transform: "rotate(-45deg)" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-grid { display: flex !important; flex-direction: column !important; gap: 16px !important; }
          .bento-mobile-reset { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}
