"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Star, Server, Smartphone, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import TiltCard from "./TiltCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "silver", badge: "Silver", badgeClass: "badge-silver", icon: Package,
    title: "TallyPrime Silver", subtitle: "Single User Edition",
    description: "Perfect for small businesses. Activated and used on a single computer with full accounting, GST compliance, and inventory management.",
    price: "₹22,500", period: "one-time", highlight: false,
    features: ["Single user license","Full accounting suite","GST & TDS compliance","Inventory management","Banking & reconciliation","Standard reports","Free data migration","1 year TSS included"],
    color: "#C0C0C0",
  },
  {
    id: "gold", badge: "Gold", badgeClass: "badge-gold", icon: Star,
    title: "TallyPrime Gold", subtitle: "Multi-User Edition",
    description: "Designed for growing businesses. One activation but unlimited access from multiple computers on the same network.",
    price: "₹67,500", period: "one-time", highlight: true,
    features: ["Unlimited network users","All Silver features","Multi-user data entry","Advanced security","Customizable reports","GST e-filing support","Priority support","Free implementation"],
    color: "#FFC107",
  },
  {
    id: "server", badge: "Server", badgeClass: "badge-server", icon: Server,
    title: "TallyPrime Server", subtitle: "Enterprise Edition",
    description: "For medium & large enterprises. A dedicated data server ensuring maximum performance with multiple concurrent users.",
    price: "₹2,70,000", period: "one-time", highlight: false,
    features: ["Dedicated server engine","High-concurrency support","Advanced data security","Real-time synchronization","Remote access support","Enterprise-grade backup","Dedicated account manager","SLA-based support"],
    color: "#34D399",
  },
  {
    id: "rental", badge: "Rental", badgeClass: "badge-popular", icon: RefreshCw,
    title: "TallyPrime Rental", subtitle: "Subscription Edition",
    description: "Start using TallyPrime immediately with zero upfront cost. Monthly rental with all features included.",
    price: "₹750", period: "per month", highlight: false,
    features: ["Zero upfront cost","All Gold features","Monthly flexibility","Instant activation","Automatic updates","TSS included","Cloud-ready","Cancel anytime"],
    color: "#059669",
  },
  {
    id: "mobile", badge: "Mobile", badgeClass: "badge-silver", icon: Smartphone,
    title: "Tally Mobile App", subtitle: "On-the-Go Access",
    description: "Access your Tally data from anywhere using our official mobile application. Real-time reports on your phone.",
    price: "Bundled", period: "with license", highlight: false,
    features: ["iOS & Android app","Real-time dashboard","Sales & purchase entry","Ledger statements","Outstanding reports","Stock reports","Offline capable","Push notifications"],
    color: "#0D9488",
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".products-header", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".product-card", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".products-grid", start: "top 80%" } }
      );
      gsap.fromTo(".tss-banner", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".tss-banner", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-primary" style={{ width: "500px", height: "500px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.2, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="products-header" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ marginBottom: "16px" }}><Package size={14} /> Our Products</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, marginBottom: "16px" }}>
            Choose the Right <span className="text-gradient">TallyPrime</span> Edition
          </h2>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            Official Tally licenses at competitive prices with free implementation, data migration, and dedicated support included.
          </p>
        </div>

        {/* Grid */}
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "24px" }}>
          {products.map(p => {
            const Icon = p.icon;
            return (
              <TiltCard key={p.id} className="product-card" style={{
                background: p.highlight ? "linear-gradient(135deg, var(--primary-glow) 0%, transparent 100%)" : "var(--surface-2)",
                border: p.highlight ? "1px solid var(--border-active)" : "1px solid var(--border)",
                borderRadius: "20px", padding: "28px", position: "relative", overflow: "hidden",
                cursor: "pointer",
              }}>
                {p.highlight && (
                  <div style={{ position: "absolute", top: "16px", right: "16px", background: "var(--gradient-primary)", borderRadius: "6px", padding: "4px 10px", fontSize: "11px", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${p.color}18`, border: `1px solid ${p.color}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Icon size={22} style={{ color: p.color }} />
                </div>
                <div className={`product-badge ${p.badgeClass}`} style={{ marginBottom: "10px" }}>{p.badge}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>{p.title}</h3>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px", fontWeight: 500 }}>{p.subtitle}</div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>{p.description}</p>
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: p.color }}>{p.price}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", marginLeft: "6px" }}>{p.period}</span>
                </div>
                <div className="divider" style={{ marginBottom: "20px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle size={14} style={{ color: p.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "11px", borderRadius: "10px",
                  background: p.highlight ? "var(--gradient-primary)" : "transparent",
                  border: p.highlight ? "none" : `1px solid ${p.color}44`,
                  color: p.highlight ? "white" : p.color,
                  fontWeight: 600, fontSize: "14px", textDecoration: "none", transition: "all 0.2s ease",
                }}>
                  Get Quote <ArrowRight size={14} />
                </a>
              </TiltCard>
            );
          })}
        </div>

        {/* TSS Banner */}
        <div className="tss-banner" style={{
          marginTop: "40px", background: "var(--primary-glow)", border: "1px solid var(--border-active)",
          borderRadius: "16px", padding: "24px 32px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "24px", flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px" }}>
              🔄 Tally Software Services (TSS) — Annual Renewal
            </div>
            <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Keep your Tally updated with the latest features, GST updates, and priority support.
            </div>
          </div>
          <a href="#contact" className="btn-primary" style={{ whiteSpace: "nowrap" }}>Renew TSS Now</a>
        </div>
      </div>
    </section>
  );
}
