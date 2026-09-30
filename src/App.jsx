import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ScholarshipTable from './components/ScholarshipTable';
import ScholarshipCardView from './components/ScholarshipCardView';
import ScholarshipModal from './components/ScholarshipModal';
import StudentPreviewModal from './components/StudentPreviewModal';
import { useScholarships } from './hooks/useScholarships';
import { CheckCircle2, Info } from 'lucide-react';

export default function App() {
  const {
    scholarships,
    summary,
    addScholarship,
    updateScholarship,
    changeStatus,
    deleteScholarship,
    resetToDefaults,
  } = useScholarships();

  // Filters & Search State
  const [stateFilter, setStateFilter] = useState('All States');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [previewScholarship, setPreviewScholarship] = useState(null);

  // User Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered scholarships list
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // 1. State filter
      if (stateFilter !== 'All States' && item.state !== stateFilter) {
        return false;
      }
      // 2. Status filter
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesProvider = (item.provider || '').toLowerCase().includes(query);
        const matchesClass = (item.applicableClass || '').toLowerCase().includes(query);
        if (!matchesName && !matchesProvider && !matchesClass) {
          return false;
        }
      }
      return true;
    });
  }, [scholarships, stateFilter, statusFilter, searchQuery]);

  // Actions
  const handleAddNew = () => {
    setEditingScholarship(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = (formData) => {
    if (editingScholarship) {
      updateScholarship(editingScholarship.id, formData);
      showToast(`Updated "${formData.name}" successfully!`);
    } else {
      addScholarship(formData);
      showToast(`Added new scholarship "${formData.name}"!`);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    changeStatus(id, newStatus);
    showToast(`Status changed to "${newStatus}"`);
  };

  const handleDelete = (id) => {
    deleteScholarship(id);
    showToast('Scholarship deleted successfully');
  };

  const handleResetData = () => {
    resetToDefaults();
    setStateFilter('All States');
    setStatusFilter('All');
    setSearchQuery('');
    showToast('Reset to original 9 sample test scholarships');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-sm animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header onResetData={handleResetData} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Banner / Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Scholarship Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage, review status, and preview student scholarships for Bihar, Haryana, and Jharkhand.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold self-start sm:self-auto">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Interactive Demo Ready</span>
          </div>
        </div>

        {/* 1. Four Summary Cards */}
        <SummaryCards
          summary={summary}
          currentStatusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* 2. Filter & Action Bar */}
        <FilterBar
          stateFilter={stateFilter}
          onStateFilterChange={setStateFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddNew={handleAddNew}
          totalMatching={filteredScholarships.length}
        />

        {/* 3. Scholarships Records View (Table or Card List) */}
        {viewMode === 'table' ? (
          <div className="hidden md:block">
            <ScholarshipTable
              scholarships={filteredScholarships}
              onStatusChange={handleStatusChange}
              onPreview={(item) => setPreviewScholarship(item)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ) : null}

        {/* Responsive fallback: Render Cards on mobile screens or when card view is chosen */}
        <div className={viewMode === 'table' ? 'block md:hidden' : 'block'}>
          <ScholarshipCardView
            scholarships={filteredScholarships}
            onStatusChange={handleStatusChange}
            onPreview={(item) => setPreviewScholarship(item)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {/* Add / Edit Scholarship Modal */}
      <ScholarshipModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveForm}
        editingScholarship={editingScholarship}
      />

      {/* Student View Preview Modal */}
      <StudentPreviewModal
        scholarship={previewScholarship}
        isOpen={!!previewScholarship}
        onClose={() => setPreviewScholarship(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            K12 Hunar Frontend Assessment • <strong>Scholarship Management CRM Demo</strong>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Bihar • Haryana • Jharkhand</span>
            <span>•</span>
            <span>React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
