"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

const THEMES = ["emerald", "blue", "violet"];

export default function ColorToggle() {
  const [currentTheme, setCurrentTheme] = useState("emerald");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("color-theme");
    if (stored && THEMES.includes(stored)) {
      setCurrentTheme(stored);
    } else {
      if (document.documentElement.classList.contains("theme-violet")) {
        setCurrentTheme("violet");
      } else if (document.documentElement.classList.contains("theme-blue")) {
        setCurrentTheme("blue");
      }
    }
  }, []);

  const toggleColor = () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    
    // Remove all theme classes first
    document.documentElement.classList.remove("theme-blue", "theme-violet");
    
    // Add the new theme class if it's not the default (emerald)
    if (nextTheme !== "emerald") {
      document.documentElement.classList.add(`theme-${nextTheme}`);
    }
    
    localStorage.setItem("color-theme", nextTheme);
    setCurrentTheme(nextTheme);
  };

  if (!mounted) return <div style={{ width: "38px", height: "38px" }} />;

  return (
    <button 
      onClick={toggleColor}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "38px", height: "38px", borderRadius: "50%",
        background: "var(--surface-2)", border: "1px solid var(--border)",
        color: "var(--text-primary)", cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--primary-light)";
        (e.currentTarget as HTMLElement).style.color = "var(--primary)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
      }}
      aria-label="Toggle Color Theme"
      title={`Switch to ${THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length]} theme`}
    >
      <Palette size={16} />
    </button>
  );
}
