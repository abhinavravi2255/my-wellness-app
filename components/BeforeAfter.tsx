"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, ArrowLeftRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const transformations = [
  {
    id: 1,
    name: "Sustainable Weight Loss",
    description: "Achieved through balanced nutrition and holistic lifestyle changes without restrictive diets.",
    result: "Lost weight, gained energy",
    beforeImage: "/before-after-1.jpg", // Please save the man in green shirt image here
    afterImage: "/before-after-1.jpg",
  },
  {
    id: 2,
    name: "Reclaiming Health",
    description: "A journey from fatigue and stress to vibrant health, mobility, and confidence.",
    result: "Complete lifestyle transformation",
    beforeImage: "/before-after-2.jpg", // Please save the woman in blue sweater image here
    afterImage: "/before-after-2.jpg",
  },
  {
    id: 3,
    name: "Strength & Vitality",
    description: "Overcoming metabolic challenges to build a strong, active, and youthful body at any age.",
    result: "Reversed metabolic markers",
    beforeImage: "/before-after-3.jpg", // Please save the woman in saree/red shirt image here
    afterImage: "/before-after-3.jpg",
  },
  {
    id: 4,
    name: "A New Lease on Life",
    description: "Taking control of health through structured habits, resulting in profound physical and mental improvements.",
    result: "Shed weight & renewed confidence",
    beforeImage: "/before-after-4.jpg", // Please save the man in maroon shirt image here
    afterImage: "/before-after-4.jpg",
  }
];

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ba-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".ba-header", start: "top 80%" } }
      );

      gsap.fromTo(".ba-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="transformations" style={{
      paddingTop: "100px", paddingBottom: "100px",
      position: "relative", overflow: "hidden",
      background: "var(--background)",
    }}>
      {/* Decorative Orbs */}
      <div className="orb orb-primary" style={{ width: "600px", height: "600px", top: "10%", left: "-20%", opacity: 0.15 }} />
      <div className="orb orb-accent" style={{ width: "500px", height: "500px", bottom: "-10%", right: "-10%", opacity: 0.15 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="ba-header" style={{ textAlign: "center", marginBottom: "70px" }}>
          <div className="section-tag" style={{ marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={14} fill="currentColor" /> Real Results
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(34px, 4.5vw, 62px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px",
          }}>
            Witness the <br /><span className="text-gradient">Transformation</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto" }}>
            These aren&apos;t just physical changes; they represent renewed energy, confidence, and a sustainable approach to lifelong wellness.
          </p>
        </div>

        {/* Transformation Cards */}
        <div ref={containerRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          position: "relative"
        }}>
          {transformations.map((item) => (
            <div key={item.id} className="ba-card" style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* Image Container - Using the combined images provided by the user */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "var(--surface-2)", overflow: "hidden" }}>
                {/* 
                  Note: The user uploaded combined Before & After images. 
                  We will display the full image using object-fit cover.
                */}
                <Image 
                  src={item.beforeImage} 
                  alt={`${item.name} transformation`}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    // Fallback if image not found yet
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `
                        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); text-align:center; padding: 20px;">
                          <div style="margin-bottom:10px; opacity:0.5;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>
                          <span>Please place the uploaded image at<br/><code style="color:var(--accent); font-size:12px;">public/before-after-${item.id}.jpg</code></span>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Overlay Badge */}
                <div style={{
                  position: "absolute", bottom: "16px", left: "16px",
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}>
                  <ArrowLeftRight size={14} style={{ color: "var(--accent)" }} />
                  Before & After
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "16px",
                  width: "fit-content"
                }}>
                  ✓ {item.result}
                </div>
                
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px", flex: 1 }}>
                  {item.description}
                </p>

                {/* Decorative line */}
                <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "20px" }} />
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "13px", fontWeight: 500 }}>
                  <span>Verified Result</span>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
