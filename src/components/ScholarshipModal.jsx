import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Link as LinkIcon, Calendar, Building, BookOpen, MapPin } from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  state: 'Bihar',
  provider: '',
  applicableClass: 'Class 11-12',
  eligibilityCriteria: '',
  amountOrBenefit: '',
  deadline: '',
  officialLink: '',
  status: 'Published',
};

export default function ScholarshipModal({ isOpen, onClose, onSave, editingScholarship }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingScholarship) {
      setFormData({
        name: editingScholarship.name || '',
        state: editingScholarship.state || 'Bihar',
        provider: editingScholarship.provider || '',
        applicableClass: editingScholarship.applicableClass || 'Class 11-12',
        eligibilityCriteria: editingScholarship.eligibilityCriteria || '',
        amountOrBenefit: editingScholarship.amountOrBenefit || '',
        deadline: editingScholarship.deadline || '',
        officialLink: editingScholarship.officialLink || '',
        status: editingScholarship.status || 'Published',
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});
  }, [editingScholarship, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Scholarship name is required';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters long';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }

    if (!formData.provider.trim()) {
      errs.provider = 'Provider name is required';
    }

    if (!formData.applicableClass.trim()) {
      errs.applicableClass = 'Applicable class is required';
    }

    if (formData.officialLink.trim()) {
      try {
        const url = new URL(formData.officialLink);
        if (!['http:', 'https:'].includes(url.protocol)) {
          errs.officialLink = 'Link must begin with http:// or https://';
        }
      } catch {
        errs.officialLink = 'Please enter a valid URL (e.g. https://example.com)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      deadline: formData.deadline.trim() || 'Not stated',
      amountOrBenefit: formData.amountOrBenefit.trim() || 'Variable scholarship aid',
      eligibilityCriteria: formData.eligibilityCriteria.trim() || 'Refer to official notification.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="neu-flat rounded-3xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-300/40 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in the 9 scholarship parameters for the K12 Hunar CRM
            </p>
          </div>
          <button
            onClick={onClose}
            className="neu-btn p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5 max-h-[80vh] overflow-y-auto">
          {/* 1. Scholarship Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Scholarship Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Post-Matric Scholarship BC EBC"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-500/30'
                  : 'focus:ring-indigo-500/30'
              }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* 2. State & 3. Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  State <span className="text-rose-500">*</span>
                </span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
              >
                <option value="Bihar" className="bg-[#ebf0f7] dark:bg-[#111625]">Bihar</option>
                <option value="Haryana" className="bg-[#ebf0f7] dark:bg-[#111625]">Haryana</option>
                <option value="Jharkhand" className="bg-[#ebf0f7] dark:bg-[#111625]">Jharkhand</option>
                <option value="Other" className="bg-[#ebf0f7] dark:bg-[#111625]">Other State</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  Provider Name <span className="text-rose-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Welfare Department, Bihar"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className={`w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.provider
                    ? 'border-rose-400 focus:ring-rose-500/30'
                    : 'focus:ring-indigo-500/30'
                }`}
              />
              {errors.provider && (
                <p className="flex items-center gap-1 text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.provider}</span>
                </p>
              )}
            </div>
          </div>

          {/* 4. Applicable Class & 5. Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  Applicable Class <span className="text-rose-500">*</span>
                </span>
              </label>
              <select
                value={formData.applicableClass}
                onChange={(e) => setFormData({ ...formData, applicableClass: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
              >
                <option value="Class 1-10" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 1-10 (Pre-Matric)</option>
                <option value="Class 9-10" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 9-10 (Secondary)</option>
                <option value="Class 11-12" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 11-12 (Post-Matric)</option>
                <option value="Higher Education" className="bg-[#ebf0f7] dark:bg-[#111625]">Undergraduate / College</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
              >
                <option value="Published" className="bg-[#ebf0f7] dark:bg-[#111625]">Published (Active for students)</option>
                <option value="Draft" className="bg-[#ebf0f7] dark:bg-[#111625]">Draft (Internal review)</option>
                <option value="Expired" className="bg-[#ebf0f7] dark:bg-[#111625]">Expired (Application closed)</option>
              </select>
            </div>
          </div>

          {/* 6. Amount or Benefit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Scholarship Amount or Benefit
            </label>
            <input
              type="text"
              placeholder="e.g. ₹10,000 one-time grant or 100% Tuition Fee waiver"
              value={formData.amountOrBenefit}
              onChange={(e) => setFormData({ ...formData, amountOrBenefit: e.target.value })}
              className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* 7. Application Deadline & 8. Official Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  Application Deadline
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. 31 Dec 2026 or Not stated"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  Official Application Link
                </span>
              </label>
              <input
                type="text"
                placeholder="https://pmsonline.bih.nic.in"
                value={formData.officialLink}
                onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
                className={`w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.officialLink
                    ? 'border-rose-400 focus:ring-rose-500/30'
                    : 'focus:ring-indigo-500/30'
                }`}
              />
              {errors.officialLink && (
                <p className="flex items-center gap-1 text-xs text-rose-500 dark:text-rose-400 mt-1.5 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.officialLink}</span>
                </p>
              )}
            </div>
          </div>

          {/* 9. Eligibility Criteria */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Eligibility Criteria
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Must be a permanent resident of the state, family annual income under ₹2.5 Lakhs, enrolled in recognized institution."
              value={formData.eligibilityCriteria}
              onChange={(e) => setFormData({ ...formData, eligibilityCriteria: e.target.value })}
              className="w-full px-4 py-2.5 text-sm rounded-2xl neu-inset text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="neu-btn px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 rounded-2xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neu-btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-2xl cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>{editingScholarship ? 'Save Changes' : 'Create Scholarship'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
