"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Calendar, MapPin, Target, Zap, Shield, TrendingUp } from "lucide-react";
import Logo from "./Logo";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { icon: Award, label: "5-Star Certified Partner", desc: "Highest Tally certification level", color: "#FFC107" },
  { icon: Users, label: "2000+ Happy Clients", desc: "Across India & beyond", color: "#0066FF" },
  { icon: Calendar, label: "15+ Years Experience", desc: "Established in 2008", color: "#00D4FF" },
  { icon: MapPin, label: "Pan-India Service", desc: "Remote & onsite support", color: "#22C55E" },
];

const teamValues = [
  { icon: Target, title: "Precision", desc: "Every implementation tailored to exact business requirements." },
  { icon: Zap, title: "Speed", desc: "Rapid deployment ensuring go-live with minimal downtime." },
  { icon: Shield, title: "Reliability", desc: "Proven track record with 100% uptime SLA and 24/7 support." },
  { icon: TrendingUp, title: "Growth", desc: "Scalable solutions that expand as your business does." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-visual", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".about-content-item", { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".about-content", start: "top 80%" } }
      );
      gsap.fromTo(".about-visual-card", { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".about-visual", start: "top 80%" } }
      );
      gsap.fromTo(".value-card", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".values-grid", start: "top 85%" } }
      );
      gsap.fromTo(".achievement-item", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".achievements-row", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-blue" style={{ width: "400px", height: "400px", top: "20%", right: "-100px", opacity: 0.15 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "80px" }} className="about-grid">

          {/* Visual */}
          <div className="about-visual" style={{ position: "relative" }}>
            <div className="about-visual-card" style={{
              background: "var(--gradient-surface)", border: "1px solid var(--border)",
              borderRadius: "24px", padding: "40px", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ marginBottom: "24px", display: "inline-block" }}><Logo size={80} /></div>
                <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>TallyPro Solutions</div>
                <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "24px" }}>Certified 5-Star Tally Partner</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  {[{ num: "2000+", label: "Clients" }, { num: "15+", label: "Years" }, { num: "10+", label: "Industries" }, { num: "100%", label: "Uptime" }].map(m => (
                    <div key={m.label} style={{ background: "var(--primary-glow)", border: "1px solid var(--border-active)", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--primary-light)" }}>{m.num}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,193,7,0.1)", border: "1px solid rgba(255,193,7,0.3)", borderRadius: "10px", padding: "10px 16px" }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ fontSize: "16px" }}>⭐</span>)}
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFC107", marginLeft: "4px" }}>Tally 5-Star Certified</span>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "-24px", right: "-24px", background: "var(--surface-2)", border: "1px solid rgba(0,212,255,0.4)", borderRadius: "14px", padding: "16px 20px", backdropFilter: "blur(10px)", textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#00D4FF" }}>GST</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>Ready</div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="about-content-item section-tag" style={{ marginBottom: "20px" }}><Award size={14} /> About Us</div>
            <h2 className="about-content-item" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px" }}>
              15+ Years of <span className="text-gradient">Tally Expertise</span> Serving India's Businesses
            </h2>
            <p className="about-content-item" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "16px" }}>
              TallyPro Solutions is a premier Tally Certified 5-Star Partner established in 2008. We've evolved into a trailblazer in TallyPrime software sales, service, and customization with a proven track record of 2000+ satisfied customers across India and beyond.
            </p>
            <p className="about-content-item" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "32px" }}>
              Our team of highly qualified, Tally-certified IT professionals brings diverse expertise to address every business challenge. We leverage technology, services, and talent to consistently empower clients to enhance productivity and reduce operational costs.
            </p>
            <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {teamValues.map(v => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="value-card" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px" }}>
                    <Icon size={18} style={{ color: "var(--primary-light)", marginBottom: "8px" }} />
                    <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{v.title}</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{v.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
          {achievements.map(a => {
            const Icon = a.icon;
            return (
              <div key={a.label} className="achievement-item" style={{
                background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "18px",
                padding: "28px 24px", textAlign: "center", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${a.color}44`; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${a.color}15`, border: `1px solid ${a.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon size={22} style={{ color: a.color }} />
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{a.label}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{a.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .achievements-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
