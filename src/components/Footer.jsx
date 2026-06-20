// src/components/Footer.jsx
// Site footer — author info, Digital Heroes CTA, copyright

import React from 'react';
import { Mail, Heart, ExternalLink, Calculator } from 'lucide-react';

/** Author info — update email when ready */
const AUTHOR = {
  name:  'Harsh Agarwal',
  email: 'harshaggarwal145@gmail.com',
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto
                       border-t border-slate-200/80 dark:border-white/5
                       bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl">

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 flex flex-col items-center">

        {/* ── Three-column grid ───────────────────────────── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 text-center">

          {/* Col 1 — Brand */}
          <div className="flex flex-col items-center sm:items-start gap-3 justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600
                              flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white">
                GST<span className="gradient-text">Calc</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              A free, fast, and accurate GST calculator for Indian businesses
              and individuals. Supports all official GST slabs.
            </p>
          </div>

          {/* Col 2 — Creator */}
          <div className="flex flex-col items-center gap-3 justify-center">
            <h3 className="text-xs font-semibold uppercase tracking-widest
                           text-slate-400 dark:text-slate-500">
              Creator
            </h3>
            <p id="author-name"
               className="font-display font-bold text-xl
                          text-slate-900 dark:text-white">
              {AUTHOR.name}
            </p>
            <a
              href={`mailto:${AUTHOR.email}`}
              id="author-email"
              className="inline-flex items-center gap-2 text-sm
                         text-blue-600 dark:text-blue-400
                         hover:text-violet-600 dark:hover:text-violet-400
                         transition-colors duration-200 group w-fit"
            >
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
              <span>{AUTHOR.email}</span>
            </a>
            <p className="text-xs text-slate-400 dark:text-slate-600 italic">
              
            </p>
          </div>

          {/* Col 3 — Digital Heroes */}
          <div className="flex flex-col items-center sm:items-end gap-3 justify-end self-end sm:self-end">
            <h3 className="text-xs font-semibold uppercase tracking-widest
                           text-slate-400 dark:text-slate-500">
              Partner
            </h3>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              id="digital-heroes-footer-btn"
              className="btn-press group inline-flex items-center gap-2 w-fit
                         px-4 py-2.5 rounded-xl font-semibold text-sm
                         bg-gradient-to-r from-blue-600 to-violet-600
                         hover:from-blue-500 hover:to-violet-500
                         text-white shadow-md shadow-blue-500/20
                         hover:shadow-blue-500/35 transition-all duration-200"
            >
              Built for Digital Heroes
              <ExternalLink className="w-3.5 h-3.5
                                       group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                                       transition-transform shrink-0" />
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-right">
              Empowering digital businesses across India.
            </p>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-5" />

        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center
                        gap-3 text-xs text-slate-400 dark:text-slate-600 flex-wrap">
          <p>
            © {year}{' '}
            <span className="font-semibold text-slate-600 dark:text-slate-400">
              {AUTHOR.name}
            </span>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 justify-center">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline" /> in India
          </p>
          <p>
            Rates per{' '}
            <span className="font-medium text-slate-500 dark:text-slate-500">
              GoI / CBIC guidelines
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
