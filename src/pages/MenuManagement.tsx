import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { MenuTable } from '../components/menus/MenuTable';
import { MenuForm } from '../components/menus/MenuForm';
import { useMenus } from '../hooks/useMenus';
import { MenuItem } from '../types/menu';

export const MenuManagement = () => {
  const { t } = useTranslation();
  const {
    menus,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    addMenu,
    updateMenu,
    deleteMenu,
    reorderMenu,
  } = useMenus();

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      const matchesSearch =
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.path.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVisibility =
        !filters.visibility || (filters.visibility === 'visible' ? menu.isVisible : !menu.isVisible);
      const matchesPermission =
        !filters.permission ||
        menu.requiredPermissions.includes(filters.permission);

      return matchesSearch && matchesVisibility && matchesPermission;
    });
  }, [menus, searchQuery, filters]);

  const handleAdd = () => {
    setSelectedMenu(null);
    setIsFormOpen(true);
  };

  const handleEdit = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDeleteMenu'))) {
      deleteMenu(id);
    }
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const menuIndex = menus.findIndex((m) => m.id === id);
    if (menuIndex === -1) return;

    const newOrder =
      direction === 'up'
        ? menus[menuIndex].order - 1
        : menus[menuIndex].order + 1;

    reorderMenu(id, newOrder);
  };

  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    updateMenu(id, { isVisible });
  };

  const parentMenus = menus.filter((menu) => !menu.parentId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('menuManagement')}</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchMenus')}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <select
              value={filters.visibility}
              onChange={(e) => setFilters({ visibility: e.target.value })}
              className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">{t('allVisibility')}</option>
              <option value="visible">{t('visible')}</option>
              <option value="hidden">{t('hidden')}</option>
            </select>
          </div>

          <div>
            <select
              value={filters.permission}
              onChange={(e) => setFilters({ permission: e.target.value })}
              className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">{t('allPermissions')}</option>
              <option value="users.manage">{t('users.manage')}</option>
              <option value="roles.manage">{t('roles.manage')}</option>
              <option value="quality.manage">{t('quality.manage')}</option>
              <option value="production.manage">{t('production.manage')}</option>
            </select>
          </div>
        </div>
      </div>

      <MenuTable
        menus={filteredMenus}
        onAddMenu={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={() => {}}
        onReorder={handleReorder}
        onToggleVisibility={handleToggleVisibility}
      />

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedMenu ? t('editMenu') : t('addMenu')}
            </h2>
            <MenuForm
              initialData={selectedMenu || undefined}
              parentMenus={parentMenus}
              onSubmit={(data) => {
                if (selectedMenu) {
                  updateMenu(selectedMenu.id, data);
                } else {
                  addMenu(data);
                }
                setIsFormOpen(false);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};