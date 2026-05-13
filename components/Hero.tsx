"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, Shield, Zap, CheckCircle, Play } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs
      gsap.to(orb1Ref.current, {
        y: -40, x: 20, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 30, x: -25, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2,
      });

      // Hero badge
      gsap.fromTo(".hero-badge", { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
      );

      // Hero content items
      gsap.fromTo(".hero-text-item", { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.5 }
      );

      // Hero card
      gsap.fromTo(".hero-card", { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.7 }
      );

      // Floating trust badges
      gsap.fromTo(".trust-badge", { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.5)", delay: 1.1 }
      );

      // Stats row
      gsap.fromTo(".stat-item", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 1.2 }
      );

      // Animate hero card float
      gsap.to(".hero-card", {
        y: -12, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });

      // Counter animation
      const counters = [
        { target: 2000, suffix: "+", id: "counter-customers" },
        { target: 15, suffix: "+", id: "counter-years" },
        { target: 100, suffix: "%", id: "counter-uptime" },
        { target: 50, suffix: "+", id: "counter-industries" },
      ];
      counters.forEach(({ target, suffix, id }) => {
        const el = document.getElementById(id);
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2.5, ease: "power2.out", delay: 1.4,
            onUpdate: () => { el.textContent = Math.ceil(obj.val) + suffix; },
          });
        }
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
        paddingTop: "120px",
        paddingBottom: "80px",
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" style={{
        position: "absolute", inset: 0,
      }} />

      {/* Orbs */}
      <div ref={orb1Ref} className="orb orb-primary" style={{ width: "600px", height: "600px", top: "-200px", right: "-100px" }} />
      <div ref={orb2Ref} className="orb orb-accent" style={{ width: "400px", height: "400px", bottom: "0", left: "-150px" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="hero-grid">

          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="hero-badge" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "var(--primary-glow)", border: "1px solid var(--border-active)",
              borderRadius: "100px", padding: "8px 16px", marginBottom: "28px",
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.05em" }}>
                Tally Certified 5-Star Partner Since 2008
              </span>
            </div>

            <h1 className="hero-text-item" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "24px" }}>
              Empower Your Business with{" "}
              <span className="text-gradient">TallyPrime</span> Solutions
            </h1>

            <p className="hero-text-item" style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "520px" }}>
              India's premier TallyPrime partner delivering cutting-edge accounting, inventory & statutory automation. Expert customization and dedicated support for 2000+ businesses.
            </p>

            <div className="hero-text-item" style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
              {["Free implementation & data migration", "24/7 dedicated support & AMC", "Industry-specific customizations"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle size={16} style={{ color: "#00D4FF", flexShrink: 0 }} />
                  <span style={{ fontSize: "15px", color: "var(--text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>

            <div className="hero-text-item" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <MagneticButton><a href="#contact" className="btn-primary">Get in Touch <ArrowRight size={16} /></a></MagneticButton>
              <MagneticButton><a href="#products" className="btn-outline"><Play size={14} /> View Products</a></MagneticButton>
            </div>
          </div>

          {/* Right: Dashboard Card */}
          <div style={{ position: "relative" }}>
            <TiltCard className="hero-card" style={{
              padding: "32px", background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "24px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, var(--primary-glow) 0%, transparent 60%)", pointerEvents: "none" }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>Business Dashboard</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>TallyPrime Analytics</div>
                </div>
                <div style={{ background: "var(--accent-glow)", border: "1px solid var(--border-active)", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
                  Live
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                {[
                  { label: "Revenue", value: "₹24.6L", color: "var(--primary)", trend: "+18%" },
                  { label: "Expenses", value: "₹8.2L", color: "var(--primary-light)", trend: "-5%" },
                  { label: "Profit", value: "₹16.4L", color: "#22C55E", trend: "+28%" },
                ].map(s => (
                  <div key={s.label} style={{ background: "var(--surface-3)", borderRadius: "12px", padding: "14px", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>{s.label}</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: s.color, marginBottom: "4px" }}>{s.value}</div>
                    <div style={{ fontSize: "11px", color: s.trend.startsWith("+") ? "#22C55E" : "#EF4444", fontWeight: 600 }}>{s.trend}</div>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>Monthly Sales Trend</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
                  {[40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 92].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "var(--gradient-primary)" : "var(--primary-glow)", borderRadius: "3px" }} />
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["GST Ready", "Multi-User", "Cloud Backup", "Mobile App"].map(t => (
                  <span key={t} style={{ background: "var(--primary-glow)", border: "1px solid var(--border-active)", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", color: "var(--primary-light)", fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </TiltCard>

            {/* Trust badges */}
            <div className="trust-badge" style={{
              position: "absolute", top: "-20px", right: "-20px",
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center",
              gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--accent)", backdropFilter: "blur(10px)",
            }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--accent)" style={{ color: "var(--accent)" }} />)}
              <span style={{ color: "var(--text-primary)" }}>5-Star</span>
            </div>

            <div className="trust-badge" style={{
              position: "absolute", bottom: "-20px", left: "-20px",
              background: "var(--surface-2)", border: "1px solid var(--border-active)",
              borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center",
              gap: "8px", fontSize: "13px", fontWeight: 600, color: "var(--primary-light)", backdropFilter: "blur(10px)",
            }}>
              <Shield size={14} /> Official Tally Partner
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", marginTop: "80px",
          background: "var(--border)", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border)",
        }}>
          {[
            { id: "counter-customers", label: "Happy Customers", icon: "😊" },
            { id: "counter-years", label: "Years of Excellence", icon: "🏆" },
            { id: "counter-uptime", label: "Support Uptime", icon: "⚡" },
            { id: "counter-industries", label: "Industries Served", icon: "🏭" },
          ].map(s => (
            <div key={s.id} className="stat-item" style={{ background: "var(--surface-2)", padding: "32px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
              <div className="stat-number" id={s.id} style={{ marginBottom: "6px" }}>0+</div>
              <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
