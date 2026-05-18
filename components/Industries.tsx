"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Rss } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const posts = [
  {
    category: "Nutrition",
    title: "Why Counting Calories Is Ruining Your Relationship With Food",
    excerpt: "Discover the intuitive eating approach that has helped hundreds of my clients finally break free from diet culture and reconnect with their body's natural wisdom.",
    readTime: "5 min read",
    color: "#3D6B4F",
    emoji: "🥗",
    date: "May 12, 2026",
  },
  {
    category: "Mindset",
    title: "The Morning Ritual That Changed My Life (And My Clients' Too)",
    excerpt: "This simple 20-minute morning practice combines mindfulness, movement, and intention-setting to set the tone for a fulfilling day — every day.",
    readTime: "7 min read",
    color: "#C8914A",
    emoji: "🌅",
    date: "May 5, 2026",
  },
  {
    category: "Sleep",
    title: "Why You're Still Tired After 8 Hours of Sleep",
    excerpt: "Sleep quality matters more than quantity. Learn the surprising factors that are sabotaging your rest and the scientifically-proven strategies to fix them.",
    readTime: "6 min read",
    color: "#5B6FA8",
    emoji: "😴",
    date: "April 28, 2026",
  },
];

const marqueeItems = [
  "Holistic Wellness", "Mindful Nutrition", "Stress Mastery", "Sleep Optimisation",
  "Movement Medicine", "Emotional Wellbeing", "Vitality & Energy", "Lifestyle Design",
  "Habit Architecture", "Mind-Body Connection",
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-header", start: "top 80%" } }
      );
      gsap.fromTo(".blog-card",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".blog-grid", start: "top 75%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="section-pad" style={{
      position: "relative", overflow: "hidden",
      background: "var(--surface-2)",
    }}>
      {/* Marquee ribbon */}
      <div style={{
        background: "var(--gradient-primary)",
        padding: "14px 0", marginBottom: "80px",
        overflow: "hidden", whiteSpace: "nowrap",
      }}>
        <div className="animate-marquee" style={{ display: "inline-flex", gap: "0" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              padding: "0 32px", fontSize: "13px", fontWeight: 700,
              color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="blog-header" style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "48px", flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <div className="section-tag" style={{ marginBottom: "20px" }}>
              <Rss size={12} /> Wellness Blog
            </div>
            <h2 className="font-display" style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.02em",
            }}>
              Insights for Your<br /><span className="text-gradient">Wellness Journey</span>
            </h2>
          </div>
          <a href="#" className="btn-outline" style={{ flexShrink: 0 }}>
            <BookOpen size={15} /> All Articles
          </a>
        </div>

        {/* Blog cards */}
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {posts.map((post, i) => (
            <article key={i} className="blog-card card" style={{ overflow: "hidden", cursor: "pointer" }}>
              {/* Colour header */}
              <div style={{
                height: "180px", background: `${post.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "64px", position: "relative", overflow: "hidden",
                borderBottom: "1px solid var(--border)",
              }}>
                {post.emoji}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, ${post.color}08 0%, transparent 100%)`,
                }} />
                {/* Category badge */}
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: `${post.color}20`,
                  border: `1px solid ${post.color}40`,
                  borderRadius: "100px", padding: "4px 12px",
                  fontSize: "11px", fontWeight: 700, color: post.color,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {post.category}
                </div>
              </div>

              <div style={{ padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{post.date}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--text-muted)" }} />
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{post.readTime}</span>
                </div>

                <h3 style={{
                  fontSize: "19px", fontWeight: 700, marginBottom: "12px",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  color: "var(--text-primary)", lineHeight: 1.3,
                }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
                  {post.excerpt}
                </p>

                <a href="#" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "13px", fontWeight: 700, color: post.color,
                  textDecoration: "none",
                }}>
                  Read Article →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
