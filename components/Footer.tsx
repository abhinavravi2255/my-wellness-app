"use client";

import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const footerLinks = {
  Products: [
    "TallyPrime Silver",
    "TallyPrime Gold",
    "TallyPrime Server",
    "TallyPrime Rental",
    "Mobile App",
    "TSS Renewal",
  ],
  Services: [
    "Implementation",
    "Customization",
    "Support & AMC",
    "Training",
    "Data Migration",
    "Cloud Access",
  ],
  Company: [
    "About Us",
    "Our Team",
    "Careers",
    "Partner Program",
    "Blog",
    "Contact Us",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
    "Data Protection",
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top CTA banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--primary-glow) 0%, var(--accent-glow) 100%)",
          borderBottom: "1px solid var(--border-active)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "12px",
            }}
          >
            Start Your <span className="text-gradient">TallyPrime Journey</span> Today
          </h3>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "28px" }}>
            Join 2000+ businesses already running smarter with our Tally solutions.
            Free implementation + 30-day support included.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">
              Get in Touch Today
              <ArrowRight size={16} />
            </a>
            <a href="tel:+919876543210" className="btn-outline">
              <Phone size={18} />
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <Logo size={44} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>TallyPro</div>
                <div style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Solutions</div>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "24px" }}>
              Premier Tally Certified 5-Star Partner since 2008. Empowering 2000+ businesses
              across India with cutting-edge TallyPrime solutions.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              <a 
                href="tel:+919876543210"
                style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <Phone size={16} />
                </div>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>+91 98765 43210</span>
              </a>
              <a
                href="mailto:sales@tallypro.in"
                style={{ display: "flex", gap: "8px", alignItems: "center", textDecoration: "none" }}
              >
                <Mail size={14} style={{ color: "var(--primary-light)" }} />
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>sales@tallypro.in</span>
              </a>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <MapPin size={14} style={{ color: "var(--primary-light)", marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  123 Tech Park, Innovation Hub, Bangalore, Karnataka 560001
                </span>
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { label: "LinkedIn", href: "#", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: "Facebook", href: "#", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                { label: "Instagram", href: "#", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { label: "Twitter", href: "#", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "var(--text-muted)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-primary)";
                    el.style.borderColor = "var(--primary)";
                    el.style.background = "var(--primary-glow)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text-muted)";
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--surface-2)";
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>

          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: "28px" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © 2025 TallyPro Solutions. All rights reserved. | Tally Certified 5-Star Partner
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
