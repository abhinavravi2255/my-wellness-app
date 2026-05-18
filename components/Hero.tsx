"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Heart, Leaf, Star, CheckCircle, Play } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Floating botanical leaf particle
function LeafParticle({ style, className }: { style: React.CSSProperties, className?: string }) {
  return (
    <div className={className} style={{
      position: "absolute",
      pointerEvents: "none",
      opacity: 0.18,
      ...style,
    }}>
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
        <path d="M14 2C14 2 2 10 2 20C2 28 8 34 14 34C20 34 26 28 26 20C26 10 14 2 14 2Z"
          fill="var(--primary)" />
        <path d="M14 4V32" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Animated typewriter word cycler
const cycleWords = ["Vitality", "Balance", "Purpose", "Energy", "Clarity", "Joy"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState("Vitality");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(8);

  // Typewriter effect
  useEffect(() => {
    const word = cycleWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex <= word.length) {
      setDisplayWord(word.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(c => c + 1), 90);
    } else if (!isDeleting && charIndex > word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && charIndex > 0) {
      setDisplayWord(word.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(c => c - 1), 55);
    } else {
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % cycleWords.length);
      timeout = setTimeout(() => setCharIndex(1), 100);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orbs
      gsap.to(orb1Ref.current, { y: -50, x: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(orb2Ref.current, { y: 40, x: -30, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
      gsap.to(orb3Ref.current, { y: -30, x: 15, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

      // Badge
      gsap.fromTo(".hero-badge", { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.8)", delay: 0.3 }
      );

      // Split title reveal — each line
      gsap.fromTo(".hero-line-1", { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.45 }
      );
      gsap.fromTo(".hero-line-2", { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.6 }
      );
      gsap.fromTo(".hero-line-3", { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.75 }
      );

      // Body text + features
      gsap.fromTo(".hero-body", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );
      gsap.fromTo(".hero-features", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.05 }
      );
      gsap.fromTo(".hero-ctas", { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.2 }
      );

      // Right image
      gsap.fromTo(".hero-img-wrap", { x: 80, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1.3, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(".hero-float-card", { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(2)", delay: 1.1 }
      );

      // Floating image
      gsap.to(".hero-img-wrap", {
        y: -14, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });

      // Leaf particles float
      gsap.utils.toArray<HTMLElement>(".leaf-particle").forEach((el, i) => {
        gsap.to(el, {
          y: `-=${30 + i * 12}`, x: `+=${(i % 2 === 0 ? 1 : -1) * (10 + i * 5)}`,
          rotation: 360, duration: 8 + i * 2, repeat: -1,
          ease: "sine.inOut", delay: i * 0.5,
        });
      });

      // Stats counter
      const counters = [
        { target: 500, suffix: "+", id: "counter-clients" },
        { target: 8, suffix: "+", id: "counter-years" },
        { target: 95, suffix: "%", id: "counter-success" },
        { target: 12, suffix: "+", id: "counter-programs" },
      ];
      counters.forEach(({ target, suffix, id }) => {
        const el = document.getElementById(id);
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 4.0, ease: "power2.out", delay: 1.0,
            onUpdate: () => { el.textContent = Math.ceil(obj.val) + suffix; },
            onComplete: () => {
              gsap.fromTo(el, 
                { scale: 1.4, color: "var(--primary)", textShadow: "0 0 20px var(--primary-glow)" }, 
                { scale: 1, color: "var(--text-primary)", textShadow: "none", duration: 1.0, ease: "elastic.out(1, 0.3)" }
              );
            }
          });
        }
      });
      // SVG Highlight drawing animation
      gsap.to(".hero-svg-highlight", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.8,
        stagger: 0.1
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "110px",
        paddingBottom: "60px",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-hero)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

      {/* Orbs */}
      <div ref={orb1Ref} className="orb orb-primary" style={{ width: "700px", height: "700px", top: "-200px", right: "-150px" }} />
      <div ref={orb2Ref} className="orb orb-accent" style={{ width: "450px", height: "450px", bottom: "-100px", left: "-150px" }} />
      <div ref={orb3Ref} className="orb orb-primary" style={{ width: "300px", height: "300px", top: "40%", left: "40%" }} />

      {/* Spinning ring */}
      <div className="animate-spin-slow" style={{
        position: "absolute", width: "560px", height: "560px",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        border: "1px dashed var(--border-active)", borderRadius: "50%", opacity: 0.2,
        pointerEvents: "none", zIndex: 0,
      }} />
      <div className="animate-spin-slow" style={{
        position: "absolute", width: "760px", height: "760px",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        border: "1px dashed var(--border)", borderRadius: "50%", opacity: 0.12,
        pointerEvents: "none", zIndex: 0,
        animationDuration: "40s",
        animationDirection: "reverse",
      }} />

      {/* Floating leaf particles */}
      <LeafParticle className="leaf-particle" style={{ top: "15%", left: "8%", transform: "rotate(-20deg)" }} />
      <LeafParticle className="leaf-particle" style={{ top: "60%", left: "3%", transform: "rotate(30deg)", opacity: 0.12 }} />
      <LeafParticle className="leaf-particle" style={{ top: "25%", right: "8%", transform: "rotate(15deg) scaleX(-1)" }} />
      <LeafParticle className="leaf-particle" style={{ bottom: "20%", right: "5%", transform: "rotate(-45deg)", opacity: 0.15 }} />
      <LeafParticle className="leaf-particle" style={{ top: "70%", left: "15%", transform: "rotate(60deg) scale(0.7)", opacity: 0.1 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "70px",
          alignItems: "center",
        }} className="hero-grid">

          {/* ── Left content ── */}
          <div>
            <div className="hero-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "var(--primary-glow)", border: "1px solid var(--border-active)",
              borderRadius: "100px", padding: "8px 18px", marginBottom: "30px",
            }}>
              <Leaf size={13} style={{ color: "var(--primary)" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Certified Wellness & Lifestyle Coach
              </span>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", animation: "pulse-glow 2s ease infinite" }} />
            </div>

            {/* Split-line animated headline */}
            <h1 className="font-display" style={{
              fontSize: "clamp(44px, 5.5vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.06,
              marginBottom: "24px",
              letterSpacing: "-0.025em",
              overflow: "hidden",
            }}>
              <div className="hero-line-1" style={{ overflow: "hidden" }}>
                <span>Unlock Your</span>
              </div>
              <div className="hero-line-2" style={{ overflow: "hidden" }}>
                <span className="shimmer-text" style={{ minWidth: "260px", display: "inline-block" }}>
                  {displayWord}
                  <span className="cursor" />
                </span>
              </div>
              <div className="hero-line-3" style={{ overflow: "hidden" }}>
                <span>From Within</span>
              </div>
            </h1>

            <p className="hero-body" style={{
              fontSize: "17px",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: "32px",
              maxWidth: "480px",
            }}>
              Hi, I&apos;m <strong style={{ color: "var(--primary)", fontWeight: 700, position: "relative", display: "inline-block" }}>
                Asuhar B
                <svg width="100%" height="16" viewBox="0 0 100 16" preserveAspectRatio="none" style={{ position: "absolute", bottom: "-6px", left: 0, zIndex: -1 }}>
                  <path className="hero-svg-highlight" d="M 5 8 Q 50 16 95 8" fill="none" stroke="var(--primary-glow)" strokeWidth="6" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" />
                  <path className="hero-svg-highlight" d="M 5 8 Q 50 16 95 8" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" />
                </svg>
              </strong> — your dedicated wellness partner. Together, we build sustainable habits, restore vitality, and create a life you genuinely love.
            </p>

            <div className="hero-features" style={{
              display: "flex", flexDirection: "column", gap: "11px", marginBottom: "44px",
            }}>
              {[
                "Personalized 1-on-1 coaching programs",
                "Holistic mind, body & nutrition guidance",
                "Proven methods with lasting results",
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: "var(--primary-glow)", border: "1px solid var(--border-active)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <CheckCircle size={13} style={{ color: "var(--primary)" }} />
                  </div>
                  <span style={{ fontSize: "15px", color: "var(--text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="hero-ctas" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <MagneticButton>
                <a href="#contact" className="btn-primary" style={{ fontSize: "16px", padding: "16px 34px" }}>
                  Start Your Journey <ArrowRight size={16} />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#services" className="btn-outline" style={{ fontSize: "16px", padding: "16px 30px" }}>
                  <Play size={14} /> Explore Programs
                </a>
              </MagneticButton>
            </div>

            {/* Trust badges */}
            <div style={{
              display: "flex", alignItems: "center", gap: "16px", marginTop: "36px",
              paddingTop: "28px", borderTop: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {["#3D6B4F", "#6BA880", "#C8914A", "#5B6FA8", "#A85B6F"].map((c, i) => (
                  <div key={i} style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `${c}30`, border: `2px solid ${c}`,
                    marginLeft: i === 0 ? "0" : "-10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, color: c,
                  }}>
                    {["P","J","A","D","L"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="var(--accent)" style={{ color: "var(--accent)" }} />
                  ))}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Trusted by <strong style={{ color: "var(--text-primary)" }}>500+</strong> clients worldwide
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div style={{ position: "relative" }}>
            <div className="hero-img-wrap" style={{
              position: "relative",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              aspectRatio: "4/5",
              maxHeight: "600px",
              boxShadow: "var(--shadow-deep), 0 0 80px rgba(61,107,79,0.15)",
            }}>
              <Image
                src="/asuhar-hero.png"
                alt="Asuhar B — Wellness & Lifestyle Coach"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(14,26,18,0.65) 0%, transparent 55%)",
              }} />
              {/* Name badge */}
              <div style={{
                position: "absolute", bottom: "24px", left: "24px",
                background: "var(--glass-strong-bg)", backdropFilter: "blur(20px)",
                border: "1px solid var(--border)", borderRadius: "18px",
                padding: "14px 22px",
              }}>
                <div style={{ fontSize: "19px", fontWeight: 700, fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--text-primary)", marginBottom: "3px" }}>
                  Asuhar B
                </div>
                <div style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.1em" }}>
                  WELLNESS & LIFESTYLE BUILDER
                </div>
              </div>

              {/* Corner accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "4px",
                background: "var(--gradient-primary)",
              }} />
            </div>

            {/* Floating stat cards */}
            <TiltCard className="hero-float-card" style={{
              position: "absolute", top: "24px", right: "-32px",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "20px", padding: "16px 20px",
              boxShadow: "var(--shadow-card)", zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="var(--accent)" style={{ color: "var(--accent)" }} />
                ))}
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--text-primary)" }}>
                500+ Clients
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>Lives Transformed</div>
            </TiltCard>

            <TiltCard className="hero-float-card" style={{
              position: "absolute", bottom: "90px", right: "-40px",
              background: "var(--surface)", border: "1px solid var(--border-active)",
              borderRadius: "20px", padding: "16px 20px",
              boxShadow: "var(--shadow-glow)", zIndex: 2,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <Heart size={14} style={{ color: "var(--primary)" }} fill="var(--primary)" />
                <span style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.06em" }}>WELLNESS SCORE</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                <span style={{ fontSize: "30px", fontWeight: 700, fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--primary)" }}>95</span>
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>%</span>
              </div>
              <div style={{ height: "4px", borderRadius: "2px", background: "var(--surface-3)", marginTop: "10px", overflow: "hidden" }}>
                <div style={{ width: "95%", height: "100%", background: "var(--gradient-primary)", borderRadius: "2px" }} />
              </div>
            </TiltCard>

            {/* Floating mini badge - years */}
            <TiltCard className="hero-float-card" style={{
              position: "absolute", bottom: "0px", left: "-24px",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "20px", padding: "14px 18px",
              boxShadow: "var(--shadow-card)", zIndex: 2,
            }}>
              <div style={{ fontSize: "26px", marginBottom: "4px" }}>🏆</div>
              <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--accent)" }}>8+ Years</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Expert Coach</div>
            </TiltCard>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          gap: "1px", marginTop: "80px",
          background: "var(--border)", borderRadius: "24px",
          overflow: "hidden", border: "1px solid var(--border)",
        }}>
          {[
            { id: "counter-clients", label: "Lives Transformed", icon: "🌿", desc: "and counting" },
            { id: "counter-years", label: "Years of Expertise", icon: "⭐", desc: "in the field" },
            { id: "counter-success", label: "Success Rate", icon: "💚", desc: "of all clients" },
            { id: "counter-programs", label: "Wellness Programs", icon: "🧘", desc: "available now" },
          ].map(s => (
            <div key={s.id} className="stat-item" style={{
              background: "var(--surface)", padding: "36px 24px", textAlign: "center",
              transition: "background 0.3s ease", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--surface-2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{s.icon}</div>
              <div className="stat-number" id={s.id} style={{ marginBottom: "4px" }}>0+</div>
              <div style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-float-card { display: none !important; }
        }
      `}</style>
    </section>
  );
}
