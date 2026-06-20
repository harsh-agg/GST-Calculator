// src/components/ResultsPanel.jsx
// Renders all GST computation results and action buttons (copy, reset)

import React from 'react';
import {
  TrendingUp,
  IndianRupee,
  ArrowUpDown,
  Copy,
  Check,
  RotateCcw,
  Percent,
} from 'lucide-react';

import ResultCard from './ResultCard';
import { formatINR } from '../hooks/useGSTCalculator';

/**
 * ResultsPanel
 * @param {{
 *   results: object|null,
 *   amount:  string,
 *   gstRate: number,
 *   copied:  boolean,
 *   onCopy:  () => void,
 *   onReset: () => void,
 * }} props
 */
const ResultsPanel = ({ results, amount, gstRate, copied, onCopy, onReset }) => {
  if (!results) return null;

  const baseAmount = parseFloat(amount);

  /** Card definitions */
  const forwardCards = [
    {
      id:          'gst-amount-card',
      label:       'GST Amount',
      value:       formatINR(results.gstAmount),
      subLabel:    `CGST ${gstRate / 2}% + SGST ${gstRate / 2}%`,
      subValue:    `${formatINR(results.cgst)} + ${formatINR(results.sgst)}`,
      icon:        <Percent className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />,
      accentClass: 'bg-blue-500',
      glowClass:   'result-glow',
      delay:       0,
    },
    {
      id:          'total-with-gst-card',
      label:       'Total (incl. GST)',
      value:       formatINR(results.totalWithGST),
      subLabel:    `Base ${formatINR(baseAmount)} + Tax ${formatINR(results.gstAmount)}`,
      subValue:    null,
      icon:        <TrendingUp className="w-4 h-4 text-violet-600 dark:text-violet-400" strokeWidth={2.5} />,
      accentClass: 'bg-violet-500',
      glowClass:   'result-glow-purple',
      delay:       80,
    },
  ];

  const reverseCards = [
    {
      id:          'original-excl-gst-card',
      label:       'Original (excl. GST)',
      value:       formatINR(results.originalExclGST),
      subLabel:    `Reverse GST from ${formatINR(baseAmount)}`,
      subValue:    null,
      icon:        <ArrowUpDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />,
      accentClass: 'bg-emerald-500',
      glowClass:   'result-glow-green',
      delay:       160,
    },
    {
      id:          'gst-component-card',
      label:       'GST Component',
      value:       formatINR(results.reverseGSTAmount),
      subLabel:    `Embedded in ${formatINR(baseAmount)}`,
      subValue:    null,
      icon:        <IndianRupee className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={2.5} />,
      accentClass: 'bg-amber-500',
      glowClass:   '',
      delay:       240,
    },
  ];

  return (
    <div className="flex flex-col gap-6 slide-in-up">

      {/* ── Section: Forward GST ────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3 min-w-0">
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest
                           text-blue-600 dark:text-blue-400">
            Forward GST
          </span>
          <span className="h-px flex-1 min-w-0 bg-gradient-to-r from-blue-500/40 to-transparent" />
          <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
            Adding {gstRate}% to ₹{amount}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {forwardCards.map((card) => (
            <div key={card.id} id={card.id}>
              <ResultCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Reverse GST ────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3 min-w-0">
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest
                           text-emerald-600 dark:text-emerald-400">
            Reverse GST
          </span>
          <span className="h-px flex-1 min-w-0 bg-gradient-to-r from-emerald-500/40 to-transparent" />
          <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
            Removing {gstRate}% from ₹{amount}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reverseCards.map((card) => (
            <div key={card.id} id={card.id}>
              <ResultCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Action buttons ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        {/* Copy results */}
        <button
          onClick={onCopy}
          id="copy-results-btn"
          disabled={copied}
          className={[
            'btn-press flex-1 flex items-center justify-center gap-2',
            'py-3 px-5 rounded-xl text-sm font-semibold',
            'transition-all duration-200 hover:scale-[1.02]',
            copied
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 cursor-default'
              : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40',
          ].join(' ')}
          aria-label="Copy results to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" strokeWidth={2.5} />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" strokeWidth={2} />
              Copy Results
            </>
          )}
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          id="reset-btn"
          className="btn-press flex items-center justify-center gap-2
                     py-3 px-5 rounded-xl text-sm font-semibold
                     bg-slate-100 dark:bg-slate-700
                     text-slate-600 dark:text-slate-300
                     hover:bg-red-50 dark:hover:bg-red-900/20
                     hover:text-red-600 dark:hover:text-red-400
                     border border-slate-200 dark:border-slate-600
                     hover:border-red-200 dark:hover:border-red-800
                     transition-all duration-200 hover:scale-[1.02]"
          aria-label="Reset calculator"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={2} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResultsPanel;
