import React from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  user: string;
}

export const RecentActivity: React.FC = () => {
  const { t } = useTranslation();
  
  const activities: Activity[] = [
    {
      id: '1',
      type: 'quality',
      description: t('qualityInspectionCompleted'),
      time: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'production',
      description: t('productionBatchStarted'),
      time: '4 hours ago',
      user: 'Jane Smith'
    },
    {
      id: '3',
      type: 'user',
      description: t('newUserAdded'),
      time: '1 day ago',
      user: 'Admin'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">{t('recentActivity')}</h3>
        </div>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="text-sm font-semibold text-gray-800">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {activity.description}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {t('by')} {activity.user} • {activity.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};