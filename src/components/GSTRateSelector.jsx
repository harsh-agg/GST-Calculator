// src/components/GSTRateSelector.jsx
// GST rate selector rendered as pill/chip buttons for quick selection

import React from 'react';
import { GST_RATES } from '../hooks/useGSTCalculator';

/**
 * GSTRateSelector
 * @param {{ gstRate: number, setGstRate: (r: number) => void }} props
 */
const GSTRateSelector = ({ gstRate, setGstRate }) => {
  return (
    <div className="flex flex-col gap-10">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <span className="w-5 h-5 rounded-md bg-violet-100 dark:bg-violet-900/40
                         flex items-center justify-center text-xs">%</span>
        GST Rate
      </label>

      {/* Pill buttons */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="GST rate selector">
        {GST_RATES.map((rate) => {
          const isActive = gstRate === rate;
          return (
            <button
              key={rate}
              onClick={() => setGstRate(rate)}
              id={`gst-rate-${rate}`}
              aria-pressed={isActive}
              className={[
                'btn-press px-4 py-2 rounded-xl text-sm font-semibold',
                'transition-all duration-200 hover:scale-[1.04]',
                'border focus:outline-none focus:ring-2 focus:ring-blue-400/50',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-transparent shadow-md shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400',
              ].join(' ')}
            >
              {rate}%
            </button>
          );
        })}
      </div>

      {/* Dropdown fallback for accessibility / mobile */}
      <select
        value={gstRate}
        onChange={(e) => setGstRate(Number(e.target.value))}
        id="gst-rate-dropdown"
        aria-label="GST rate dropdown"
        className="mt-1 w-full rounded-xl px-4 py-2.5 text-sm font-medium
                   bg-white dark:bg-slate-800
                   text-slate-700 dark:text-slate-200
                   border border-slate-200 dark:border-slate-700
                   input-focus-ring transition-all duration-200
                   cursor-pointer sm:hidden"
      >
        {GST_RATES.map((rate) => (
          <option key={rate} value={rate}>
            {rate}% GST
          </option>
        ))}
      </select>
    </div>
  );
};

export default GSTRateSelector;
