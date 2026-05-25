import React from 'react';

interface SectionHeadingProps {
  level: 'h2' | 'h3' | 'h4';
  title: string;
  description?: string;
  className?: string;
}

/**
 * SectionHeading — shared heading component for canvas sections.
 *
 * H2: Page-level section title (Color Palette, Forms, Branding…)
 *     → colored left-bar + text-xl bold + optional description
 *
 * H3: Card / group title within a section (Main Variations, Alert Variants…)
 *     → uppercase tracking-widest + muted color + border-bottom
 *
 * H4: Small group label within a card (Badge Types, Duration Scale…)
 *     → uppercase tracking-widest muted, no border
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  level,
  title,
  description,
  className = '',
}) => {
  if (level === 'h2') {
    return (
      <div className={`theme-transition ${className}`}>
        <h2 className="text-xl font-bold text-tx">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted mt-1 theme-transition">{description}</p>
        )}
      </div>
    );
  }

  if (level === 'h3') {
    return (
      <h3
        className={`text-sm font-bold text-muted uppercase tracking-widest border-b border-bordercolor pb-3 theme-transition ${className}`}
      >
        {title}
      </h3>
    );
  }

  // h4
  return (
    <h4
      className={`text-xs font-bold text-muted uppercase tracking-widest theme-transition ${className}`}
    >
      {title}
    </h4>
  );
};
