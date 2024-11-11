import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import { X } from 'lucide-react';

interface UserDetailsProps {
  user: User;
  onClose: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('userDetails')}</h2>
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
            {t('name')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('email')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('role')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.role}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('department')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.department}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('status')}
          </label>
          <span
            className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {user.status}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('permissions')}
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {user.permissions.map((permission) => (
              <span
                key={permission}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('createdAt')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.createdAt}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            {t('lastLogin')}
          </label>
          <p className="mt-1 text-sm text-gray-900">{user.lastLogin}</p>
        </div>
      </div>
    </div>
  );
};