// src/components/ResultCard.jsx
// Individual result card showing a computed value with label, icon, and accent colour

import React from 'react';

/**
 * ResultCard
 * @param {{
 *   label:     string,
 *   value:     string,
 *   subLabel?: string,
 *   subValue?: string,
 *   icon:      React.ReactNode,
 *   accentClass: string,   // Tailwind classes for accent colour
 *   glowClass:   string,   // CSS class for box-shadow glow
 *   delay?:    number,     // animation delay in ms
 * }} props
 */
const ResultCard = ({
  label,
  value,
  subLabel,
  subValue,
  icon,
  accentClass,
  glowClass,
  delay = 0,
}) => {
  return (
    <div
      className={[
        'slide-in-up relative rounded-2l p-5',
        'bg-white dark:bg-slate-800/70',
        'border border-slate-100 dark:border-slate-700/60',
        glowClass,
        'transition-all duration-300 hover:scale-[1.01] hover:shadow-lg',
        'overflow-hidden',
      ].join(' ')}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 ${accentClass}`} />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider
                      text-slate-500 dark:text-slate-400 leading-tight break-words min-w-0 flex-1">
          {label}
        </p>
        {/* Icon badge */}
        <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${accentClass} bg-opacity-15`}>
          {icon}
        </div>
      </div>

      {/* Primary value */}
      <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl
                    text-slate-900 dark:text-white
                    tabular-nums tracking-tight break-all leading-tight">
        {value}
      </p>

      {/* Optional sub-row (e.g. CGST + SGST) */}
      {subLabel && subValue && (
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50
                        flex flex-wrap items-start justify-between gap-1">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">{subLabel}</p>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 break-all">{subValue}</p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
