"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUp, Phone } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    // Entrance animation
    gsap.fromTo(
      [whatsappRef.current],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 2 }
    );

    // Subtle pulse on WhatsApp button
    gsap.to(whatsappRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 3,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        opacity: showScrollTop ? 1 : 0,
        scale: showScrollTop ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: showScrollTop ? "auto" : "none",
      });
    }
  }, [showScrollTop]);

  return (
    <>
      {/* WhatsApp floating button */}
      <a
        ref={whatsappRef}
        href="https://wa.me/919847482559?text=Hi!%20I%20want%20to%20know%20more%20about%20TallyPrime%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)",
          textDecoration: "none",
          zIndex: 999,
          opacity: 0,
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.7)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37, 211, 102, 0.5)";
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Scroll to top */}
      <div
        ref={btnRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--gradient-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px var(--border-active)",
          cursor: "pointer",
          zIndex: 999,
          opacity: 0,
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px var(--border-active)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px var(--border-active)";
        }}
      >
        <ArrowUp size={20} color="white" />
      </div>

      {/* Call button (mobile only) */}
      <a
        href="tel:+919847482559"
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: "90px",
          left: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--gradient-primary)",
          borderRadius: "100px",
          padding: "12px 18px",
          textDecoration: "none",
          color: "white",
          fontWeight: 700,
          fontSize: "14px",
          zIndex: 999,
          boxShadow: "0 4px 20px var(--border-active)",
        }}
      >
        <Phone size={16} />
        Call Now
      </a>
    </>
  );
}
