import React from 'react';
import { Layers, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function SummaryCards({ summary, currentStatusFilter, onStatusFilterChange }) {
  const cards = [
    {
      id: 'All',
      title: 'Total Scholarships',
      count: summary.total,
      icon: Layers,
      colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      activeBorder: 'ring-2 ring-indigo-500 bg-indigo-50/50',
      description: 'All recorded programs',
    },
    {
      id: 'Published',
      title: 'Published',
      count: summary.published,
      icon: CheckCircle2,
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      activeBorder: 'ring-2 ring-emerald-500 bg-emerald-50/50',
      description: 'Visible to students',
    },
    {
      id: 'Draft',
      title: 'Draft',
      count: summary.draft,
      icon: Clock,
      colorClass: 'text-amber-600 bg-amber-50 border-amber-100',
      activeBorder: 'ring-2 ring-amber-500 bg-amber-50/50',
      description: 'Under review or pending',
    },
    {
      id: 'Expired',
      title: 'Expired',
      count: summary.expired,
      icon: AlertCircle,
      colorClass: 'text-rose-600 bg-rose-50 border-rose-100',
      activeBorder: 'ring-2 ring-rose-500 bg-rose-50/50',
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
            className={`text-left p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-150 cursor-pointer ${
              isSelected ? card.activeBorder : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-medium text-slate-500">{card.title}</span>
              <div className={`p-2 rounded-xl border ${card.colorClass}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.count}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {card.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
