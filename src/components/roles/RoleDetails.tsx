import React from 'react';
import { useTranslation } from 'react-i18next';
import { Role } from '../../types/role';
import { X, Users, Calendar } from 'lucide-react';

interface RoleDetailsProps {
  role: Role;
  onClose: () => void;
}

export const RoleDetails: React.FC<RoleDetailsProps> = ({ role, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('roleDetails')}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('roleName')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{role.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('description')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{role.description}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('permissions')}
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {role.permissions.map((permission) => (
              <span
                key={permission}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {t(permission)}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('assignedUsers')}
          </label>
          <div className="mt-1 flex items-center text-sm text-gray-900">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            {role.userCount} {t('users')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              {t('createdAt')}
            </label>
            <div className="mt-1 flex items-center text-sm text-gray-900">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {role.createdAt}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              {t('lastUpdated')}
            </label>
            <div className="mt-1 flex items-center text-sm text-gray-900">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {role.updatedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};