import React from 'react';
import { Layers, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function SummaryCards({ summary, currentStatusFilter, onStatusFilterChange }) {
  const cards = [
    {
      id: 'All',
      title: 'Total Scholarships',
      count: summary.total,
      icon: Layers,
      textColor: 'text-indigo-600 dark:text-indigo-400',
      activeRing: 'ring-2 ring-indigo-500/60',
      description: 'All recorded programs',
    },
    {
      id: 'Published',
      title: 'Published',
      count: summary.published,
      icon: CheckCircle2,
      textColor: 'text-emerald-600 dark:text-emerald-400',
      activeRing: 'ring-2 ring-emerald-500/60',
      description: 'Visible to students',
    },
    {
      id: 'Draft',
      title: 'Draft',
      count: summary.draft,
      icon: Clock,
      textColor: 'text-amber-600 dark:text-amber-400',
      activeRing: 'ring-2 ring-amber-500/60',
      description: 'Under review or pending',
    },
    {
      id: 'Expired',
      title: 'Expired',
      count: summary.expired,
      icon: AlertCircle,
      textColor: 'text-rose-600 dark:text-rose-400',
      activeRing: 'ring-2 ring-rose-500/60',
      description: 'Past deadline',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-7">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = currentStatusFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onStatusFilterChange(card.id)}
            className={`text-left p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-200 ${
              isSelected
                ? `neu-inset ${card.activeRing}`
                : 'neu-flat hover:-translate-y-1'
            }`}
          >
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">{card.title}</span>
              <div className={`p-2.5 rounded-2xl ${isSelected ? 'neu-flat-sm' : 'neu-inset-sm'} ${card.textColor}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {card.count}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                {card.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
