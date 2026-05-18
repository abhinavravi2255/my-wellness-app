"use client";

import { useState, useEffect } from "react";
import { Accessibility, Type, Contrast, X, TypeOutline, PauseCircle, MousePointer2, BookA, RotateCcw } from "lucide-react";

type AccState = {
  highContrast: boolean;
  largeText: boolean;
  textSpacing: boolean;
  pauseAnim: boolean;
  dyslexia: boolean;
  bigCursor: boolean;
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<AccState>({
    highContrast: false,
    largeText: false,
    textSpacing: false,
    pauseAnim: false,
    dyslexia: false,
    bigCursor: false,
  });

  // Apply classes based on state changes
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("high-contrast", state.highContrast);
    html.classList.toggle("large-text", state.largeText);
    html.classList.toggle("text-spacing", state.textSpacing);
    html.classList.toggle("pause-animations", state.pauseAnim);
    html.classList.toggle("dyslexia-friendly", state.dyslexia);
    html.classList.toggle("big-cursor", state.bigCursor);
  }, [state]);

  const toggle = (key: keyof AccState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setState({
      highContrast: false,
      largeText: false,
      textSpacing: false,
      pauseAnim: false,
      dyslexia: false,
      bigCursor: false,
    });
  };

  const features = [
    { key: "highContrast", icon: <Contrast size={28} strokeWidth={1.5} />, label: "Contrast +" },
    { key: "largeText", icon: <Type size={28} strokeWidth={1.5} />, label: "Bigger Text" },
    { key: "textSpacing", icon: <TypeOutline size={28} strokeWidth={1.5} />, label: "Text Spacing" },
    { key: "pauseAnim", icon: <PauseCircle size={28} strokeWidth={1.5} />, label: "Pause Anim" },
    { key: "dyslexia", icon: <BookA size={28} strokeWidth={1.5} />, label: "Dyslexia Safe" },
    { key: "bigCursor", icon: <MousePointer2 size={28} strokeWidth={1.5} />, label: "Big Cursor" },
  ] as const;

  return (
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 9999 }}>
      {/* Widget Panel */}
      <div
        style={{
          position: "absolute",
          bottom: "64px",
          left: "0",
          background: "var(--surface)",
          borderRadius: "16px",
          width: "340px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px var(--border)",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(15px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "var(--gradient-primary)",
          padding: "16px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          color: "white",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Accessibility size={20} />
            <span style={{ fontSize: "16px", fontWeight: 600 }}>Accessibility Menu</span>
          </div>
          <button onClick={() => setIsOpen(false)} style={{
            background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
            width: "28px", height: "28px", cursor: "pointer", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body / Grid */}
        <div style={{ padding: "20px", background: "var(--background)" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
            marginBottom: "20px"
          }}>
            {features.map((feat) => {
              const active = state[feat.key as keyof AccState];
              return (
                <button
                  key={feat.key}
                  onClick={() => toggle(feat.key as keyof AccState)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
                    background: active ? "var(--primary-glow)" : "var(--surface)",
                    border: active ? "2px solid var(--primary)" : "1px solid var(--border)",
                    color: active ? "var(--primary)" : "var(--text-primary)",
                    padding: "20px 10px", borderRadius: "12px", cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: active ? "0 4px 12px var(--shadow-glow)" : "0 2px 8px var(--shadow-card)",
                  }}
                  onMouseEnter={e => {
                    if (!active) e.currentTarget.style.borderColor = "var(--border-active)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    if (!active) e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ transform: active ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
                    {feat.icon}
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>{feat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Button */}
          <button
            onClick={resetAll}
            style={{
              width: "100%", background: "var(--primary)", color: "white",
              border: "none", borderRadius: "10px", padding: "14px",
              fontSize: "14px", fontWeight: 600, display: "flex",
              alignItems: "center", justifyContent: "center", gap: "8px",
              cursor: "pointer", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <RotateCcw size={16} /> Reset All Accessibility
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--primary)",
          color: "white",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 32px var(--shadow-glow)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: isOpen ? "scale(0.9)" : "scale(1)",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = isOpen ? "scale(0.9)" : "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = isOpen ? "scale(0.9)" : "scale(1)"}
        aria-label="Accessibility Options"
      >
        <Accessibility size={26} />
      </button>
    </div>
  );
}
