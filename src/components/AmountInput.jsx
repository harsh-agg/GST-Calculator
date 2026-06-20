// src/components/AmountInput.jsx
// Controlled input for the base amount with validation feedback

import React from 'react';
import { IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * AmountInput
 * @param {{ amount: string, error: string|null, onChange: (e) => void }} props
 */
const AmountInput = ({ amount, error, onChange }) => {
  const hasValue  = amount !== '' && amount !== null;
  const isValid   = hasValue && !error;
  const isInvalid = hasValue && !!error;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="amount-input"
        className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
      >
        <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/40
                         flex items-center justify-center">
          <IndianRupee className="w-3 h-3 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
        </span>
        Enter Amount
      </label>

      {/* Input wrapper */}
      <div className="relative">
        {/* Rupee prefix */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <IndianRupee
            className={[
              'w-4.5 h-4.5 transition-colors duration-200',
              isValid   ? 'text-emerald-500'  : '',
              isInvalid ? 'text-red-400'      : '',
              !hasValue ? 'text-slate-400 dark:text-slate-500' : '',
            ].join(' ')}
            strokeWidth={2}
          />
        </div>

        <input
          id="amount-input"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={onChange}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? 'amount-error' : undefined}
          className={[
            'w-full pl-50 pr-14 py-3.5 rounded-xl text-lg font-semibold',
            'bg-white dark:bg-slate-800',
            'placeholder:text-slate-300 dark:placeholder:text-slate-600',
            'transition-all duration-200',
            'border-2 input-focus-ring',
            'min-w-0',          // prevent flex shrink issues
            isValid
              ? 'border-emerald-400 dark:border-emerald-500/70 text-emerald-700 dark:text-emerald-300'
              : isInvalid
              ? 'border-red-400 dark:border-red-500/70 text-red-600 dark:text-red-400'
              : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100',
          ].join(' ')}
        />

        {/* Status icon */}
        {hasValue && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {isValid ? (
              <CheckCircle2
                className="w-5 h-5 text-emerald-500 scale-in"
                strokeWidth={2}
              />
            ) : (
              <AlertCircle
                className="w-5 h-5 text-red-400 scale-in"
                strokeWidth={2}
              />
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {isInvalid && (
        <p
          id="amount-error"
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400 slide-in-up"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}

      {/* Helper text */}
      {!hasValue && (
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Enter the amount in Indian Rupees (₹)
        </p>
      )}
    </div>
  );
};

export default AmountInput;
