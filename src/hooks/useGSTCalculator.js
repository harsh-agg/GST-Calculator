// src/hooks/useGSTCalculator.js
// Core GST calculation logic encapsulated in a custom hook

import { useState, useCallback, useMemo } from 'react';

/** Supported GST slab rates in India (%) */
export const GST_RATES = [3, 5, 12, 18, 28];

/**
 * Rounds a number to 2 decimal places.
 * @param {number} value
 * @returns {number}
 */
const round2 = (value) => Math.round(value * 100) / 100;

/**
 * Formats a number as Indian currency string (₹).
 * @param {number} value
 * @returns {string}
 */
export const formatINR = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

/**
 * Validates the user-supplied amount string.
 * Returns an error message string or null if valid.
 * @param {string} raw
 * @returns {string|null}
 */
const validateAmount = (raw) => {
  if (raw === '' || raw === null || raw === undefined) return null; // empty = no error yet
  const num = parseFloat(raw);
  if (isNaN(num)) return 'Please enter a valid number.';
  if (num < 0)    return 'Amount cannot be negative.';
  if (num > 1e12) return 'Amount is too large (max ₹1 trillion).';
  return null;
};

/**
 * useGSTCalculator — manages all form state, validation, and result computation.
 */
export function useGSTCalculator() {
  const [amount, setAmount]   = useState('');
  const [gstRate, setGstRate] = useState(18);
  const [copied, setCopied]   = useState(false);

  // Derived validation error
  const error = useMemo(() => validateAmount(amount), [amount]);

  // All computed results (memoised — recalculates only when amount or rate changes)
  const results = useMemo(() => {
    const num = parseFloat(amount);
    if (!amount || isNaN(num) || num < 0) return null;

    const rate    = gstRate / 100;

    // ── Forward GST (amount is pre-tax base) ──────────────────
    const gstAmount        = round2(num * rate);
    const totalWithGST     = round2(num + gstAmount);

    // ── Reverse GST (amount already includes GST) ─────────────
    // Formula: original = total / (1 + rate)
    const originalExclGST  = round2(num / (1 + rate));
    const reverseGSTAmount = round2(num - originalExclGST);

    // ── CGST & SGST split (each = GST/2, applicable for intra-state) ──
    const cgst = round2(gstAmount / 2);
    const sgst = round2(gstAmount / 2);

    return {
      gstAmount,
      totalWithGST,
      originalExclGST,
      reverseGSTAmount,
      cgst,
      sgst,
    };
  }, [amount, gstRate]);

  /** Handles numeric input changes with basic sanitisation */
  const handleAmountChange = useCallback((e) => {
    // Allow digits, one decimal point, nothing else
    const val = e.target.value.replace(/[^0-9.]/g, '');
    // Prevent multiple dots
    const parts = val.split('.');
    if (parts.length > 2) return;
    setAmount(val);
  }, []);

  /** Resets all fields to initial state */
  const handleReset = useCallback(() => {
    setAmount('');
    setGstRate(18);
    setCopied(false);
  }, []);

  /** Copies a formatted results summary to the clipboard */
  const handleCopy = useCallback(async () => {
    if (!results) return;
    const text = [
      `GST Calculator Results`,
      `──────────────────────────`,
      `Original Amount     : ${formatINR(parseFloat(amount))}`,
      `GST Rate            : ${gstRate}%`,
      `GST Amount          : ${formatINR(results.gstAmount)}`,
      `  ├─ CGST (${gstRate / 2}%)   : ${formatINR(results.cgst)}`,
      `  └─ SGST (${gstRate / 2}%)   : ${formatINR(results.sgst)}`,
      `Total (incl. GST)   : ${formatINR(results.totalWithGST)}`,
      `──────────────────────────`,
      `Reverse GST (excl.) : ${formatINR(results.originalExclGST)}`,
      `GST Component       : ${formatINR(results.reverseGSTAmount)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers / HTTP
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [results, amount, gstRate]);

  return {
    amount,
    gstRate,
    error,
    results,
    copied,
    setGstRate,
    handleAmountChange,
    handleReset,
    handleCopy,
  };
}
