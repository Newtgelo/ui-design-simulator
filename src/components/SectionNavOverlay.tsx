"use client";

import React, { useEffect, useRef, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
  level?: number; // 0 = top-level, 1 = sub-section
}

interface SectionNavOverlayProps {
  sections: NavSection[];
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

export const SectionNavOverlay: React.FC<SectionNavOverlayProps> = ({
  sections,
  scrollContainerRef,
}) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => setIsVisible(container.scrollTop > 80);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || sections.length === 0) return;

    observerRef.current?.disconnect();

    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const visibilityMap = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibilityMap.set(e.target.id, e.intersectionRatio));
        let bestId = "";
        let bestRatio = -1;
        visibilityMap.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestId) setActiveId(bestId);
      },
      {
        root: container,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -30% 0px",
      }
    );

    sectionEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections, scrollContainerRef]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    const offset =
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop -
      80;
    container.scrollTo({ top: offset, behavior: "smooth" });
    setActiveId(id);
    setIsExpanded(false);
  };

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, 200);
  };

  if (sections.length <= 1) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Popup card (Notion-style) ── */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-bordercolor)",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
          padding: "8px 0",
          minWidth: "160px",
          maxWidth: "210px",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded
            ? "translateX(0) scale(1)"
            : "translateX(8px) scale(0.97)",
          pointerEvents: isExpanded ? "auto" : "none",
          transition:
            "opacity 0.2s ease, transform 0.2s cubic-bezier(0.4,0,0.2,1)",
          transformOrigin: "right center",
        }}
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          const isSub = (section.level ?? 0) > 0;
          const isHov = hoveredId === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: isSub ? "3px 16px 3px 28px" : "5px 16px",
                fontSize: isSub ? "11px" : "12px",
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? "var(--color-primary)"
                  : isHov
                  ? "var(--color-tx)"
                  : isSub
                  ? "var(--color-muted)"
                  : "var(--color-tx)",
                background:
                  isHov && !isActive ? "var(--color-bg)" : "transparent",
                border: "none",
                cursor: "pointer",
                lineHeight: 1.5,
                transition: "color 0.15s ease, background 0.15s ease",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                opacity: isSub && !isActive ? 0.75 : 1,
              }}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      {/* ── Dash track — right edge of all dashes anchored to the same position ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "6px",
        }}
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          const isSub = (section.level ?? 0) > 0;

          const dashWidth = isActive ? 20 : isSub ? 6 : 10;
          const dashOpacity = isActive ? 1 : isSub ? 0.25 : 0.4;
          const dashColor = isActive
            ? "var(--color-primary)"
            : "var(--color-muted)";

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              title={section.label}
              style={{
                // Fixed 24px wide — right edge always at the same x position
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "24px",
                height: "14px",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: `${dashWidth}px`,
                  height: "2px",
                  borderRadius: "2px",
                  background: dashColor,
                  opacity: dashOpacity,
                  // grows leftward since right edge is fixed
                  transition:
                    "width 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s ease, opacity 0.25s ease",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
