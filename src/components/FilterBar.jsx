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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left Side: Search & Filters */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by scholarship or provider..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* State Filter */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => onStateFilterChange(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 cursor-pointer"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === 'All States' ? 'All States (Bihar, Haryana, Jharkhand)' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter === 'All' ? 'All Statuses' : statusFilter}
              onChange={(e) => {
                const val = e.target.value;
                onStatusFilterChange(val === 'All Statuses' ? 'All' : val);
              }}
              className="w-full sm:w-auto px-3.5 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Reset all search and filter conditions"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Right Side: View Toggle & Add Scholarship Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Table / Card View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Add Scholarship CTA */}
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Scholarship</span>
          </button>
        </div>
      </div>

      {/* Filter result counter */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Showing <strong className="text-slate-800 font-semibold">{totalMatching}</strong> scholarships
            {stateFilter !== 'All States' && (
              <span> in <strong className="text-indigo-600">{stateFilter}</strong></span>
            )}
            {statusFilter !== 'All' && (
              <span> with status <strong className="text-indigo-600">{statusFilter}</strong></span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
