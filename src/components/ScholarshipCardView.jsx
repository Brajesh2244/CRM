import React from 'react';
import { Eye, Edit3, Trash2, Calendar, MapPin, BookOpen, AlertCircle, Award } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ScholarshipCardView({
  scholarships,
  onStatusChange,
  onPreview,
  onEdit,
  onDelete,
}) {
  const getStateBadge = (state) => {
    switch (state) {
      case 'Bihar':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Haryana':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Jharkhand':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  if (scholarships.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-xs transition-colors duration-200">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">No scholarships found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Try adjusting your State or Status filters, or click "Clear" to see all scholarships.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scholarships.map((sch) => (
        <div
          key={sch.id}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            {/* Header: State & Status */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border ${getStateBadge(sch.state)}`}>
                <MapPin className="w-3 h-3 opacity-70" />
                <span>{sch.state}</span>
              </span>

              <StatusBadge
                status={sch.status}
                onChangeStatus={(newStatus) => onStatusChange(sch.id, newStatus)}
              />
            </div>

            {/* Title & Provider */}
            <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {sch.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
              {sch.provider || 'State Education Dept.'}
            </p>

            {/* Benefit chip if available */}
            {sch.amountOrBenefit && (
              <div className="flex items-center gap-1.5 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100/70 dark:border-emerald-850 text-xs text-emerald-800 dark:text-emerald-300 font-medium mb-3">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="line-clamp-1">{sch.amountOrBenefit}</span>
              </div>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{sch.applicableClass}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{sch.deadline}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onPreview(sch)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Student Preview</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(sch)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${sch.name}"?`)) {
                    onDelete(sch.id);
                  }
                }}
                className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
