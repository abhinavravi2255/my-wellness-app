"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  { emoji: "🌿", title: "Nourish", desc: "Food is medicine. We heal from the inside out through intentional, joyful nutrition." },
  { emoji: "🧠", title: "Think", desc: "A clear, resilient mind is the foundation of every lasting transformation." },
  { emoji: "💤", title: "Rest", desc: "Restoration is not laziness — it's the most productive thing you can do for your health." },
  { emoji: "🏃", title: "Move", desc: "Movement should feel like a celebration of what your body can do, not a punishment." },
  { emoji: "🤝", title: "Connect", desc: "Wellness thrives in community. No journey is meant to be walked alone." },
];

const bigWords = ["LIVE", "WELL", "THRIVE", "HEAL", "GROW", "SHINE"];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big manifesto text - clip reveal
      gsap.fromTo(".manifesto-word",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1,
          duration: 0.9, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".manifesto-headline", start: "top 75%" }
        }
      );

      // Pillar cards stagger
      gsap.fromTo(".pillar-card",
        { y: 60, opacity: 0, scale: 0.94 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".pillars-row", start: "top 75%" }
        }
      );

      // Big scrolling text parallax
      gsap.to(".scroll-text-row-1", {
        x: "-20%",
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".scroll-text-row-2", {
        x: "20%",
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Quote reveal
      gsap.fromTo(".philosophy-quote",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".philosophy-quote", start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "100px",
      }}
    >
      {/* ── Scrolling giant text rows ── */}
      <div style={{
        padding: "60px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        marginBottom: "100px",
        position: "relative",
        background: "var(--surface-2)",
      }}>
        {/* Row 1 */}
        <div className="scroll-text-row-1" style={{
          display: "flex", gap: "60px", whiteSpace: "nowrap",
          marginBottom: "16px",
        }}>
          {[...bigWords, ...bigWords, ...bigWords].map((w, i) => (
            <span key={i} style={{
              fontSize: "clamp(56px, 8vw, 110px)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 700,
              color: i % 3 === 0 ? "var(--primary)" : "transparent",
              WebkitTextStroke: i % 3 === 0 ? "0" : "2px var(--border-active)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              userSelect: "none",
            }}>
              {w}
            </span>
          ))}
        </div>
        {/* Row 2 */}
        <div className="scroll-text-row-2" style={{
          display: "flex", gap: "60px", whiteSpace: "nowrap",
        }}>
          {[...bigWords.slice(3), ...bigWords, ...bigWords, ...bigWords.slice(0, 3)].map((w, i) => (
            <span key={i} style={{
              fontSize: "clamp(56px, 8vw, 110px)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 700,
              color: i % 4 === 1 ? "var(--accent)" : "transparent",
              WebkitTextStroke: i % 4 === 1 ? "0" : "2px var(--border)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              userSelect: "none",
            }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        {/* ── Manifesto headline ── */}
        <div className="manifesto-headline" style={{
          textAlign: "center",
          marginBottom: "72px",
        }}>
          <div style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--primary)",
            marginBottom: "24px",
          }}>
            ✦ The Wellness Philosophy ✦
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(40px, 5.5vw, 78px)",
            fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.08,
            marginBottom: "32px",
          }}>
            {["Wellness", "is not a", "destination."].map((word, i) => (
              <span key={i} className="manifesto-word" style={{
                display: "inline-block", marginRight: word === "is not a" ? "0.25em" : "0.2em",
              }}>
                {i === 0 ? <span className="text-gradient">{word}</span> : word}
              </span>
            ))}
            <br />
            {["It's how you", "live every day."].map((word, i) => (
              <span key={i} className="manifesto-word" style={{
                display: "inline-block", marginRight: "0.2em",
              }}>
                {i === 1 ? <span className="text-gradient-accent">{word}</span> : word}
              </span>
            ))}
          </h2>

          {/* Philosophy quote */}
          <div className="philosophy-quote" style={{
            maxWidth: "680px", margin: "0 auto",
            padding: "32px 48px",
            background: "var(--surface-2)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            borderLeft: "4px solid var(--primary)",
            position: "relative",
          }}>
            <div style={{
              fontSize: "80px", lineHeight: 1,
              color: "var(--primary)", opacity: 0.12,
              position: "absolute", top: "8px", left: "20px",
              fontFamily: "Georgia, serif",
            }}>"</div>
            <p style={{
              fontSize: "19px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              fontStyle: "italic",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              position: "relative", zIndex: 1,
            }}>
              My mission is simple: to guide you back to yourself. To help you feel strong, nourished, and joyfully alive — not for a season, but for life.
            </p>
            <div style={{
              marginTop: "20px", fontSize: "14px", fontWeight: 700,
              color: "var(--primary)", letterSpacing: "0.06em",
            }}>
              — Asuhar B
            </div>
          </div>
        </div>

        {/* ── 5 Pillars ── */}
        <div className="pillars-row" style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px",
        }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              className="pillar-card"
              style={{
                padding: "32px 24px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.35s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "var(--surface-2)";
              }}
            >
              {/* Number */}
              <div style={{
                position: "absolute", top: "14px", right: "16px",
                fontSize: "11px", fontWeight: 700, color: "var(--border-active)",
                letterSpacing: "0.06em",
              }}>0{i + 1}</div>

              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{p.emoji}</div>
              <div style={{
                fontSize: "22px", fontWeight: 700,
                fontFamily: "var(--font-cormorant), Georgia, serif",
                color: "var(--text-primary)", marginBottom: "12px",
              }}>
                {p.title}
              </div>
              <p style={{
                fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7,
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pillars-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .pillars-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
