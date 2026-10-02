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
        return 'text-blue-700 dark:text-blue-300 border-blue-300/50 dark:border-blue-700/50';
      case 'Haryana':
        return 'text-purple-700 dark:text-purple-300 border-purple-300/50 dark:border-purple-700/50';
      case 'Jharkhand':
        return 'text-teal-700 dark:text-teal-300 border-teal-300/50 dark:border-teal-700/50';
      default:
        return 'text-slate-700 dark:text-slate-300 border-slate-300/50 dark:border-slate-700/50';
    }
  };

  if (scholarships.length === 0) {
    return (
      <div className="neu-flat rounded-3xl p-12 text-center transition-all">
        <div className="w-14 h-14 rounded-2xl neu-inset-sm flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No scholarships found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Try adjusting your State or Status filters, or click "Clear" to see all scholarships.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {scholarships.map((sch) => (
        <div
          key={sch.id}
          className="neu-flat rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
        >
          <div>
            {/* Header: State & Status */}
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <span className={`neu-flat-sm inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStateBadge(sch.state)}`}>
                <MapPin className="w-3 h-3 opacity-70" />
                <span>{sch.state}</span>
              </span>

              <StatusBadge
                status={sch.status}
                onChangeStatus={(newStatus) => onStatusChange(sch.id, newStatus)}
              />
            </div>

            {/* Title & Provider */}
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug mb-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {sch.name}
            </h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
              {sch.provider || 'State Education Dept.'}
            </p>

            {/* Benefit chip if available */}
            {sch.amountOrBenefit && (
              <div className="flex items-center gap-2 p-2.5 neu-inset-sm rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 font-bold mb-4">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="line-clamp-1">{sch.amountOrBenefit}</span>
              </div>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 neu-inset-sm px-3 py-1.5 rounded-xl font-medium">
                <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{sch.applicableClass}</span>
              </div>
              <div className="flex items-center gap-1.5 neu-inset-sm px-3 py-1.5 rounded-xl font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{sch.deadline}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onPreview(sch)}
              className="neu-btn inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 rounded-xl cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Student Preview</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(sch)}
                className="neu-btn p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl cursor-pointer"
                title="Edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete "${sch.name}"?`)) {
                    onDelete(sch.id);
                  }
                }}
                className="neu-btn p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
