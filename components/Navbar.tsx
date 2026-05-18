"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Leaf, Menu, X, ArrowRight, Sun, Moon, ChevronRight, Globe, Palette } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", icon: "🏠" },
  { label: "About", href: "#about", icon: "👤" },
  { label: "Programs", href: "#services", icon: "🌿" },
  { label: "Results", href: "#testimonials", icon: "⭐" },
  { label: "Blog", href: "#blog", icon: "📖" },
  { label: "Contact", href: "#contact", icon: "✉️" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState("green");

  // ── Theme toggle ──
  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // ── Color Theme toggle ──
  const toggleColorTheme = () => {
    const themes = ["green", "violet", "neon"];
    const currentIndex = themes.indexOf(colorTheme);
    const newColor = themes[(currentIndex + 1) % themes.length] || "green";
    setColorTheme(newColor);
    document.documentElement.setAttribute("data-theme", newColor);
    localStorage.setItem("colorTheme", newColor);
  };

  useEffect(() => {
    // Force scroll to top on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    setMounted(true);
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : false;
    setIsDark(dark);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    const storedColor = localStorage.getItem("colorTheme") || "green";
    setColorTheme(storedColor);
    document.documentElement.setAttribute("data-theme", storedColor);
  }, []);

  useEffect(() => {
    // ── GSAP entry — nav slides in, logo bounces, links stagger in ──
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Full nav bar slides down
      tl.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );

      // Logo bounces in
      tl.fromTo(logoRef.current,
        { scale: 0.6, opacity: 0, rotate: -10 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" },
        "-=0.4"
      );

      // Nav links stagger in from above
      tl.fromTo(".nav-link-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
        "-=0.3"
      );

      // CTA button pops in
      tl.fromTo(".nav-cta-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      );
    });

    // ── Scroll handler ──
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Magnetic effect on CTA ──
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };
  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? "0" : "0",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ── Inner pill / bar ── */}
        <div style={{
          margin: scrolled ? "0" : "12px 24px 0",
          background: scrolled
            ? "var(--glass-strong-bg)"
            : "var(--glass-bg)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: scrolled ? "none" : "1px solid var(--border)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid var(--border)",
          borderRadius: scrolled ? "0" : "100px",
          padding: scrolled ? "14px 32px" : "10px 16px",
          transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: scrolled ? "0 2px 40px rgba(0,0,0,0.12)" : "0 8px 40px rgba(0,0,0,0.08)",
        }}>

          {/* ── Logo ── */}
          <a
            ref={logoRef}
            href="#home"
            onClick={() => handleNavClick("#home")}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}
          >
            {/* Animated logo icon */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "14px",
                background: "var(--gradient-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px var(--primary-glow)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, { rotate: 10, scale: 1.08, duration: 0.3, ease: "back.out(2)" });
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
                }}
              >
                <Globe size={19} style={{ color: "white" }} />
              </div>
              {/* Pulse ring */}
              <div style={{
                position: "absolute", inset: "-4px",
                borderRadius: "18px",
                border: "2px solid var(--primary)",
                opacity: 0.25,
                animation: "pulse-ring-nav 2s ease-out infinite",
              }} />
            </div>

            <div>
              <div style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "20px", fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                Mission 444
              </div>
              <div style={{
                fontSize: "9px", color: "var(--primary)",
                fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}>
                Wellness World
              </div>
            </div>
          </a>

          {/* ── Desktop nav links ── */}
          <div
            ref={linksRef}
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
          >
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace("#", "");
              const isHovered = hoveredLink === link.href;
              return (
                <button
                  key={link.href}
                  className="nav-link-item"
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "8px 16px", borderRadius: "100px",
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "var(--primary-glow)"
                      : isHovered
                        ? "var(--surface-3)"
                        : "transparent",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "14px",
                    transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                    fontFamily: "inherit",
                    position: "relative",
                    letterSpacing: "0.01em",
                  }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: "3px", left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "var(--primary)",
                    }} />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* ── Right: Theme + Color + CTA + Hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  border: "1.5px solid var(--border)",
                  background: "var(--surface-2)",
                  color: "var(--text-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.background = "var(--primary-glow)";
                  e.currentTarget.style.color = "var(--primary)";
                  gsap.to(e.currentTarget, { rotate: 20, scale: 1.08, duration: 0.3, ease: "back.out(2)" });
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface-2)";
                  e.currentTarget.style.color = "var(--text-primary)";
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
                }}
              >
                {isDark
                  ? <Sun size={17} style={{ transition: "all 0.3s ease" }} />
                  : <Moon size={17} style={{ transition: "all 0.3s ease" }} />
                }
              </button>
            )}

            {/* Color Theme toggle */}
            {mounted && (
              <button
                onClick={toggleColorTheme}
                title={`Switch to ${colorTheme === "green" ? "Celestial Violet" : colorTheme === "violet" ? "Electric Neon" : "Earth Green"} Theme`}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  border: "1.5px solid var(--border)",
                  background: "var(--surface-2)",
                  color: colorTheme === "green" ? "#7C3AED" : colorTheme === "violet" ? "#00B4D8" : "#3D6B4F", // Show next color as hint
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.background = "var(--primary-glow)";
                  e.currentTarget.style.color = "var(--primary)";
                  gsap.to(e.currentTarget, { rotate: -20, scale: 1.08, duration: 0.3, ease: "back.out(2)" });
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface-2)";
                  e.currentTarget.style.color = colorTheme === "green" ? "#7C3AED" : colorTheme === "violet" ? "#00B4D8" : "#3D6B4F";
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
                }}
              >
                <Palette size={17} style={{ transition: "all 0.3s ease" }} />
              </button>
            )}

            {/* CTA button — desktop */}
            <a
              href="#contact"
              className="nav-cta-btn btn-primary nav-cta-desktop"
              style={{ fontSize: "14px", padding: "10px 22px", gap: "6px" }}
              onClick={e => { e.preventDefault(); handleNavClick("#contact"); }}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={e => { handleCtaMouseLeave(e); }}
            >
              Book Free Call <ChevronRight size={14} />
            </a>

            {/* Mobile menu toggle */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "var(--surface-2)", border: "1.5px solid var(--border)",
                borderRadius: "12px", padding: "8px 9px", cursor: "pointer",
                color: "var(--text-primary)", display: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "var(--glass-strong-bg)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        display: "flex", flexDirection: "column",
        padding: "0 24px 40px",
        transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        opacity: menuOpen ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        {/* Mobile header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 0",
          borderBottom: "1px solid var(--border)", marginBottom: "32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "12px",
              background: "var(--gradient-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Globe size={16} style={{ color: "white" }} />
            </div>
            <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
              Mission 444
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "50%", width: "40px", height: "40px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-primary)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: isActive ? "var(--primary-glow)" : "none",
                  border: isActive ? "1px solid var(--border-active)" : "1px solid transparent",
                  borderRadius: "16px", cursor: "pointer",
                  textAlign: "left", padding: "16px 20px",
                  color: isActive ? "var(--primary)" : "var(--text-primary)",
                  fontSize: "26px", fontWeight: 700,
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "var(--surface-2)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "18px" }}>{link.icon}</span>
                  {link.label}
                </span>
                <ArrowRight size={18} style={{ color: isActive ? "var(--primary)" : "var(--text-muted)", transition: "transform 0.2s" }} />
              </button>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
          <a
            href="#contact"
            className="btn-primary"
            style={{ justifyContent: "center", fontSize: "16px", padding: "16px" }}
            onClick={e => { e.preventDefault(); handleNavClick("#contact"); }}
          >
            Book Free Discovery Call <ArrowRight size={16} />
          </a>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {mounted && (
              <button
                onClick={toggleColorTheme}
                style={{
                  flex: 1, padding: "12px", minWidth: "45%",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "100px", cursor: "pointer",
                  color: colorTheme === "green" ? "#7C3AED" : colorTheme === "violet" ? "#00B4D8" : "#3D6B4F",
                  fontSize: "14px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  fontFamily: "inherit",
                }}
              >
                <Palette size={16} /> {colorTheme === "green" ? "Violet Theme" : colorTheme === "violet" ? "Neon Theme" : "Green Theme"}
              </button>
            )}
            {mounted && (
              <button
                onClick={toggleTheme}
                style={{
                  flex: 1, padding: "12px", minWidth: "45%",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "100px", cursor: "pointer",
                  color: "var(--text-primary)", fontSize: "14px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  fontFamily: "inherit",
                }}
              >
                {isDark ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring-nav {
          0% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.18); opacity: 0.08; }
          100% { transform: scale(1); opacity: 0.25; }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .nav-cta-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
