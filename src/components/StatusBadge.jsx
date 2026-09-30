import React from 'react';
import { ChevronDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status, onChangeStatus, interactive = true }) {
  const getBadgeConfig = (st) => {
    switch (st) {
      case 'Published':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
        };
      case 'Draft':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
          dot: 'bg-amber-500',
          icon: Clock,
        };
      case 'Expired':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
          dot: 'bg-rose-500',
          icon: AlertCircle,
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          icon: Clock,
        };
    }
  };

  const config = getBadgeConfig(status);

  if (!interactive) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        <span>{status}</span>
      </span>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <select
        value={status}
        onChange={(e) => onChangeStatus(e.target.value)}
        className={`appearance-none pl-2.5 pr-6 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 ${config.bg}`}
        title="Click to change status"
      >
        <option value="Published">Published</option>
        <option value="Draft">Draft</option>
        <option value="Expired">Expired</option>
      </select>
      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
    </div>
  );
}
