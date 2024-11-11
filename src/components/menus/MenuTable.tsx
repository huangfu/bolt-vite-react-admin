import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Edit2,
  Trash2,
  Eye,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye as EyeIcon,
  EyeOff,
} from 'lucide-react';
import { MenuItem } from '../../types/menu';
import ReactPaginate from 'react-paginate';
import * as Icons from 'lucide-react';

interface MenuTableProps {
  menus: MenuItem[];
  onEdit: (menu: MenuItem) => void;
  onDelete: (id: string) => void;
  onViewDetails: (menu: MenuItem) => void;
  onAddMenu: () => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  onToggleVisibility: (id: string, isVisible: boolean) => void;
}

export const MenuTable: React.FC<MenuTableProps> = ({
  menus,
  onEdit,
  onDelete,
  onViewDetails,
  onAddMenu,
  onReorder,
  onToggleVisibility,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(menus.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentMenus = menus.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const renderMenuIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="h-4 w-4 text-gray-500" /> : null;
  };

  const renderMenuItem = (menu: MenuItem, level: number = 0) => (
    <React.Fragment key={menu.id}>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div
              style={{ marginLeft: `${level * 2}rem` }}
              className="flex items-center"
            >
              {renderMenuIcon(menu.icon)}
              <span className="ml-2 text-sm font-medium text-gray-900">
                {menu.name}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{menu.path}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <button
              onClick={() => onToggleVisibility(menu.id, !menu.isVisible)}
              className={`p-1 rounded-full ${
                menu.isVisible ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {menu.isVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {menu.requiredPermissions.map((permission) => (
              <span
                key={permission}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {t(permission)}
              </span>
            ))}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex space-x-3">
            <button
              onClick={() => onReorder(menu.id, 'up')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <button
              onClick={() => onReorder(menu.id, 'down')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <button
              onClick={() => onViewDetails(menu)}
              className="text-blue-600 hover:text-blue-900"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(menu)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(menu.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
      {menu.children?.map((child) => renderMenuItem(child, level + 1))}
    </React.Fragment>
  );

  return (
    <div className="space-y-1">
      <div className="bg-white rounded-lg shadow  p-3">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900"></h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onAddMenu}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('addMenu')}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('menuName')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('path')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('visibility')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('permissions')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMenus.map((menu) => renderMenuItem(menu))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          {t('showing')} {offset + 1} {t('to')}{' '}
          {Math.min(offset + itemsPerPage, menus.length)} {t('of')}{' '}
          {menus.length} {t('entries')}
        </div>
        <ReactPaginate
          previousLabel={t('previous')}
          nextLabel={t('next')}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          pageClassName="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          previousClassName="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          nextClassName="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          activeClassName="!bg-indigo-600 !text-white hover:!bg-indigo-700"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};
