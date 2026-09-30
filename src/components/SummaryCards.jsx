import React from 'react';
import { Layers, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function SummaryCards({ summary, currentStatusFilter, onStatusFilterChange }) {
  const cards = [
    {
      id: 'All',
      title: 'Total Scholarships',
      count: summary.total,
      icon: Layers,
      colorClass: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-800',
      activeBorder: 'ring-2 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30',
      description: 'All recorded programs',
    },
    {
      id: 'Published',
      title: 'Published',
      count: summary.published,
      icon: CheckCircle2,
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-800',
      activeBorder: 'ring-2 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30',
      description: 'Visible to students',
    },
    {
      id: 'Draft',
      title: 'Draft',
      count: summary.draft,
      icon: Clock,
      colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-800',
      activeBorder: 'ring-2 ring-amber-500 bg-amber-50/50 dark:bg-amber-950/30',
      description: 'Under review or pending',
    },
    {
      id: 'Expired',
      title: 'Expired',
      count: summary.expired,
      icon: AlertCircle,
      colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-100 dark:border-rose-800',
      activeBorder: 'ring-2 ring-rose-500 bg-rose-50/50 dark:bg-rose-950/30',
      description: 'Past deadline',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = currentStatusFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onStatusFilterChange(card.id)}
            className={`text-left p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-150 cursor-pointer ${
              isSelected ? card.activeBorder : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</span>
              <div className={`p-2 rounded-xl border ${card.colorClass}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {card.count}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                {card.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
