"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export default function TiltCard({ children, className = "", style = {}, onMouseEnter, onMouseLeave }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only apply on desktop devices where mouse interaction makes sense
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor position relative to center
      const rotateX = ((y - centerY) / centerY) * -12; // Max 12deg tilt
      const rotateY = ((x - centerX) / centerX) * 12;
      
      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.4,
        scale: 1.02 // slight pop
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "elastic.out(1, 0.4)", // Bouncy return
        duration: 1.2
      });
    };
    
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={className} 
      style={{ ...style, transformStyle: "preserve-3d" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D Inner Wrapper for extra depth */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
