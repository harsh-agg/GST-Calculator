// src/components/InfoBanner.jsx
// Informational banner showing GST rate breakdown and quick facts

import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const GST_INFO = [
  { rate: '3%',  items: 'Precious metals (gold, silver, diamonds)' },
  { rate: '5%',  items: 'Essential food, transport, medicines' },
  { rate: '12%', items: 'Processed food, computers, mobiles' },
  { rate: '18%', items: 'Most goods & services (standard rate)' },
  { rate: '28%', items: 'Luxury items, automobiles, tobacco' },
];

/**
 * InfoBanner — collapsible panel with GST rate quick reference.
 */
const InfoBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-blue-200/60 dark:border-blue-800/40
                    bg-blue-50/60 dark:bg-blue-900/10 overflow-hidden
                    transition-all duration-300">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((p) => !p)}
        id="info-banner-toggle"
        className="w-full flex items-center justify-between px-4 py-3
                   text-left hover:bg-blue-100/50 dark:hover:bg-blue-900/20
                   transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold
                         text-blue-700 dark:text-blue-400">
          <Info className="w-4 h-4 shrink-0" strokeWidth={2} />
          GST Rate Quick Reference
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-blue-500" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-4 h-4 text-blue-500" strokeWidth={2} />
        )}
      </button>

      {/* Collapsible content */}
      {open && (
        <div className="px-4 pb-4 slide-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-1">
            {GST_INFO.map(({ rate, items }) => (
              <div
                key={rate}
                className="rounded-xl p-3 bg-white dark:bg-slate-800/70
                           border border-slate-100 dark:border-slate-700/50"
              >
                <p className="font-display font-bold text-lg text-blue-600 dark:text-blue-400">
                  {rate}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {items}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-600 italic">
            * Rates are indicative. Always verify with the official GST portal (gst.gov.in).
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoBanner;
