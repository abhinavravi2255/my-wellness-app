"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Ravi Menon", role: "Business Owner", company: "Menon Traders Pvt. Ltd.", location: "Kochi, Kerala", rating: 5, text: "TallyPro Solutions transformed the way we handle accounting. Their Tally setup and training made our processes seamless and error-free. The support team is always just a call away! We went from chaos to clarity in just 2 weeks.", initial: "R", color: "#0066FF" },
  { name: "Anita Nair", role: "Finance Manager", company: "Nair Exports Ltd.", location: "Thrissur, Kerala", rating: 5, text: "We had challenges managing multiple branches, but with their Tally synchronization and remote access solutions, everything is now consolidated and secure. The GST compliance module alone saved us 20+ hours per month.", initial: "A", color: "#00D4FF" },
  { name: "Shahid Ali", role: "Operations Head", company: "Ali Brothers Wholesale", location: "Kozhikode, Kerala", rating: 5, text: "From installation to ongoing support, the team provided excellent guidance. Our staff is more confident using Tally, thanks to the detailed training sessions. The customization for our trade-specific reports is exactly what we needed.", initial: "S", color: "#7C3AED" },
  { name: "Priya Krishnan", role: "CFO", company: "Krishna Hospitals Group", location: "Trivandrum, Kerala", rating: 5, text: "Implementing Tally for our multi-unit hospital chain seemed daunting, but TallyPro made it smooth. Their healthcare-specific customizations for billing, pharmacy inventory, and statutory compliance are outstanding.", initial: "P", color: "#22C55E" },
  { name: "Mohammed Rafiq", role: "Managing Director", company: "Rafiq Auto Accessories", location: "Calicut, Kerala", rating: 5, text: "The automobile dealer module they built for us tracks parts inventory, vehicle sales, and service records seamlessly within Tally. Best investment for our business. They truly understand industry-specific needs.", initial: "M", color: "#F59E0B" },
  { name: "Deepa Thomas", role: "Owner", company: "Thomas Jewellers", location: "Ernakulam, Kerala", rating: 5, text: "Running a jewellery business requires precise weight tracking, purity management, and GST compliance. TallyPro's gold jewellery module handles everything perfectly. Their AMC support is always prompt and professional.", initial: "D", color: "#EC4899" },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const navigate = (dir: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    const cards = document.querySelectorAll(".t-card");
    gsap.to(cards, {
      x: dir === "next" ? -40 : 40, opacity: 0, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(prev => dir === "next" ? (prev + 1) % totalPages : (prev - 1 + totalPages) % totalPages);
        gsap.fromTo(".t-card", { x: dir === "next" ? 40 : -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power2.out", onComplete: () => setIsAnimating(false) });
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".t-header", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
      gsap.fromTo(".t-stat", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".t-stats", start: "top 85%" } });
      gsap.fromTo(".t-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".t-grid", start: "top 80%" } });
    }, sectionRef);

    const interval = setInterval(() => navigate("next"), 6000);
    return () => { ctx.revert(); clearInterval(interval); };
  }, []);

  const startIdx = currentIndex * itemsPerPage;
  const visible = testimonials.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section ref={sectionRef} id="testimonials" style={{
      padding: "100px 0", position: "relative", overflow: "hidden",
      background: "linear-gradient(180deg,var(--surface) 0%,var(--background) 100%)",
    }}>
      <div className="orb orb-cyan" style={{ width: "500px", height: "500px", top: "-100px", left: "-200px", opacity: 0.12 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="t-header" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-tag" style={{ marginBottom: "16px" }}><Star size={14} /> Client Stories</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, marginBottom: "16px" }}>
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto" }}>
            Real stories from businesses that transformed their operations with our Tally solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="t-stats" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginBottom: "48px", flexWrap: "wrap" }}>
          {[{ num: "4.9/5", label: "Average Rating", icon: "⭐" }, { num: "2000+", label: "Happy Clients", icon: "😊" }, { num: "98%", label: "Would Recommend", icon: "👍" }].map(s => (
            <div key={s.label} className="t-stat" style={{ textAlign: "center", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "14px", padding: "16px 28px" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, marginBottom: "4px" }}>{s.icon} {s.num}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="t-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", marginBottom: "40px" }}>
          {visible.map((t, i) => (
            <div key={`${currentIndex}-${i}`} className="t-card" style={{
              background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "20px",
              padding: "28px", position: "relative", overflow: "hidden", transition: "border-color 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${t.color}44`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${t.color},transparent)` }} />
              <Quote size={28} style={{ color: t.color, opacity: 0.25, marginBottom: "14px" }} />
              <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                {[...Array(t.rating)].map((_, si) => <Star key={si} size={13} fill="#FFC107" style={{ color: "#FFC107" }} />)}
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "22px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${t.color}22`, border: `2px solid ${t.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: t.color, flexShrink: 0 }}>{t.initial}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.role} · {t.company}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>📍 {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <button onClick={() => navigate("prev")} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)", transition: "all 0.2s ease" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--primary)"; el.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; }}
          ><ChevronLeft size={18} /></button>
          <div style={{ display: "flex", gap: "8px" }}>
            {[...Array(totalPages)].map((_, i) => (
              <div key={i} onClick={() => setCurrentIndex(i)} style={{ width: i === currentIndex ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === currentIndex ? "var(--primary)" : "var(--border)", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => navigate("next")} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)", transition: "all 0.2s ease" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--primary)"; el.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; }}
          ><ChevronRight size={18} /></button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) { .t-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
