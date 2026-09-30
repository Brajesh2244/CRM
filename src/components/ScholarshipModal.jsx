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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
            </h3>
            <p className="text-xs text-slate-500">
              Fill in the 9 scholarship parameters for the K12 Hunar CRM
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* 1. Scholarship Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Scholarship Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Post-Matric Scholarship BC EBC"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-rose-500 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* 2. State & 3. Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  State <span className="text-rose-500">*</span>
                </span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Bihar">Bihar</option>
                <option value="Haryana">Haryana</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Other">Other State</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Provider Name <span className="text-rose-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Welfare Department, Bihar"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.provider
                    ? 'border-rose-400 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.provider && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.provider}</span>
                </p>
              )}
            </div>
          </div>

          {/* 4. Applicable Class & 5. Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  Applicable Class <span className="text-rose-500">*</span>
                </span>
              </label>
              <select
                value={formData.applicableClass}
                onChange={(e) => setFormData({ ...formData, applicableClass: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Class 1-10">Class 1-10 (Pre-Matric)</option>
                <option value="Class 9-10">Class 9-10 (Secondary)</option>
                <option value="Class 11-12">Class 11-12 (Post-Matric)</option>
                <option value="Higher Education">Undergraduate / College</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="Published">Published (Active for students)</option>
                <option value="Draft">Draft (Internal review)</option>
                <option value="Expired">Expired (Application closed)</option>
              </select>
            </div>
          </div>

          {/* 6. Amount or Benefit */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Scholarship Amount or Benefit
            </label>
            <input
              type="text"
              placeholder="e.g. ₹10,000 one-time grant or 100% Tuition Fee waiver"
              value={formData.amountOrBenefit}
              onChange={(e) => setFormData({ ...formData, amountOrBenefit: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* 7. Application Deadline & 8. Official Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Application Deadline
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. 31 Dec 2026 or Not stated"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                <span className="inline-flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                  Official Application Link
                </span>
              </label>
              <input
                type="text"
                placeholder="https://pmsonline.bih.nic.in"
                value={formData.officialLink}
                onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.officialLink
                    ? 'border-rose-400 focus:ring-rose-500/20'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.officialLink && (
                <p className="flex items-center gap-1 text-xs text-rose-500 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.officialLink}</span>
                </p>
              )}
            </div>
          </div>

          {/* 9. Eligibility Criteria */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Eligibility Criteria
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Must be a permanent resident of the state, family annual income under ₹2.5 Lakhs, enrolled in recognized institution."
              value={formData.eligibilityCriteria}
              onChange={(e) => setFormData({ ...formData, eligibilityCriteria: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{editingScholarship ? 'Save Changes' : 'Create Scholarship'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
