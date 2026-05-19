"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Priya M.",
    role: "Corporate Executive",
    rating: 5,
    text: "Working with Asuhar completely changed my relationship with my body and mind. I went from chronic fatigue to feeling genuinely energised every morning.",
    result: "Lost 12kg & tripled energy",
    avatar: "P",
    color: "#3D6B4F",
  },
  {
    name: "James T.",
    role: "Entrepreneur",
    rating: 5,
    text: "Asuhar's science-backed methods and genuine care made this the best investment I've ever made in myself. My stress levels dropped dramatically within weeks.",
    result: "Stress reduced by 80%",
    avatar: "J",
    color: "#C8914A",
  },
  {
    name: "Ananya R.",
    role: "Teacher",
    rating: 5,
    text: "The nutrition guidance wasn't about restriction — it was about truly nourishing myself. Three months in and my whole family notices the difference.",
    result: "Sustainable 15kg loss",
    avatar: "A",
    color: "#6BA880",
  },
  {
    name: "David K.",
    role: "Physician",
    rating: 5,
    text: "As a doctor, I appreciated the evidence-based approach. The sleep program alone transformed my life — from 4 hours of broken sleep to 7.5 hours of deep rest.",
    result: "Sleep improved 200%",
    avatar: "D",
    color: "#5B6FA8",
  },
  {
    name: "Leila A.",
    role: "New Mother",
    rating: 5,
    text: "Asuhar created a gentle, compassionate wellness plan that helped me rebuild my strength and confidence after postpartum without guilt. So grateful.",
    result: "Regained confidence & vitality",
    avatar: "L",
    color: "#A85B6F",
  },
  {
    name: "Rajan P.",
    role: "Retired Professional",
    rating: 5,
    text: "At 58, I thought it was too late for major health changes. Asuhar proved me completely wrong. I now move better, eat better, and feel 20 years younger.",
    result: "Reversed pre-diabetic markers",
    avatar: "R",
    color: "#3D6B4F",
  },
  {
    name: "Sofia B.",
    role: "Fitness Enthusiast",
    rating: 5,
    text: "I was already active but plateauing. Asuhar helped me understand the missing piece was mindset and recovery. Game-changing perspective shift.",
    result: "Hit new performance peak",
    avatar: "S",
    color: "#C8914A",
  },
  {
    name: "Marcus L.",
    role: "Software Engineer",
    rating: 5,
    text: "As someone who sits all day, the movement and posture guidance was incredible. I went from daily back pain to feeling genuinely comfortable in my body.",
    result: "Eliminated chronic back pain",
    avatar: "M",
    color: "#5B6FA8",
  },
];

function TestimonialCard({ t, style }: { t: typeof testimonials[0]; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "28px",
      minWidth: "340px",
      maxWidth: "340px",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
      ...style,
    }}>
      {/* Quote watermark */}
      <div style={{
        position: "absolute", top: "4px", right: "16px",
        fontSize: "120px", color: t.color, opacity: 0.06,
        fontFamily: "Georgia, serif", lineHeight: 1, pointerEvents: "none",
      }}>"</div>

      {/* Stars */}
      <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} size={13} fill="var(--accent)" style={{ color: "var(--accent)" }} />
        ))}
      </div>

      <Quote size={20} style={{ color: t.color, opacity: 0.5, marginBottom: "10px" }} />

      <p style={{
        fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.75,
        fontStyle: "italic", marginBottom: "18px",
      }}>
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Result badge */}
      <div style={{
        background: `${t.color}12`,
        border: `1px solid ${t.color}30`,
        borderRadius: "100px",
        padding: "5px 12px",
        fontSize: "11px",
        fontWeight: 700,
        color: t.color,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        marginBottom: "18px",
      }}>
        ✓ {t.result}
      </div>

      {/* Author */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        borderTop: "1px solid var(--border)", paddingTop: "16px",
      }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: `${t.color}20`,
          border: `2px solid ${t.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "15px", fontWeight: 700, color: t.color,
          fontFamily: "var(--font-cormorant), Georgia, serif",
          flexShrink: 0,
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Infinite scrolling marquee — two rows, opposite directions
    const speed = 0.5; // px per frame

    let x1 = 0, x2 = 0;
    const totalW = testimonials.length * (340 + 20);

    let raf: number;
    const animate = () => {
      x1 -= speed;
      x2 += speed;

      if (Math.abs(x1) >= totalW) x1 = 0;
      if (x2 >= totalW) x2 = 0;

      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${x1}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(-${totalW - x2}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { 
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate); 
    };

    const r1 = row1Ref.current;
    const r2 = row2Ref.current;

    r1?.addEventListener("mouseenter", pause);
    r1?.addEventListener("mouseleave", resume);
    r2?.addEventListener("mouseenter", pause);
    r2?.addEventListener("mouseleave", resume);

    // Section header GSAP
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonials-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-header", start: "top 80%" } }
      );

      // Stagger reveal for the marquee rows so they don't pop in abruptly
      gsap.fromTo(row1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".testimonials-header", start: "top 60%" } }
      );
      gsap.fromTo(row2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".testimonials-header", start: "top 60%" } }
      );
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      r1?.removeEventListener("mouseenter", pause);
      r1?.removeEventListener("mouseleave", resume);
      r2?.removeEventListener("mouseenter", pause);
      r2?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} id="testimonials" style={{
      paddingTop: "100px", paddingBottom: "100px",
      position: "relative", overflow: "hidden",
      background: "var(--surface-2)",
    }}>
      <div className="orb orb-primary" style={{ width: "500px", height: "500px", top: "-100px", right: "-100px", opacity: 0.3 }} />
      <div className="orb orb-accent" style={{ width: "400px", height: "400px", bottom: "-100px", left: "-100px", opacity: 0.25 }} />

      {/* Header */}
      <div className="container" style={{ position: "relative", zIndex: 1, marginBottom: "64px" }}>
        <div className="testimonials-header" style={{ textAlign: "center" }}>
          <div className="section-tag" style={{ marginBottom: "20px" }}>
            <Star size={12} fill="currentColor" /> Real Transformations
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(34px, 4.5vw, 62px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Real People,<br /><span className="text-gradient">Real Results</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto 32px" }}>
            The most rewarding part of my work is witnessing authentic transformations. Here&apos;s what clients say.
          </p>

          {/* Overall rating */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "16px",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "100px", padding: "12px 28px",
          }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--accent)" style={{ color: "var(--accent)" }} />
              ))}
            </div>
            <span style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)" }}>4.9/5</span>
            <div style={{ width: "1px", height: "18px", background: "var(--border)" }} />
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Based on 500+ reviews</span>
          </div>
        </div>
      </div>

      {/* ── Marquee Row 1 (left) ── */}
      <div style={{ overflow: "hidden", marginBottom: "20px", position: "relative", zIndex: 1 }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to right, var(--surface-2), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to left, var(--surface-2), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div
          ref={row1Ref}
          style={{
            display: "flex", gap: "20px",
            willChange: "transform",
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Marquee Row 2 (right) ── */}
      <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to right, var(--surface-2), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to left, var(--surface-2), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div
          ref={row2Ref}
          style={{
            display: "flex", gap: "20px",
            willChange: "transform",
            transform: `translateX(-${(testimonials.length * (340 + 20)) / 2}px)`,
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
