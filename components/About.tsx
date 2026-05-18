"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BookOpen, Heart, Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const credentials = [
  { icon: <Award size={16} />, text: "Certified Wellness Coach (ICF Accredited)" },
  { icon: <BookOpen size={16} />, text: "Nutrition & Lifestyle Medicine Practitioner" },
  { icon: <Heart size={16} />, text: "Mindfulness-Based Stress Reduction (MBSR)" },
  { icon: <Leaf size={16} />, text: "Integrative Health & Functional Wellness" },
];

const journey = [
  { year: "2016", title: "The Turning Point", desc: "After struggling with burnout and chronic stress, I discovered the power of holistic wellness — and it changed everything." },
  { year: "2018", title: "Getting Certified", desc: "Pursued rigorous training in wellness coaching, nutrition science, and mindfulness-based practices." },
  { year: "2020", title: "Launching Practice", desc: "Opened doors to my private coaching practice, helping individuals reclaim their vitality and joy." },
  { year: "2024", title: "Growing Community", desc: "500+ lives transformed through personalised programs, group circles, and digital wellness resources." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-img-col",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-grid", start: "top 75%" } }
      );
      gsap.fromTo(".about-text-col",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-grid", start: "top 75%" } }
      );
      gsap.fromTo(".journey-item",
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".journey-list", start: "top 78%" }
        }
      );
      gsap.fromTo(".credential-item",
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".credentials-list", start: "top 82%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div className="orb orb-accent" style={{ width: "400px", height: "400px", top: "0", right: "-100px", opacity: 0.4 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Grid */}
        <div className="about-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
          marginBottom: "90px",
        }}>
          {/* Left: Image */}
          <div className="about-img-col" style={{ position: "relative" }}>
            <div style={{
              position: "relative", borderRadius: "var(--radius-xl)",
              overflow: "hidden", aspectRatio: "3/4", maxHeight: "560px",
              boxShadow: "var(--shadow-deep)",
            }}>
              <Image
                src="/wellness-about.png"
                alt="Asuhar B — Wellness Coach consultation"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(14,26,18,0.5) 0%, transparent 60%)",
              }} />
            </div>

            {/* Floating badge */}
            <div style={{
              position: "absolute", top: "-24px", right: "-24px",
              background: "var(--gradient-accent)",
              borderRadius: "var(--radius-lg)", padding: "22px",
              textAlign: "center", boxShadow: "var(--shadow-deep)",
              minWidth: "120px",
            }}>
              <div style={{ fontSize: "36px", fontWeight: 700, fontFamily: "var(--font-cormorant), Georgia, serif", color: "white", lineHeight: 1 }}>8+</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginTop: "4px" }}>Years of<br />Excellence</div>
            </div>

            {/* Decorative element */}
            <div style={{
              position: "absolute", bottom: "-20px", left: "-20px",
              background: "var(--surface)", border: "1px solid var(--border-active)",
              borderRadius: "var(--radius)", padding: "16px 22px",
              boxShadow: "var(--shadow-card)",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "var(--gradient-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Heart size={18} fill="white" style={{ color: "white" }} />
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-cormorant), Georgia, serif" }}>95% Success</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Client outcomes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about-text-col">
            <div className="section-tag" style={{ marginBottom: "24px" }}>
              <Heart size={12} /> My Story
            </div>
            <h2 className="font-display" style={{
              fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px",
            }}>
              From Burnout to<br /><span className="text-gradient">Radiant Wellbeing</span>
            </h2>

            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "20px" }}>
              I'm <strong style={{ color: "var(--text-primary)" }}>Asuhar B</strong>, a certified Wellness & Lifestyle Builder with over 8 years of experience guiding individuals toward their healthiest, most fulfilling lives.
            </p>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "32px" }}>
              My journey began from a deeply personal place — navigating my own battles with stress, poor health habits, and a disconnected lifestyle. That transformation ignited my passion for helping others create lives they truly love, from the inside out.
            </p>

            {/* Credentials */}
            <div className="credentials-list" style={{ marginBottom: "36px" }}>
              {credentials.map((c, i) => (
                <div key={i} className="credential-item" style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 0",
                  borderBottom: i < credentials.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "var(--primary-glow)", border: "1px solid var(--border-active)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--primary)", flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <span style={{ fontSize: "15px", color: "var(--text-secondary)", fontWeight: 500 }}>{c.text}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ display: "inline-flex" }}>
              Work With Me <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Journey timeline */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "80px" }}>
          <h3 className="font-display" style={{
            fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700,
            textAlign: "center", marginBottom: "56px", letterSpacing: "-0.01em",
          }}>
            My <span className="text-gradient">Wellness Journey</span>
          </h3>
          <div className="journey-list" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px",
          }}>
            {journey.map((j, i) => (
              <div key={i} className="journey-item" style={{
                padding: "32px 28px",
                background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)",
                borderRadius: i === 0 ? "var(--radius-lg) 0 0 var(--radius-lg)" : i === 3 ? "0 var(--radius-lg) var(--radius-lg) 0" : "0",
                border: "1px solid var(--border)",
                borderLeft: i === 0 ? "1px solid var(--border)" : "none",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  fontSize: "13px", fontWeight: 700, color: "var(--primary)",
                  letterSpacing: "0.08em", marginBottom: "12px",
                }}>
                  {j.year}
                </div>
                <div style={{
                  width: "3px", height: "24px", background: "var(--gradient-primary)",
                  borderRadius: "2px", marginBottom: "16px",
                }} />
                <h4 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px", color: "var(--text-primary)", fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                  {j.title}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {j.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .journey-list { grid-template-columns: 1fr 1fr !important; }
          .journey-item { border-radius: var(--radius) !important; border-left: 1px solid var(--border) !important; }
        }
        @media (max-width: 560px) {
          .journey-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
