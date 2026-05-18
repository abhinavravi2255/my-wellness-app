"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight, Star, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const plans = [
  {
    name: "Foundations",
    price: "₹7,999",
    period: "/month",
    desc: "The perfect starting point for building lasting wellness habits.",
    color: "#3D6B4F",
    popular: false,
    features: [
      "2 × 45-min coaching sessions/month",
      "Personalised wellness assessment",
      "Custom nutrition guidelines",
      "Weekly progress check-ins",
      "Resource library access",
      "Email support",
    ],
  },
  {
    name: "Transformation",
    price: "₹14,999",
    period: "/month",
    desc: "Our most popular program for deep, lasting change.",
    color: "#C8914A",
    popular: true,
    features: [
      "4 × 60-min coaching sessions/month",
      "Full wellness & lifestyle audit",
      "Personalised meal & movement plan",
      "Daily habit tracking support",
      "Mindset & stress toolkit",
      "24/7 WhatsApp support",
      "Monthly wellness report",
    ],
  },
  {
    name: "Elite Immersion",
    price: "₹29,999",
    period: "/month",
    desc: "Intensive VIP support for the most committed clients.",
    color: "#5B6FA8",
    popular: false,
    features: [
      "8 × 60-min sessions/month",
      "Full biometric & functional analysis",
      "Fully bespoke wellness protocol",
      "Weekly live group Q&A sessions",
      "Access to all online courses",
      "Priority 24/7 concierge support",
      "Quarterly deep-dive review",
      "Unlimited email & chat support",
    ],
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".products-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".products-header", start: "top 80%" } }
      );
      gsap.fromTo(".plan-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".plans-grid", start: "top 75%" }
        }
      );
      
      // Staggered features inside cards
      gsap.fromTo(".plan-feature",
        { x: -15, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: ".plans-grid", start: "top 65%" }
        }
      );

      // Orb pulse animation
      gsap.to(".orb-pricing", {
        scale: 1.1, opacity: 0.5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div className="orb orb-primary orb-pricing" style={{ width: "500px", height: "500px", bottom: "-150px", right: "-100px", opacity: 0.3 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="products-header" style={{ textAlign: "center", marginBottom: "72px" }}>
          <div className="section-tag" style={{ marginBottom: "20px" }}>
            <Zap size={12} /> Coaching Plans
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Invest in Your<br /><span className="text-gradient">Wellbeing</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto" }}>
            Transparent pricing with no hidden fees. Choose the level of support that matches your goals and commitment.
          </p>
        </div>

        {/* Plans */}
        <div className="plans-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className="plan-card"
              style={{
                background: "var(--surface)",
                border: plan.popular ? `2px solid ${plan.color}60` : "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
                boxShadow: plan.popular ? `0 0 40px ${plan.color}20` : "none",
                perspective: "1000px",
              }}
              onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;
                
                gsap.to(e.currentTarget, {
                  rotateX, rotateY,
                  scale: plan.popular ? 1.05 : 1.02,
                  y: -6,
                  boxShadow: `0 20px 60px ${plan.color}20`,
                  duration: 0.4, ease: "power2.out",
                });
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, {
                  rotateX: 0, rotateY: 0,
                  scale: plan.popular ? 1.03 : 1,
                  y: 0,
                  boxShadow: plan.popular ? `0 0 40px ${plan.color}20` : "none",
                  duration: 0.7, ease: "elastic.out(1, 0.5)",
                });
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: `${plan.color}`,
                  color: "white", borderRadius: "100px",
                  padding: "4px 12px", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: "4px",
                }}>
                  <Star size={10} fill="white" /> Most Popular
                </div>
              )}

              {/* Color accent */}
              <div style={{
                width: "48px", height: "4px", borderRadius: "2px",
                background: plan.color, marginBottom: "24px",
              }} />

              <div style={{ marginBottom: "8px" }}>
                <span style={{
                  fontSize: "12px", fontWeight: 700, color: plan.color,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {plan.name}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
                <span style={{
                  fontSize: "48px", fontWeight: 700, color: "var(--text-primary)",
                  fontFamily: "var(--font-cormorant), Georgia, serif", lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{plan.period}</span>
              </div>

              <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "28px" }}>
                {plan.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                {plan.features.map((f, fi) => (
                  <div key={fi} className="plan-feature" style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: `${plan.color}18`, border: `1px solid ${plan.color}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>
                      <Check size={11} style={{ color: plan.color }} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "14px 24px", borderRadius: "100px",
                background: plan.popular ? plan.color : "transparent",
                color: plan.popular ? "white" : plan.color,
                border: `1.5px solid ${plan.color}60`,
                fontWeight: 600, fontSize: "15px",
                textDecoration: "none", transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = plan.color;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = plan.popular ? plan.color : "transparent";
                  e.currentTarget.style.color = plan.popular ? "white" : plan.color;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get Started <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div style={{
          textAlign: "center", marginTop: "52px",
          padding: "24px", background: "var(--surface-2)",
          borderRadius: "var(--radius)", border: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            💚 <strong style={{ color: "var(--text-primary)" }}>30-Day Wellness Guarantee</strong> — If you don't feel measurable progress in your first 30 days, we'll refund you in full. No questions asked.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .plans-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          .plan-card { transform: none !important; }
        }
        @media (max-width: 768px) {
          .plans-grid { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
