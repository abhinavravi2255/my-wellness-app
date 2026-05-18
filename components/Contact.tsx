"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, Calendar, MessageCircle, CheckCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", goal: "", message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-header", start: "top 80%" } }
      );
      gsap.fromTo(".contact-form-col",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" } }
      );
      gsap.fromTo(".contact-info-col",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" } }
      );
      gsap.fromTo(".contact-input-stagger",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".contact-form-col", start: "top 80%" } }
      );
      gsap.fromTo(".contact-info-card",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)",
          scrollTrigger: { trigger: ".contact-info-col", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 500);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, label: "Email", value: "info@mission444.com", href: "mailto:info@mission444.com" },
    { icon: <Phone size={20} />, label: "Phone", value: "+91 9876543210", href: "tel:+919876543210" },
    { icon: <MapPin size={20} />, label: "Location", value: "Online & In-Person Sessions", href: "#" },
    { icon: <Calendar size={20} />, label: "Book a Call", value: "Free 30-min Discovery Session", href: "#" },
  ];

  const goals = [
    "Weight Management", "Stress Reduction", "Better Sleep",
    "Nutrition Guidance", "Energy & Vitality", "Mindset Coaching",
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-pad" style={{ position: "relative", overflow: "hidden" }}>
      <div className="orb orb-primary" style={{ width: "450px", height: "450px", top: "-100px", right: "-100px", opacity: 0.4 }} />
      <div className="orb orb-accent" style={{ width: "350px", height: "350px", bottom: "-80px", left: "-100px", opacity: 0.35 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="contact-header" style={{ textAlign: "center", marginBottom: "72px" }}>
          <div className="section-tag" style={{ marginBottom: "20px" }}>
            <MessageCircle size={12} /> Get In Touch
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(34px, 4.5vw, 58px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Start Your Wellness<br /><span className="text-gradient">Journey Today</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto" }}>
            Ready to transform your life? Reach out and let's create a personalised wellness plan just for you.
          </p>
        </div>

        {/* Grid */}
        <div className="contact-grid" style={{
          display: "grid", gridTemplateColumns: "3fr 2fr", gap: "48px",
        }}>
          {/* Form */}
          <div className="contact-form-col">
            {submitted ? (
              <div style={{
                background: "var(--surface)", border: "1px solid var(--border-active)",
                borderRadius: "var(--radius-lg)", padding: "60px 40px", textAlign: "center",
              }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "var(--primary-glow)", border: "1px solid var(--border-active)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px", color: "var(--primary)",
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-display" style={{ fontSize: "28px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
                  Message Received!
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                  Thank you for reaching out! Asuhar will personally respond within 24 hours with next steps for your wellness journey.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)", padding: "40px",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                  <div className="contact-input-stagger">
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text" className="form-input" placeholder="Your full name" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="contact-input-stagger">
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email" className="form-input" placeholder="your@email.com" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="contact-input-stagger" style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel" className="form-input" placeholder="+1 (000) 000-0000"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>

                <div className="contact-input-stagger" style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "12px" }}>
                    Primary Wellness Goal *
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {goals.map(g => (
                      <button
                        key={g} type="button"
                        onClick={() => setForm(f => ({ ...f, goal: g }))}
                        style={{
                          padding: "8px 16px", borderRadius: "100px",
                          border: `1.5px solid ${form.goal === g ? "var(--primary)" : "var(--border)"}`,
                          background: form.goal === g ? "var(--primary-glow)" : "transparent",
                          color: form.goal === g ? "var(--primary)" : "var(--text-muted)",
                          fontSize: "13px", fontWeight: 600, cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-input-stagger" style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Tell me about yourself
                  </label>
                  <textarea
                    className="form-input" rows={4}
                    placeholder="Share your current situation, goals, or any questions you have..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn-primary contact-input-stagger" style={{ width: "100%", justifyContent: "center", fontSize: "16px", padding: "16px" }}>
                  <Send size={16} /> Send Message & Book Free Call
                </button>

                <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "16px" }}>
                  🔒 Your information is private and secure. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* Info column */}
          <div className="contact-info-col" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {contactInfo.map((info, i) => (
              <a key={i} href={info.href} className="contact-info-card" style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "20px 24px",
                transition: "all 0.3s ease", textDecoration: "none",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--border-active)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: "var(--primary-glow)", border: "1px solid var(--border-active)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--primary)", flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                    {info.label}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)" }}>
                    {info.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Asuhar photo card */}
            <div className="contact-info-card" style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "28px",
              marginTop: "8px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  overflow: "hidden", border: "2px solid var(--border-active)",
                  flexShrink: 0, position: "relative",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/asuhar-portrait.png" alt="Asuhar B" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "18px" }}>Asuhar B</div>
                  <div style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>International Lifestyle Trainer</div>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65, fontStyle: "italic" }}>
                "I personally respond to every message. I look forward to hearing your story and beginning this journey together."
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
