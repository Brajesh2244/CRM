import React, { useState, useMemo } from 'react';
import { Search, MapPin, BookOpen, Calendar, Award, ExternalLink, ArrowLeft, Sparkles, Building, CheckCircle } from 'lucide-react';

export default function StudentPortalView({ scholarships, onBackToAdmin, onPreviewDetails }) {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [search, setSearch] = useState('');

  // Filter only Published scholarships by default for students
  const studentScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // Must be Published to show on public student portal
      if (item.status !== 'Published') return false;

      if (selectedState !== 'All' && item.state !== selectedState) return false;
      if (selectedClass !== 'All' && item.applicableClass !== selectedClass) return false;

      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesProvider = (item.provider || '').toLowerCase().includes(query);
        if (!matchesName && !matchesProvider) return false;
      }

      return true;
    });
  }, [scholarships, selectedState, selectedClass, search]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Student Banner */}
      <div className="neu-flat rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full neu-inset-sm text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Public Student Portal Preview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Explore Verified Scholarships for Bihar, Haryana & Jharkhand
          </h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            This is how visitors see active scholarships on K12 Hunar. Only <strong>Published</strong> scholarships approved by employees are displayed here.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onBackToAdmin}
            className="neu-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Admin CRM</span>
          </button>
        </div>
      </div>

      {/* Student Filter Controls */}
      <div className="neu-flat rounded-3xl p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarship for your study..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm neu-inset rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2.5 text-sm font-bold neu-inset rounded-2xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
          >
            <option value="All" className="bg-[#ebf0f7] dark:bg-[#111625]">All States</option>
            <option value="Bihar" className="bg-[#ebf0f7] dark:bg-[#111625]">Bihar</option>
            <option value="Haryana" className="bg-[#ebf0f7] dark:bg-[#111625]">Haryana</option>
            <option value="Jharkhand" className="bg-[#ebf0f7] dark:bg-[#111625]">Jharkhand</option>
          </select>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2.5 text-sm font-bold neu-inset rounded-2xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
          >
            <option value="All" className="bg-[#ebf0f7] dark:bg-[#111625]">All Classes</option>
            <option value="Class 1-10" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 1-10</option>
            <option value="Class 9-10" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 9-10</option>
            <option value="Class 11-12" className="bg-[#ebf0f7] dark:bg-[#111625]">Class 11-12</option>
          </select>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-300/40 dark:border-slate-800/80 text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-900 dark:text-white font-bold">{studentScholarships.length}</strong> active published scholarships
        </div>
      </div>

      {/* Student Cards Grid */}
      {studentScholarships.length === 0 ? (
        <div className="neu-flat rounded-3xl p-12 text-center">
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            No published scholarships match your student filter criteria.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Tip: Go to the Admin CRM and change status of scholarships from "Draft" or "Expired" to "Published" to see them appear here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentScholarships.map((sch) => (
            <div
              key={sch.id}
              className="neu-flat rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="neu-flat-sm inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300">
                    <MapPin className="w-3 h-3" />
                    {sch.state}
                  </span>
                  <span className="neu-inset-sm inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <BookOpen className="w-3 h-3" />
                    {sch.applicableClass}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-snug mb-1">
                  {sch.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{sch.provider}</span>
                </p>

                {/* Amount */}
                <div className="neu-flat-sm p-3 rounded-2xl mb-4 border border-emerald-200/50 dark:border-emerald-800/40">
                  <div className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Benefit</span>
                  </div>
                  <p className="text-sm font-extrabold text-emerald-950 dark:text-emerald-200 mt-0.5">
                    {sch.amountOrBenefit}
                  </p>
                </div>

                {/* Eligibility summary */}
                <div className="neu-inset-sm p-3 rounded-2xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  <span className="font-bold block text-slate-800 dark:text-slate-200 mb-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-indigo-500" />
                    Eligibility:
                  </span>
                  {sch.eligibilityCriteria}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline:
                  </span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">{sch.deadline}</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-300/40 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onPreviewDetails(sch)}
                  className="neu-btn px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  Details
                </button>
                <a
                  href={sch.officialLink || 'https://www.k12hunar.com/scholarships'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 neu-btn-primary inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
