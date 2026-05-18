"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Heart, Mail, Phone, MapPin, Globe } from "lucide-react";
import WeatherWidget from "./WeatherWidget";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const footerLinks = {
  Programs: [
    { label: "Holistic Wellness", href: "#services" },
    { label: "Mindset Coaching", href: "#services" },
    { label: "Nutrition Guidance", href: "#services" },
    { label: "Sleep & Recovery", href: "#services" },
    { label: "Group Circles", href: "#services" },
  ],
  Resources: [
    { label: "Wellness Blog", href: "#blog" },
    { label: "Free Assessment", href: "#contact" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Online Courses", href: "#programs" },
    { label: "Podcast", href: "#" },
  ],
  Company: [
    { label: "About Asuhar", href: "#about" },
    { label: "Coaching Plans", href: "#programs" },
    { label: "Book a Call", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: <InstagramIcon />, href: "https://instagram.com/asuharb", label: "Instagram" },
  { icon: <FacebookIcon />, href: "https://facebook.com/asuharb", label: "Facebook" },
  { icon: <LinkedinIcon />, href: "https://linkedin.com/in/asuharb", label: "LinkedIn" },
  { icon: <YoutubeIcon />, href: "#", label: "YouTube" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-newsletter",
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".footer-newsletter", start: "top 90%" } }
      );
      gsap.fromTo(".footer-col",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".footer-newsletter", start: "top 60%" } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{
      background: "var(--surface-2)", borderTop: "1px solid var(--border)",
      paddingTop: "80px",
    }}>
      {/* Newsletter */}
      <div className="container">
        <div className="footer-newsletter" style={{
          background: "var(--gradient-primary)", borderRadius: "var(--radius-xl)",
          padding: "56px 48px", marginBottom: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "40px", flexWrap: "wrap", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
            <h3 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "white", marginBottom: "10px" }}>
              Get Free Weekly Wellness Tips
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              Join 2,000+ subscribers receiving Asuhar's best insights on health, mindset, and lifestyle every week.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="email" placeholder="Your email address"
              style={{
                background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "100px", padding: "13px 22px", fontSize: "15px", color: "white",
                outline: "none", minWidth: "240px",
              }}
            />
            <button style={{
              background: "white", color: "var(--primary-dark)",
              borderRadius: "100px", padding: "13px 28px",
              fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer",
              transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: "8px",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Mail size={15} /> Subscribe Free
            </button>
          </div>
        </div>

        {/* Footer grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "60px" }}>
          {/* Brand */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "var(--gradient-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Globe size={20} style={{ color: "white" }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Mission 444
                </div>
                <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Wellness World
                </div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "280px" }}>
              Helping you build a life of vitality, purpose, and joy — one intentional step at a time.
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {[
                { icon: <Mail size={14} />, text: "info@mission444.com" },
                { icon: <Phone size={14} />, text: "+91 9876543210" },
                { icon: <MapPin size={14} />, text: "Mission 444 Wellness World, Vattiyoorkavu" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                  <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label} style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "var(--surface-3)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-muted)", transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.borderColor = "var(--border-active)"; e.currentTarget.style.background = "var(--primary-glow)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface-3)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="footer-col">
              <h4 style={{
                fontSize: "13px", fontWeight: 700, color: "var(--text-primary)",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px",
              }}>
                {heading}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map(link => (
                  <a key={link.label} href={link.href} className="underline-reveal" style={{
                    fontSize: "14px", color: "var(--text-muted)", textDecoration: "none",
                    transition: "color 0.2s ease",
                    width: "fit-content",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Weather Widget Column */}
          <div className="footer-col" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h4 style={{
              fontSize: "13px", fontWeight: 700, color: "var(--text-primary)",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Local Conditions
            </h4>
            <WeatherWidget />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "24px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © 2026 Mission 444 Wellness World. All rights reserved.
          </span>

          <span style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
            Made with <Heart size={13} fill="var(--primary)" style={{ color: "var(--primary)" }} /> for a healthier world
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer .container > div:nth-child(2) { grid-template-columns: 2fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          footer .container > div:nth-child(2) { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
          footer .container > div:first-child { padding: 36px 24px !important; }
          footer .container > div:first-child > div:last-child { flex-direction: column; width: 100%; }
          footer .container > div:first-child > div:last-child input { min-width: unset; width: 100%; }
          footer .container > div:first-child > div:last-child button { width: 100%; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
