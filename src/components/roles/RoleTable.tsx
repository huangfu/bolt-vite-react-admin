import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Eye, UserPlus, Users } from 'lucide-react';
import { Role } from '../../types/role';
import ReactPaginate from 'react-paginate';

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
  onViewDetails: (role: Role) => void;
  onAddRole: () => void;
}

export const RoleTable: React.FC<RoleTableProps> = ({
  roles,
  onEdit,
  onDelete,
  onViewDetails,
  onAddRole,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

  const pageCount = Math.ceil(roles.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentRoles = roles.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900"></h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onAddRole}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {t('addRole')}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('roleName')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('description')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('permissions')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('users')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRoles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {role.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('updated')}: {role.updatedAt}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {role.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {t(permission)}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {role.userCount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onViewDetails(role)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title={t('viewDetails')}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit(role)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      title={t('edit')}
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(role.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          {t('showing')} {offset + 1} {t('to')}{' '}
          {Math.min(offset + itemsPerPage, roles.length)} {t('of')}{' '}
          {roles.length} {t('entries')}
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
