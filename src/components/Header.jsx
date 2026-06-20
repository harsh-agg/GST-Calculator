// src/components/Header.jsx
// Sticky full-width header with logo, Digital Heroes CTA, and dark-mode toggle

import React from 'react';
import { Moon, Sun, Calculator, ExternalLink } from 'lucide-react';

/**
 * Header component
 * @param {{ isDark: boolean, toggleDark: () => void }} props
 */
const Header = ({ isDark, toggleDark }) => {
  return (
    <header className="sticky top-0 z-50 w-full relative
                       border-b border-slate-200/80 dark:border-white/5
                       bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl
                       shadow-sm dark:shadow-black/20">
      {/* Full-width inner row, max-width capped and centered */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-16 flex items-center justify-between gap-4">


        {/* ── Logo / Brand ─────────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Icon with pulse dot */}
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600
                            flex items-center justify-center shadow-md shadow-blue-500/25">
              <Calculator className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400
                             rounded-full border-2 border-white dark:border-slate-900
                             animate-pulse" />
          </div>

          {/* Brand name */}
          <div>
            <p className="font-display font-bold text-base leading-none
                          text-slate-900 dark:text-white tracking-tight">
              GST<span className="gradient-text">Calc</span>
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500
                          font-medium tracking-widest uppercase mt-0.5">
              India · Tax Tool
            </p>
          </div>
        </div>

        {/* ── Right Actions ────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Digital Heroes CTA */}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            id="digital-heroes-btn"
            className="btn-press inline-flex items-center gap-1.5
                       px-3 sm:px-4 py-2 rounded-4xl
                       text-xs sm:text-sm font-semibold
                       bg-gradient-to-r from-blue-600 to-violet-600
                       hover:from-blue-500 hover:to-violet-500
                       text-white shadow-md shadow-blue-500/20
                       hover:shadow-blue-500/35 transition-all duration-200
                       whitespace-nowrap"
            aria-label="Built for Digital Heroes — visit digitalheroesco.com"
          >
            <span className="hidden sm:inline">Built for</span>
            <span className="font-bold">Digital Heroes</span>
            <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
          </a>

          {/* Dark-mode toggle */}
          <button
            onClick={toggleDark}
            id="dark-mode-toggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="btn-press w-9 h-9 rounded-xl flex items-center justify-center
                       bg-slate-100 dark:bg-slate-800
                       hover:bg-slate-200 dark:hover:bg-slate-700
                       border border-slate-200 dark:border-slate-700
                       transition-all duration-200 shrink-0"
          >
            {isDark
              ? <Sun  className="w-4 h-4 text-amber-400" strokeWidth={2} />
              : <Moon className="w-4 h-4 text-slate-600" strokeWidth={2} />
            }
          </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
