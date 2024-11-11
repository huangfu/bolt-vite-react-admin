import React from 'react';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{t('settings')}</h2>
      {/* Settings implementation */}
      <div className="text-gray-600">Settings component will be implemented here</div>
    </div>
  );
};