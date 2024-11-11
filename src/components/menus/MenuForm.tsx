import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuFormData } from '../../types/menu';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';

interface MenuFormProps {
  initialData?: MenuItem;
  parentMenus?: MenuItem[];
  onSubmit: (data: MenuFormData) => void;
  onCancel: () => void;
}

export const MenuForm: React.FC<MenuFormProps> = ({
  initialData,
  parentMenus = [],
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<MenuFormData>({
    name: initialData?.name || '',
    path: initialData?.path || '',
    icon: initialData?.icon || '',
    parentId: initialData?.parentId || '',
    order: initialData?.order || 0,
    isVisible: initialData?.isVisible ?? true,
    requiredPermissions: initialData?.requiredPermissions || [],
  });

  const availableIcons = Object.keys(Icons).filter(
    (key) => typeof (Icons as any)[key] === 'function'
  );

  const availablePermissions = [
    'users.manage',
    'roles.manage',
    'quality.manage',
    'quality.view',
    'production.manage',
    'production.view',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('menuName')}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('path')}
          </label>
          <input
            type="text"
            required
            value={formData.path}
            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('icon')}
          </label>
          <div className="relative">
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="block w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="">{t('selectIcon')}</option>
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('parentMenu')}
          </label>
          <div className="relative">
            <select
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="block w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            >
              <option value="">{t('noParent')}</option>
              {parentMenus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('order')}
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">{t('isVisible')}</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('requiredPermissions')}
          </label>
          <div className="space-y-2">
            {availablePermissions.map((permission) => (
              <label key={permission} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={formData.requiredPermissions.includes(permission)}
                  onChange={(e) => {
                    const newPermissions = e.target.checked
                      ? [...formData.requiredPermissions, permission]
                      : formData.requiredPermissions.filter((p) => p !== permission);
                    setFormData({ ...formData, requiredPermissions: newPermissions });
                  }}
                  className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">{t(permission)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? t('update') : t('create')}
        </button>
      </div>
    </form>
  );
};