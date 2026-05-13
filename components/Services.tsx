"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Settings, Headphones, BookOpen, Database, Cpu, Globe, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Settings, title: "Implementation & Setup", description: "End-to-end Tally implementation including installation, configuration, chart of accounts setup, opening balances, and complete business workflow design.", tags: ["Installation", "Configuration", "Go-Live Support"], color: "#0066FF" },
  { icon: Cpu, title: "Custom Tally Modules", description: "Develop industry-specific TDL modules, custom vouchers, reports, and integrations using Tally Definition Language to perfectly fit your business workflow.", tags: ["TDL Development", "Custom Reports", "Integrations"], color: "#00D4FF" },
  { icon: Headphones, title: "Support & AMC", description: "Comprehensive Annual Maintenance Contracts with remote and onsite support, regular updates, priority issue resolution, and dedicated account managers.", tags: ["24/7 Remote", "Onsite Visits", "Priority SLA"], color: "#7C3AED" },
  { icon: BookOpen, title: "Tally Training", description: "Professional training programs for beginners and advanced users. Corporate batch training, one-on-one sessions, and Tally certification preparation.", tags: ["Corporate Batches", "Certification Prep", "Online Classes"], color: "#F59E0B" },
  { icon: Database, title: "Data Migration & Sync", description: "Seamlessly migrate from Tally ERP 9, Excel, or any legacy system to TallyPrime. Multi-branch data synchronization and consolidation solutions.", tags: ["ERP Migration", "Multi-branch Sync", "Data Cleanup"], color: "#22C55E" },
  { icon: Globe, title: "Cloud & Remote Access", description: "Set up Tally on cloud for anytime-anywhere access. Secure server hosting, remote desktop configurations, and VPN-based multi-location access.", tags: ["Cloud Hosting", "VPN Setup", "Remote Access"], color: "#EC4899" },
];

const workflow = [
  { step: "01", title: "Consultation", desc: "Free business analysis and requirement gathering" },
  { step: "02", title: "Proposal", desc: "Customized solution with transparent pricing" },
  { step: "03", title: "Implementation", desc: "Expert deployment with zero business disruption" },
  { step: "04", title: "Training", desc: "Comprehensive staff training and handholding" },
  { step: "05", title: "Go-Live", desc: "Smooth transition to live operations" },
  { step: "06", title: "Support", desc: "Ongoing support, updates, and optimization" },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-header", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".service-card", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".services-grid", start: "top 80%" } }
      );
      gsap.fromTo(".workflow-step", { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".workflow-grid", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{
      padding: "100px 0", position: "relative",
      background: "linear-gradient(180deg,var(--background) 0%,var(--surface) 50%,var(--background) 100%)",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div className="services-header" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ marginBottom: "16px" }}><Settings size={14} /> Our Services</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: "16px" }}>
            Complete <span className="text-gradient">Tally Ecosystem</span> Support
          </h2>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            From initial setup to advanced customizations, we provide end-to-end Tally services for peak efficiency.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "24px", marginBottom: "80px" }}>
          {services.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="service-card" style={{
                background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "20px",
                padding: "32px", position: "relative", overflow: "hidden", transition: "all 0.3s ease", cursor: "pointer",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${s.color}44`; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3),0 0 30px ${s.color}18`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${s.color},transparent)`, opacity: 0.6 }} />
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Icon size={22} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>{s.description}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: "6px", padding: "3px 9px", fontSize: "12px", color: s.color, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: s.color, textDecoration: "none" }}>
                  Learn more <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Workflow */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h3 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, marginBottom: "12px" }}>
              Our Proven <span className="text-gradient">6-Step Process</span>
            </h3>
            <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>A streamlined methodology for successful Tally implementation</p>
          </div>
          <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "24px" }}>
            {workflow.map((w, i) => (
              <div key={w.step} className="workflow-step" style={{ textAlign: "center" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--primary-glow)", border: "1px solid var(--border-active)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 700, color: "var(--primary-light)", margin: "0 auto 14px" }}>
                  {w.step}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px" }}>{w.title}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
