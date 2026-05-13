"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-header", { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".contact-info-container", { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".contact-grid", start: "top 80%" } }
      );
      gsap.fromTo(".contact-form-container", { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".contact-grid", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
    gsap.fromTo(".success-msg", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
  };

  const contactInfo = [
    { icon: Phone, label: "Phone / WhatsApp", value: "+91 9876543210", sub: "+91 9876543210", href: "tel:+919876543210", color: "#22C55E" },
    { icon: Mail, label: "Email", value: "sales@tallypro.in", sub: "support@tallypro.in", href: "mailto:sales@tallypro.in", color: "#0066FF" },
    { icon: MapPin, label: "Office Address", value: "00/1500, 2nd Floor, palarivattam ", sub: "Ernakulam, Kerala - 682025", href: "#", color: "#EC4899" },
    { icon: Clock, label: "Working Hours", value: "Mon - Sat: 9:30 AM - 6:00 PM", sub: "Sunday: Closed", href: "#", color: "#F59E0B" },
  ];

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb orb-primary" style={{ width: "600px", height: "600px", bottom: "-200px", right: "-150px", opacity: 0.12 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="contact-header" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag" style={{ marginBottom: "16px" }}><MessageSquare size={14} /> Get In Touch</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 900, marginBottom: "16px" }}>
            Ready to <span className="text-gradient">Transform</span> Your Business?
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
            Get a free consultation and get in touch with us. Our experts respond within 2 hours.
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "40px", alignItems: "start" }}>
          {/* Info */}
          <div className="contact-info-container">
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              {contactInfo.map(info => {
                const Icon = info.icon;
                return (
                  <a key={info.label} href={info.href} style={{ display: "flex", gap: "14px", alignItems: "center", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px", textDecoration: "none", transition: "all 0.3s ease" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${info.color}44`; el.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateX(0)"; }}
                  >
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${info.color}15`, border: `1px solid ${info.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} style={{ color: info.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "3px" }}>{info.label}</div>
                      <div style={{ fontSize: "14px", fontWeight: 700 }}>{info.value}</div>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{info.sub}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <a href="https://wa.me/9876543210" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "#25D366", borderRadius: "12px", padding: "14px", textDecoration: "none", color: "white", fontWeight: 700, fontSize: "15px", transition: "all 0.3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="contact-form-container" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "24px", padding: "40px" }}>
            {submitted ? (
              <div className="success-msg" style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <CheckCircle size={32} style={{ color: "#22C55E" }} />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>Message Sent! 🎉</h3>
                <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "24px" }}>Our Tally expert will contact you within 2 hours to answer your questions.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline" style={{ border: "1px solid var(--border-active)" }}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>Get a Free Consultation</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "28px" }}>Fill in your details and our expert will reach out within 2 hours.</p>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Full Name *</label>
                      <input type="text" className="form-input" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Email Address *</label>
                      <input type="email" className="form-input" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Phone Number *</label>
                      <input type="tel" className="form-input" placeholder="+91 98xxx xxxxx" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Company Name</label>
                      <input type="text" className="form-input" placeholder="Your company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>I'm Interested In</label>
                    <select className="form-input" value={formData.interest} onChange={e => setFormData({ ...formData, interest: e.target.value })} style={{ cursor: "pointer" }}>
                      <option value="">Select a product/service...</option>
                      {["TallyPrime Silver", "TallyPrime Gold", "TallyPrime Server", "TallyPrime Rental", "TSS Renewal", "Tally Customization", "Support & AMC", "Training", "Data Migration"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Message</label>
                    <textarea className="form-input" placeholder="Tell us about your business needs..." rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "none" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }} disabled={loading}>
                    {loading ? (
                      <><div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message & Get in Touch</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
