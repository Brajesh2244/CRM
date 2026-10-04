import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import FilterBar from './components/FilterBar';
import ScholarshipTable from './components/ScholarshipTable';
import ScholarshipCardView from './components/ScholarshipCardView';
import ScholarshipModal from './components/ScholarshipModal';
import StudentPreviewModal from './components/StudentPreviewModal';
import StudentPortalView from './components/StudentPortalView';
import ConfirmModal from './components/ConfirmModal';
import { useScholarships } from './hooks/useScholarships';
import { useDarkMode } from './hooks/useDarkMode';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';

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

  const { theme, toggleTheme } = useDarkMode();

  // Navigation: 'admin' (CRM Dashboard) or 'student' (Live Student View)
  const [activeTab, setActiveTab] = useState('admin');

  // Filters & Search State
  const [stateFilter, setStateFilter] = useState('All States');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [previewScholarship, setPreviewScholarship] = useState(null);

  // In-app Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    isDanger: false,
    action: () => {},
  });

  // User Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered scholarships list for Admin CRM
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

  // Safe delete via custom modal
  const handleDeleteRequest = (scholarship) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Scholarship',
      message: `Are you sure you want to permanently remove "${scholarship.name}"? This record will be removed from the database.`,
      confirmText: 'Delete Record',
      isDanger: true,
      action: () => {
        deleteScholarship(scholarship.id);
        showToast(`Deleted "${scholarship.name}"`);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Safe reset via custom modal
  const handleResetRequest = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset to Sample Data',
      message: 'Restore all 9 official test scholarships from the assessment document? Any custom additions or edits will be reset.',
      confirmText: 'Reset All Records',
      isDanger: false,
      action: () => {
        resetToDefaults();
        setStateFilter('All States');
        setStatusFilter('All');
        setSearchQuery('');
        showToast('Reset to original 9 sample test scholarships');
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#ebf0f7] dark:bg-[#111625] flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-250">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 neu-flat flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold animate-in fade-in slide-in-from-bottom-5">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Header
        onResetClick={handleResetRequest}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'student' ? (
          /* Live Student Portal View */
          <StudentPortalView
            scholarships={scholarships}
            onBackToAdmin={() => setActiveTab('admin')}
            onPreviewDetails={(sch) => setPreviewScholarship(sch)}
          />
        ) : (
          /* Admin CRM Management View */
          <>
            {/* Page Banner / Title */}
            <div className="mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Scholarship Dashboard
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md neu-inset-sm text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="w-3 h-3" /> Soft UI 2.0
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Manage, review status, and preview student scholarships for Bihar, Haryana, and Jharkhand.
                </p>
              </div>
              <div className="neu-flat-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-indigo-700 dark:text-indigo-300 text-xs font-bold self-start sm:self-auto">
                <Info className="w-4 h-4 text-indigo-500" />
                <span>Interactive Demo Ready</span>
              </div>
            </div>

            {/* 1. Four Neumorphic Summary Cards */}
            <SummaryCards
              summary={summary}
              currentStatusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />

            {/* 2. Neumorphic Filter & Action Bar */}
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
                  onDeleteRequest={handleDeleteRequest}
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
                onDeleteRequest={handleDeleteRequest}
              />
            </div>
          </>
        )}
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

      {/* Custom Confirmation Modal (replaces browser confirm) */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        isDanger={confirmModal.isDanger}
        onConfirm={confirmModal.action}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Footer */}
      <footer className="mt-12 py-7 border-t border-slate-300/40 dark:border-slate-800/80 text-center text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/20 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            K12 Hunar Frontend Assessment • <strong>Scholarship Management CRM Demo</strong>
          </p>
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 font-semibold">
            <span>Bihar • Haryana • Jharkhand</span>
            <span>•</span>
            <span>Soft UI 2.0 Neumorphic Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
