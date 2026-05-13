"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";

export default function ColorToggle() {
  const [isBlue, setIsBlue] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.documentElement.classList.contains("theme-blue")) {
      setIsBlue(true);
    }
  }, []);

  const toggleColor = () => {
    if (isBlue) {
      document.documentElement.classList.remove("theme-blue");
      localStorage.setItem("color-theme", "emerald");
      setIsBlue(false);
    } else {
      document.documentElement.classList.add("theme-blue");
      localStorage.setItem("color-theme", "blue");
      setIsBlue(true);
    }
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
    >
      <Palette size={16} />
    </button>
  );
}
