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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Haryana':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Jharkhand':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (scholarships.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">No scholarships found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
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
          className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
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
            <h4 className="font-bold text-slate-900 text-base leading-snug mb-1 hover:text-indigo-600 transition-colors">
              {sch.name}
            </h4>
            <p className="text-xs text-slate-500 mb-3 line-clamp-1">
              {sch.provider || 'State Education Dept.'}
            </p>

            {/* Benefit chip if available */}
            {sch.amountOrBenefit && (
              <div className="flex items-center gap-1.5 p-2 bg-emerald-50 rounded-xl border border-emerald-100/70 text-xs text-emerald-800 font-medium mb-3">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{sch.amountOrBenefit}</span>
              </div>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-slate-600">
              <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>{sch.applicableClass}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{sch.deadline}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onPreview(sch)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer border border-indigo-100"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Student Preview</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(sch)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
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
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
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
