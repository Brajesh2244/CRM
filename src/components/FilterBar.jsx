import React from 'react';
import { Search, Plus, Filter, LayoutGrid, Table, X } from 'lucide-react';

export default function FilterBar({
  stateFilter,
  onStateFilterChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddNew,
  totalMatching,
}) {
  const states = ['All States', 'Bihar', 'Haryana', 'Jharkhand'];
  const statuses = ['All Statuses', 'Published', 'Draft', 'Expired'];

  const hasActiveFilters =
    stateFilter !== 'All States' ||
    statusFilter !== 'All' ||
    searchQuery.trim().length > 0;

  const clearAllFilters = () => {
    onStateFilterChange('All States');
    onStatusFilterChange('All');
    onSearchChange('');
  };

  return (
    <div className="neu-flat rounded-3xl p-5 mb-7 transition-all duration-200">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left Side: Search & Filters */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Sunken Neumorphic Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search scholarship or provider..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm neu-inset rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>

          {/* Sunken Neumorphic State Filter */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => onStateFilterChange(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold neu-inset rounded-2xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
            >
              {states.map((st) => (
                <option key={st} value={st} className="bg-[#ebf0f7] dark:bg-[#111625] text-slate-900 dark:text-white">
                  {st === 'All States' ? 'All States (Bihar, Haryana, Jharkhand)' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Sunken Neumorphic Status Filter */}
          <div className="relative">
            <select
              value={statusFilter === 'All' ? 'All Statuses' : statusFilter}
              onChange={(e) => {
                const val = e.target.value;
                onStatusFilterChange(val === 'All Statuses' ? 'All' : val);
              }}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold neu-inset rounded-2xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st} className="bg-[#ebf0f7] dark:bg-[#111625] text-slate-900 dark:text-white">
                  {st}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="neu-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 rounded-xl cursor-pointer"
              title="Reset all search and filter conditions"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Right Side: View Toggle & Add Scholarship Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-300/40 dark:border-slate-800">
          {/* Tactile Segmented View Switcher */}
          <div className="flex items-center neu-inset-sm p-1.5 rounded-2xl">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'neu-flat-sm text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'neu-flat-sm text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Tactile CTA Button */}
          <button
            onClick={onAddNew}
            className="neu-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-2xl cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Scholarship</span>
          </button>
        </div>
      </div>

      {/* Filter result counter */}
      <div className="mt-4 pt-3.5 border-t border-slate-300/40 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200 font-bold">{totalMatching}</strong> scholarships
            {stateFilter !== 'All States' && (
              <span> in <strong className="text-indigo-600 dark:text-indigo-400">{stateFilter}</strong></span>
            )}
            {statusFilter !== 'All' && (
              <span> with status <strong className="text-indigo-600 dark:text-indigo-400">{statusFilter}</strong></span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
