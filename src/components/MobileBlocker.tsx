"use client";

import { useEffect, useState } from "react";

export default function MobileBlocker() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsSmallScreen(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted || !isSmallScreen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-prompt, var(--font-noto-sans-thai, -apple-system, sans-serif))",
      }}
    >
      {/* Monitor icon — minimal stroke */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a0a0a0"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "1.5rem" }}
      >
        <rect x="2" y="3" width="20" height="14" rx="2.5" />
        <path d="M8 21h8M12 17v4" />
      </svg>

      {/* Status pill */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#b0a060",
          background: "#f5f0e0",
          border: "1px solid #e8e0c0",
          borderRadius: 99,
          padding: "4px 12px",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#c9a94a",
            flexShrink: 0,
          }}
        />
        อยู่ระหว่างการพัฒนา
      </span>

      {/* Heading */}
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#1a1a1a",
          margin: "0 0 0.6rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        ขณะนี้ยังไม่รองรับหน้าจอนี้
      </h1>

      {/* Body copy */}
      <p
        style={{
          fontSize: "0.875rem",
          color: "#888",
          maxWidth: 300,
          lineHeight: 1.75,
          margin: "0 0 2.5rem",
          fontWeight: 400,
        }}
      >
        เราออกแบบให้ใช้งานบนคอมพิวเตอร์เป็นหลัก
        <br />
        กรุณาเปิดบน Desktop เพื่อประสบการณ์ที่ดีที่สุด
      </p>

      {/* Divider + note */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "#c0c0c0",
          letterSpacing: "0.02em",
        }}
      >
        ความกว้างขั้นต่ำ 1,024px
      </p>
    </div>
  );
}
