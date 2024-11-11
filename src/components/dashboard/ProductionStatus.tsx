import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProductionItem {
  id: string;
  name: string;
  progress: number;
  status: 'running' | 'completed' | 'pending';
}

export const ProductionStatus: React.FC = () => {
  const { t } = useTranslation();

  const productionItems: ProductionItem[] = [
    { id: '1', name: 'Batch A-123', progress: 75, status: 'running' },
    { id: '2', name: 'Batch B-456', progress: 100, status: 'completed' },
    { id: '3', name: 'Batch C-789', progress: 0, status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">{t('productionStatus')}</h3>
        <div className="mt-6 flow-root">
          <ul className="divide-y divide-gray-200">
            {productionItems.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {t(item.status)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};