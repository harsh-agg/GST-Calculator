// src/App.jsx
// Root component — composes Header, calculator card, results, and Footer

import React from 'react';
import { Sparkles, BarChart2 } from 'lucide-react';

import Header          from './components/Header';
import Footer          from './components/Footer';
import AmountInput     from './components/AmountInput';
import GSTRateSelector from './components/GSTRateSelector';
import ResultsPanel    from './components/ResultsPanel';
import InfoBanner      from './components/InfoBanner';

import { useDarkMode }      from './hooks/useDarkMode';
import { useGSTCalculator } from './hooks/useGSTCalculator';

const App = () => {
  const [isDark, toggleDark] = useDarkMode();

  const {
    amount, gstRate, error, results, copied,
    setGstRate, handleAmountChange, handleReset, handleCopy,
  } = useGSTCalculator();

  return (
    <div className={`min-h-screen w-full flex flex-col items-center theme-transition
                     ${isDark ? 'animated-bg' : 'animated-bg-light'}`}>

      {/* ── Header ────────────────────────────────────────────── */}
      <Header isDark={isDark} toggleDark={toggleDark} />

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">

          {/* ── Hero ─────────────────────────────────────────── */}
          <div className="text-center mb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
                            bg-white/70 dark:bg-slate-800/70
                            border border-slate-200/60 dark:border-slate-700/60
                            shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" strokeWidth={2} />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300
                               uppercase tracking-widest">
                Real-time · Free · Accurate
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl
                           text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
              India <span className="gradient-text">GST Calculator</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400
                          max-w-2xl mx-auto leading-relaxed">
              Calculate GST instantly. Supports all official slabs —{' '}
              <strong className="font-semibold text-slate-700 dark:text-slate-300">
                3%, 5%, 12%, 18% &amp; 28%
              </strong>
              . Forward &amp; reverse GST included.
            </p>
          </div>

          {/* ── Calculator Grid ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* LEFT — Input Card (4 cols) */}
            <div className="lg:col-span-4 scale-in">
              <div className="rounded-2xl p-6
                              bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl
                              border border-slate-200/80 dark:border-slate-700/60
                              shadow-xl shadow-slate-900/8 dark:shadow-slate-900/40
                              flex flex-col gap-6">

                {/* Card header */}
                <div className="flex items-center gap-3 pb-4
                                border-b border-slate-100 dark:border-slate-700/50">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600
                                  flex items-center justify-center shadow-md shadow-blue-500/25
                                  shrink-0">
                    <BarChart2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-900 dark:text-white text-base leading-none">
                      Calculator
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Enter values below
                    </p>
                  </div>
                </div>

                {/* Inputs */}
                <AmountInput amount={amount} error={error} onChange={handleAmountChange} />
                <GSTRateSelector gstRate={gstRate} setGstRate={setGstRate} />

                {/* Summary pill */}
                {amount && !error && (
                  <div className="slide-in-up rounded-xl p-3
                                  bg-gradient-to-r from-blue-50 to-violet-50
                                  dark:from-blue-900/20 dark:to-violet-900/20
                                  border border-blue-100 dark:border-blue-800/30">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Computing{' '}
                      <strong className="text-blue-600 dark:text-blue-400">{gstRate}% GST</strong>
                      {' '}on{' '}
                      <strong className="text-slate-700 dark:text-slate-300">₹{amount}</strong>
                    </p>
                  </div>
                )}

                {/* Empty state */}
                {!amount && (
                  <div className="rounded-xl p-4 border-2 border-dashed
                                  border-slate-200 dark:border-slate-700
                                  text-center text-sm text-slate-400 dark:text-slate-500">
                    Enter an amount to see results
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Results (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">

              {results && !error ? (
                <div className="rounded-2xl p-6
                                bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl
                                border border-slate-200/80 dark:border-slate-700/60
                                shadow-xl shadow-slate-900/8 dark:shadow-slate-900/40">
                  <ResultsPanel
                    results={results}
                    amount={amount}
                    gstRate={gstRate}
                    copied={copied}
                    onCopy={handleCopy}
                    onReset={handleReset}
                  />
                </div>
              ) : (
                /* Empty state */
                <div className="rounded-2xl p-10
                                bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl
                                border-2 border-dashed border-slate-200 dark:border-slate-700
                                flex flex-col items-center justify-center gap-4 min-h-72 text-center">
                  <div className="float-anim w-16 h-16 rounded-2xl
                                  bg-gradient-to-br from-blue-100 to-violet-100
                                  dark:from-blue-900/30 dark:to-violet-900/30
                                  flex items-center justify-center shadow-lg">
                    <BarChart2 className="w-8 h-8 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-700 dark:text-slate-300 text-xl">
                      Results will appear here
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Enter an amount and select a GST rate
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {[0, 200, 400].map((d, i) => (
                      <span key={i}
                        className="w-2 h-2 rounded-full bg-blue-400/50 animate-pulse"
                        style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Info banner */}
              <InfoBanner />
            </div>
          </div>

          {/* ── Stats Strip ──────────────────────────────────── */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '5',    label: 'GST Slabs'    },
              { value: '2',    label: 'Calc Types'   },
              { value: '100%', label: 'Free Forever' },
              { value: '0ms',  label: 'Real-time'    },
            ].map(({ value, label }) => (
              <div key={label}
                className="rounded-2xl p-4 text-center
                           bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm
                           border border-white/60 dark:border-slate-700/40
                           hover:scale-[1.03] transition-transform duration-200">
                <p className="font-display font-black text-2xl gradient-text">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
};

export default App;
