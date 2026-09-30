import { useState, useEffect, useMemo } from 'react';
import initialScholarships from '../data/initialScholarships.json';

const STORAGE_KEY = 'k12_scholarships_data_v1';

export function useScholarships() {
  const [scholarships, setScholarships] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load scholarships from localStorage:', e);
    }
    return initialScholarships;
  });

  // Sync to localStorage whenever scholarships change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scholarships));
    } catch (e) {
      console.error('Failed to save scholarships to localStorage:', e);
    }
  }, [scholarships]);

  // Compute 4 summary card values dynamically
  const summary = useMemo(() => {
    const total = scholarships.length;
    let published = 0;
    let draft = 0;
    let expired = 0;

    for (const item of scholarships) {
      if (item.status === 'Published') published++;
      else if (item.status === 'Draft') draft++;
      else if (item.status === 'Expired') expired++;
    }

    return { total, published, draft, expired };
  }, [scholarships]);

  // Add new scholarship
  const addScholarship = (newRecord) => {
    const record = {
      ...newRecord,
      id: `sch-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setScholarships((prev) => [record, ...prev]);
    return record;
  };

  // Update existing scholarship
  const updateScholarship = (id, updatedData) => {
    setScholarships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  // Change single status
  const changeStatus = (id, newStatus) => {
    setScholarships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Delete scholarship
  const deleteScholarship = (id) => {
    setScholarships((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to original 9 records
  const resetToDefaults = () => {
    setScholarships(initialScholarships);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialScholarships));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    scholarships,
    summary,
    addScholarship,
    updateScholarship,
    changeStatus,
    deleteScholarship,
    resetToDefaults,
  };
}
