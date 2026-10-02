import React from 'react';
import { GraduationCap, ExternalLink, RotateCcw, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function Header({ onResetData, theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-30 transition-all duration-200 bg-[#ebf0f7]/90 dark:bg-[#111625]/90 backdrop-blur-md border-b border-white/50 dark:border-white/5 shadow-[0_4px_16px_rgba(202,213,226,0.4)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-[4px_4px_10px_#cad5e2,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#080b13,-4px_-4px_10px_#1b233a]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-800 dark:text-white tracking-tight">K12 Hunar</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full neu-inset-sm text-indigo-700 dark:text-indigo-400">
                  CRM Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Scholarship Management & Student Application Dashboard
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tactile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="neu-btn inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Tactile Reset Sample Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all records back to the 9 original sample scholarships?')) {
                  onResetData();
                }
              }}
              title="Reset to 9 sample test records"
              className="neu-btn inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden md:inline">Reset Data</span>
            </button>

            {/* Live Website Link */}
            <a
              href="https://www.k12hunar.com/scholarships"
              target="_blank"
              rel="noreferrer"
              className="neu-btn inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 rounded-xl"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-300 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin Demo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
