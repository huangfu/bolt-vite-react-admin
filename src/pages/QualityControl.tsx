import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Inspections = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('inspections')}</h2>
      {/* Inspections implementation */}
      <div className="text-gray-600">Quality inspections component will be implemented here</div>
    </div>
  );
};

const Reports = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('reports')}</h2>
      {/* Reports implementation */}
      <div className="text-gray-600">Quality reports component will be implemented here</div>
    </div>
  );
};

export const QualityControl = () => {
  return (
    <Routes>
      <Route path="inspections" element={<Inspections />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};