import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, MapPin, BookOpen, Award, CheckCircle, Building, AlertCircle, Sparkles } from 'lucide-react';

export default function StudentPreviewModal({ scholarship, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !scholarship) return null;

  const isExpired = scholarship.status === 'Expired';
  const isDraft = scholarship.status === 'Draft';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150 transition-colors">
        {/* Banner: Portal Context */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-semibold tracking-wide uppercase text-indigo-100">
              Student Portal View • k12hunar.com/scholarships
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Facing Card Body */}
        <div className="p-6">
          {/* Status warning if draft or expired */}
          {isDraft && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Draft Mode:</strong> This scholarship is currently under review by the K12 Hunar team and is hidden from public applicants.
              </span>
            </div>
          )}

          {isExpired && (
            <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Deadline Passed:</strong> Applications for this scholarship cycle are closed.
              </span>
            </div>
          )}

          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
              <MapPin className="w-3 h-3" />
              {scholarship.state}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent dark:border-slate-700">
              <BookOpen className="w-3 h-3" />
              {scholarship.applicableClass}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                isExpired
                  ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                  : isDraft
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isExpired ? 'bg-rose-500' : isDraft ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              {scholarship.status}
            </span>
          </div>

          {/* Scholarship Title & Provider */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-1">
            {scholarship.name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Offered by: <strong>{scholarship.provider || 'State Government'}</strong></span>
          </div>

          {/* Highlight Benefit Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/30 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-850 mb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Scholarship Benefit</span>
            </div>
            <p className="text-base font-extrabold text-emerald-950 dark:text-emerald-100">
              {scholarship.amountOrBenefit || 'Financial assistance & fee reimbursement'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="mb-5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Who Can Apply (Eligibility)</span>
            </h4>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {scholarship.eligibilityCriteria || 'Students domiciled in state meeting academic and family income conditions.'}
            </div>
          </div>

          {/* Deadline Meta */}
          <div className="flex items-center justify-between p-3 bg-slate-100/60 dark:bg-slate-800/60 rounded-xl mb-6 text-xs border border-transparent dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Application Deadline:</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {scholarship.deadline}
            </span>
          </div>

          {/* Student CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {scholarship.officialLink ? (
              <a
                href={scholarship.officialLink}
                target="_blank"
                rel="noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
                  isExpired
                    ? 'bg-slate-400 hover:bg-slate-500 cursor-not-allowed opacity-80'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-100 dark:shadow-none'
                }`}
              >
                <span>{isExpired ? 'Portal Closed (View Archival Details)' : 'Apply on Official Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                disabled
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              >
                Official link not available
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
