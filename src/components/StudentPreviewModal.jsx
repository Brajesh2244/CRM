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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="neu-flat rounded-3xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Banner: Portal Context */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-6 py-4.5 text-white flex items-center justify-between shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold tracking-wide uppercase text-indigo-100">
              Student Portal View • k12hunar.com/scholarships
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Facing Card Body */}
        <div className="p-6 sm:p-7">
          {/* Status warning if draft or expired */}
          {isDraft && (
            <div className="mb-4 neu-inset-sm p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Draft Mode:</strong> This scholarship is currently under review by the K12 Hunar team and is hidden from public applicants.
              </span>
            </div>
          )}

          {isExpired && (
            <div className="mb-4 neu-inset-sm p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Deadline Passed:</strong> Applications for this scholarship cycle are closed.
              </span>
            </div>
          )}

          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            <span className="neu-flat-sm inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <MapPin className="w-3 h-3" />
              {scholarship.state}
            </span>
            <span className="neu-inset-sm inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-3 h-3" />
              {scholarship.applicableClass}
            </span>
            <span
              className={`neu-flat-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isExpired
                  ? 'text-rose-700 dark:text-rose-300 border border-rose-300/40'
                  : isDraft
                  ? 'text-amber-700 dark:text-amber-300 border border-amber-300/40'
                  : 'text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isExpired ? 'bg-rose-500' : isDraft ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              {scholarship.status}
            </span>
          </div>

          {/* Scholarship Title & Provider */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug mb-1">
            {scholarship.name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Offered by: <strong>{scholarship.provider || 'State Government'}</strong></span>
          </div>

          {/* Highlight Benefit Box */}
          <div className="neu-flat-sm rounded-2xl p-4.5 border border-emerald-200/50 dark:border-emerald-800/40 mb-5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Scholarship Benefit</span>
            </div>
            <p className="text-base font-extrabold text-emerald-950 dark:text-emerald-200">
              {scholarship.amountOrBenefit || 'Financial assistance & fee reimbursement'}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div className="mb-5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Who Can Apply (Eligibility)</span>
            </h4>
            <div className="neu-inset-sm p-4 rounded-2xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {scholarship.eligibilityCriteria || 'Students domiciled in state meeting academic and family income conditions.'}
            </div>
          </div>

          {/* Deadline Meta */}
          <div className="flex items-center justify-between p-3.5 neu-inset-sm rounded-2xl mb-6 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
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
                className={`w-full neu-btn-primary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm text-white transition-all ${
                  isExpired
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                <span>{isExpired ? 'Portal Closed (View Archival Details)' : 'Apply on Official Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                disabled
                className="w-full neu-inset-sm inline-flex items-center justify-center px-5 py-3 rounded-2xl font-bold text-sm text-slate-400 cursor-not-allowed"
              >
                Official link not available
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto neu-btn px-5 py-3 rounded-2xl font-semibold text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
