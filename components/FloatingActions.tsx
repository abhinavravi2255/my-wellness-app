"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronsUp, Phone, Bot } from "lucide-react";

/* ── AI Bot Icon ── */
const AIChatIcon = () => (
  <Bot size={26} style={{ color: "white" }} strokeWidth={1.5} />
);

/* ── Chat Bubble that expands on click ── */
function AIChatBubble({ open, onClose }: { open: boolean; onClose: () => void }) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! 👋 I'm Asuhar's wellness assistant. How can I help you today?" },
  ]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (bubbleRef.current) {
      if (open) {
        gsap.fromTo(bubbleRef.current,
          { scale: 0.7, opacity: 0, transformOrigin: "bottom right" },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }
        );
      } else {
        gsap.to(bubbleRef.current,
          { scale: 0.7, opacity: 0, duration: 0.25, ease: "power2.in", transformOrigin: "bottom right" }
        );
      }
    }
  }, [open]);

  const botReplies = [
    "I'd love to help you start your wellness journey! 🌿 Would you like to book a free discovery call?",
    "Asuhar offers personalised coaching programs for mind, body & nutrition. Which area interests you most?",
    "Great question! You can reach Asuhar directly at hello@asuharb.com or use the contact form below.",
    "Transforming your lifestyle starts with one small step. Let's find the right program for you! ✨",
  ];

  const sendMessage = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setInputVal("");
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
      setTyping(false);
    }, 1200);
  };

  if (!open) return null;

  return (
    <div ref={bubbleRef} style={{
      position: "fixed", bottom: "92px", right: "24px",
      width: "320px", background: "var(--surface)",
      border: "1px solid var(--border-active)",
      borderRadius: "24px", zIndex: 1000,
      boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "var(--gradient-primary)", padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <AIChatIcon />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Wellness AI</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Online now
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
          width: "30px", height: "30px", cursor: "pointer", color: "white",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{
        height: "220px", overflowY: "auto", padding: "16px",
        display: "flex", flexDirection: "column", gap: "10px",
        background: "var(--surface)",
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px",
              borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.from === "user" ? "var(--gradient-primary)" : "var(--surface-2)",
              color: msg.from === "user" ? "white" : "var(--text-primary)",
              fontSize: "13px", lineHeight: 1.5,
              border: msg.from === "bot" ? "1px solid var(--border)" : "none",
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: "4px", padding: "10px 14px" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "var(--primary)", display: "inline-block",
                animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 14px", borderTop: "1px solid var(--border)",
        display: "flex", gap: "8px", background: "var(--surface)",
      }}>
        <input
          type="text"
          placeholder="Type a message…"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1, background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: "100px", padding: "9px 14px", fontSize: "13px",
            color: "var(--text-primary)", outline: "none", fontFamily: "inherit",
          }}
        />
        <button onClick={sendMessage} style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "var(--gradient-primary)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════ */
export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);
  const chatBtnRef = useRef<HTMLButtonElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
      setShowScrollTop(scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    // Entry animation — AI chat button
    gsap.fromTo(chatBtnRef.current,
      { scale: 0, opacity: 0, rotate: -30 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(2)", delay: 2 }
    );
    // Gentle bob
    gsap.to(chatBtnRef.current, {
      y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!scrollBtnRef.current) return;
    gsap.to(scrollBtnRef.current, {
      opacity: showScrollTop ? 1 : 0,
      scale: showScrollTop ? 1 : 0.5,
      y: showScrollTop ? 0 : 20,
      duration: 0.4,
      ease: showScrollTop ? "back.out(1.7)" : "power2.in",
      pointerEvents: showScrollTop ? "auto" : "none",
    });
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (scrollBtnRef.current) {
      gsap.fromTo(scrollBtnRef.current,
        { rotate: 0 },
        { rotate: -360, duration: 0.6, ease: "power2.out" }
      );
    }
  };

  return (
    <>
      {/* ── AI Chat Bubble ── */}
      <AIChatBubble open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ── AI Chat Button ── */}
      <button
        ref={chatBtnRef}
        onClick={() => setChatOpen(o => !o)}
        title="Chat with Wellness AI"
        style={{
          position: "fixed", bottom: "90px", right: "24px",
          width: "58px", height: "58px", borderRadius: "50%",
          background: chatOpen
            ? "linear-gradient(135deg, #6BA880 0%, #3D6B4F 100%)"
            : "var(--gradient-primary)",
          border: "none", cursor: "pointer", zIndex: 999, opacity: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(61,107,79,0.45)",
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 10px 36px rgba(61,107,79,0.65)";
          gsap.to(e.currentTarget, { scale: 1.1, duration: 0.25, ease: "back.out(2)" });
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(61,107,79,0.45)";
          gsap.to(e.currentTarget, { scale: 1, duration: 0.35, ease: "elastic.out(1,0.5)" });
        }}
      >
        {/* Pulsing ring when closed */}
        {!chatOpen && (
          <span style={{
            position: "absolute", inset: "-6px",
            borderRadius: "50%",
            border: "2px solid var(--primary)",
            opacity: 0.35,
            animation: "chat-pulse 2s ease-out infinite",
          }} />
        )}
        <AIChatIcon />
      </button>

      {/* ── Scroll-to-top ── */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToTop}
        title="Back to top"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "50px", height: "50px",
          borderRadius: "16px",
          background: "var(--surface)",
          border: "1.5px solid var(--border-active)",
          cursor: "pointer", zIndex: 999, opacity: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "2px",
          boxShadow: "var(--shadow-card)",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--primary)";
          gsap.to(e.currentTarget, { y: -4, scale: 1.06, duration: 0.25, ease: "back.out(2)" });
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border-active)";
          gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4, ease: "elastic.out(1,0.5)" });
        }}
      >
        {/* Circular progress ring */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}
          viewBox="0 0 50 50"
        >
          <circle cx="25" cy="25" r="22" fill="none" stroke="var(--border)" strokeWidth="2.5" />
          <circle
            cx="25" cy="25" r="22" fill="none"
            stroke="var(--primary)" strokeWidth="2.5"
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s ease" }}
          />
        </svg>
        {/* Icon */}
        <ChevronsUp size={18} style={{ color: "var(--primary)", position: "relative", zIndex: 1 }} />
      </button>

      {/* Mobile call button */}
      <a
        href="tel:+18009355637"
        style={{
          position: "fixed", bottom: "90px", left: "24px",
          display: "none",
          alignItems: "center", gap: "8px",
          background: "var(--gradient-primary)",
          borderRadius: "100px", padding: "12px 20px",
          textDecoration: "none", color: "white",
          fontWeight: 700, fontSize: "14px",
          zIndex: 999,
          boxShadow: "0 4px 20px var(--primary-glow)",
        }}
        className="mobile-call-btn"
      >
        <Phone size={16} /> Call Now
      </a>

      <style>{`
        @keyframes chat-pulse {
          0% { transform: scale(1); opacity: 0.35; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 768px) {
          .mobile-call-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
