import React from 'react';
import { ChevronDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status, onChangeStatus, interactive = true }) {
  const getBadgeConfig = (st) => {
    switch (st) {
      case 'Published':
        return {
          textColor: 'text-emerald-700 dark:text-emerald-300',
          dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]',
          icon: CheckCircle2,
          border: 'border-emerald-300/60 dark:border-emerald-700/60',
        };
      case 'Draft':
        return {
          textColor: 'text-amber-700 dark:text-amber-300',
          dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]',
          icon: Clock,
          border: 'border-amber-300/60 dark:border-amber-700/60',
        };
      case 'Expired':
        return {
          textColor: 'text-rose-700 dark:text-rose-300',
          dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]',
          icon: AlertCircle,
          border: 'border-rose-300/60 dark:border-rose-700/60',
        };
      default:
        return {
          textColor: 'text-slate-700 dark:text-slate-300',
          dot: 'bg-slate-400',
          icon: Clock,
          border: 'border-slate-300/60 dark:border-slate-700/60',
        };
    }
  };

  const config = getBadgeConfig(status);

  if (!interactive) {
    return (
      <span className={`neu-flat-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.textColor} border ${config.border}`}>
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <span>{status}</span>
      </span>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <select
        value={status}
        onChange={(e) => onChangeStatus(e.target.value)}
        className={`neu-btn appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${config.textColor} border ${config.border}`}
        title="Click to toggle status"
      >
        <option value="Published" className="bg-[#ebf0f7] dark:bg-[#111625] text-slate-900 dark:text-white font-semibold">Published</option>
        <option value="Draft" className="bg-[#ebf0f7] dark:bg-[#111625] text-slate-900 dark:text-white font-semibold">Draft</option>
        <option value="Expired" className="bg-[#ebf0f7] dark:bg-[#111625] text-slate-900 dark:text-white font-semibold">Expired</option>
      </select>
      <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70 text-current" />
    </div>
  );
}
