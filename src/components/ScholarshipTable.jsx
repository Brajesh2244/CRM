import React from 'react';
import { Eye, Edit3, Trash2, Calendar, MapPin, BookOpen, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ScholarshipTable({
  scholarships,
  onStatusChange,
  onPreview,
  onEdit,
  onDeleteRequest,
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
    <div className="neu-flat rounded-3xl overflow-hidden transition-all duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300/50 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-black/[0.02] dark:bg-white/[0.02]">
              <th scope="col" className="py-4 px-5 sm:px-6">Scholarship</th>
              <th scope="col" className="py-4 px-4">State</th>
              <th scope="col" className="py-4 px-4">Class</th>
              <th scope="col" className="py-4 px-4">Deadline</th>
              <th scope="col" className="py-4 px-4">Status</th>
              <th scope="col" className="py-4 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300/40 dark:divide-slate-800/60 text-sm">
            {scholarships.map((sch) => (
              <tr
                key={sch.id}
                className="hover:bg-white/40 dark:hover:bg-white/[0.03] transition-colors group"
              >
                {/* Scholarship Name & Provider */}
                <td className="py-4 px-5 sm:px-6 align-top">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block text-sm sm:text-base">
                      {sch.name}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {sch.provider || 'State Education Dept.'}
                    </span>
                    {sch.amountOrBenefit && (
                      <span className="inline-block mt-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 neu-inset-sm px-2.5 py-0.5 rounded-lg">
                        {sch.amountOrBenefit}
                      </span>
                    )}
                  </div>
                </td>

                {/* State */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className={`neu-flat-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStateBadge(sch.state)}`}>
                    <MapPin className="w-3 h-3 opacity-70" />
                    <span>{sch.state}</span>
                  </span>
                </td>

                {/* Class */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <span className="neu-inset-sm inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-1 rounded-xl">
                    <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <span>{sch.applicableClass}</span>
                  </span>
                </td>

                {/* Deadline */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className={sch.deadline === 'Not stated' ? 'text-slate-400 italic' : 'text-slate-700 dark:text-slate-300 font-semibold'}>
                      {sch.deadline}
                    </span>
                  </div>
                </td>

                {/* Status (Tactile Inline Selector) */}
                <td className="py-4 px-4 align-top whitespace-nowrap">
                  <StatusBadge
                    status={sch.status}
                    onChangeStatus={(newStatus) => onStatusChange(sch.id, newStatus)}
                  />
                </td>

                {/* Actions */}
                <td className="py-4 px-5 sm:px-6 align-top text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    {/* Student Preview Tactile button */}
                    <button
                      onClick={() => onPreview(sch)}
                      className="neu-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 rounded-xl cursor-pointer"
                      title="Preview how scholarship card appears to students"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => onEdit(sch)}
                      className="neu-btn p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl cursor-pointer"
                      title="Edit Scholarship Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => onDeleteRequest(sch)}
                      className="neu-btn p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
