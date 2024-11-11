import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Planning = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('planning')}</h2>
      {/* Planning implementation */}
      <div className="text-gray-600">Production planning component will be implemented here</div>
    </div>
  );
};

const Monitoring = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('monitoring')}</h2>
      {/* Monitoring implementation */}
      <div className="text-gray-600">Production monitoring component will be implemented here</div>
    </div>
  );
};

export const ProductionManagement = () => {
  return (
    <Routes>
      <Route path="planning" element={<Planning />} />
      <Route path="monitoring" element={<Monitoring />} />
    </Routes>
  );
};