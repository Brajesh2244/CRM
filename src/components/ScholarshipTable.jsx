import React from 'react';
import { Eye, Edit3, Trash2, Calendar, MapPin, BookOpen, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ScholarshipTable({
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th scope="col" className="py-3.5 px-4 sm:px-6">Scholarship</th>
              <th scope="col" className="py-3.5 px-4">State</th>
              <th scope="col" className="py-3.5 px-4">Class</th>
              <th scope="col" className="py-3.5 px-4">Deadline</th>
              <th scope="col" className="py-3.5 px-4">Status</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {scholarships.map((sch) => (
              <tr
                key={sch.id}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group"
              >
                {/* Scholarship Name & Provider */}
                <td className="py-4 px-4 sm:px-6 align-top">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block">
                      {sch.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {sch.provider || 'State Education Dept.'}
                    </span>
                    {sch.amountOrBenefit && (
                      <span className="inline-block mt-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800">
                        {sch.amountOrBenefit}
                      </span>
                    )}
                  </div>
                </td>

                {/* State */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${getStateBadge(sch.state)}`}>
                    <MapPin className="w-3 h-3 opacity-70" />
                    <span>{sch.state}</span>
                  </span>
                </td>

                {/* Class */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-transparent dark:border-slate-700">
                    <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <span>{sch.applicableClass}</span>
                  </span>
                </td>

                {/* Deadline */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className={sch.deadline === 'Not stated' ? 'text-slate-400 italic' : 'text-slate-700 dark:text-slate-300 font-medium'}>
                      {sch.deadline}
                    </span>
                  </div>
                </td>

                {/* Status (Inline Selector) */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <StatusBadge
                    status={sch.status}
                    onChangeStatus={(newStatus) => onStatusChange(sch.id, newStatus)}
                  />
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    {/* Student Preview button */}
                    <button
                      onClick={() => onPreview(sch)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors cursor-pointer border border-indigo-100 dark:border-indigo-800"
                      title="Preview how scholarship card appears to students"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => onEdit(sch)}
                      className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Scholarship Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to remove "${sch.name}"?`)) {
                          onDelete(sch.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
