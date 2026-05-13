"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";
import ColorToggle from "./ColorToggle";
import Logo from "./Logo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "TallyPrime Silver", href: "#products" },
      { label: "TallyPrime Gold", href: "#products" },
      { label: "TallyPrime Server", href: "#products" },
      { label: "TallyPrime Rental", href: "#products" },
      { label: "Mobile App", href: "#products" },
    ],
  },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Implementation", href: "#services" },
      { label: "Customization", href: "#services" },
      { label: "Support & AMC", href: "#services" },
      { label: "Training", href: "#services" },
      { label: "Data Migration", href: "#services" },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div
        className="top-announcement-bar max-md:hidden"
        style={{
          background: "linear-gradient(90deg, var(--primary-dark) 0%, var(--primary) 50%, var(--primary-dark) 100%)",
          backgroundSize: "200% auto",
          padding: "8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          color: "white",
        }}
      >
        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          .top-announcement-bar {
            animation: gradientMove 8s linear infinite;
          }
        `}</style>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em"
        }}>
          {/* Left side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: "100px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
              <span style={{ fontSize: "14px" }}>⭐</span> 5-Star Certified Partner
            </span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.8)" }}>Serving businesses since 2008</span>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="tel:+919876543210" style={{ display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.opacity="0.8"} onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              <Phone size={12} /> +91 98765 43210
            </a>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.3)" }} />
            {/* <a href="#contact" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FFAB00", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
              🎯 Get in Touch
            </a> */}
          </div>
        </div>
      </div>
      <div
        className="navbar-container"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", transition: "transform 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
          <Logo size={44} className="logo-svg" />
          <div className="logo-text" style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1.1 }}>
              TallyPro
            </span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Solutions
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
          {navItems.map((item) => (
            <div key={item.label} style={{ position: "relative" }}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => handleDropdown(item.label)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "8px 14px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      setActiveDropdown(item.label);
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.background = "none";
                    }}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {/* Dropdown */}
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      padding: "8px",
                      minWidth: "200px",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                      display: activeDropdown === item.label ? "block" : "none",
                      zIndex: 100,
                    }}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: "9px 14px",
                          color: "var(--text-secondary)",
                          textDecoration: "none",
                          fontSize: "14px",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                          (e.currentTarget as HTMLElement).style.background = "var(--primary-glow)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                          (e.currentTarget as HTMLElement).style.background = "none";
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "none";
                  }}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTA & Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="desktop-nav">
          <ThemeToggle />
          <ColorToggle />
          <a
            href="tel:+919876543210"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <Phone size={14} />
            +91 98765 43210
          </a>
          <MagneticButton>
            <a href="#contact" className="btn-primary" style={{ fontSize: "13px", padding: "9px 20px" }}>
              Get in Touch
            </a>
          </MagneticButton>
        </div>

        {/* Mobile controls */}
        <div className="mobile-hamburger" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle />
          <ColorToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            background: "var(--surface-2)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "1px solid var(--border)",
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
              {item.children && (
                <div style={{ paddingLeft: "16px" }}>
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      style={{
                        display: "block",
                        padding: "8px 0",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <a href="#contact" className="btn-primary" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              Get in Touch
            </a>
          </div>
        </div>
      )}
      <style>{`
        .navbar-container { padding: 0 24px; }
        .logo-svg { width: 44px; height: 44px; }
        .mobile-hamburger { gap: 12px; }
        
        @media (min-width: 901px) {
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .navbar-container { padding: 0 12px; }
          .logo-svg { width: 32px !important; height: 32px !important; }
          .logo-text span:first-child { font-size: 16px !important; letter-spacing: -0.02em !important; }
          .logo-text span:last-child { font-size: 9px !important; letter-spacing: 0.05em !important; }
          .mobile-hamburger { gap: 6px; }
          .mobile-hamburger button { width: 32px !important; height: 32px !important; padding: 0 !important; }
          .mobile-hamburger svg { width: 16px !important; height: 16px !important; }
        }
      `}</style>
    </nav>
  );
}
