import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Box, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ProductionStatus } from '../components/dashboard/ProductionStatus';

export const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('totalUsers'),
      value: '2,543',
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: t('activeProduction'),
      value: '15',
      icon: Box,
      trend: { value: 8, isPositive: true }
    },
    {
      title: t('qualityIssues'),
      value: '3',
      icon: AlertTriangle,
      trend: { value: 5, isPositive: false }
    },
    {
      title: t('completedBatches'),
      value: '127',
      icon: CheckCircle,
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductionStatus />
        <RecentActivity />
      </div>
    </div>
  );
};