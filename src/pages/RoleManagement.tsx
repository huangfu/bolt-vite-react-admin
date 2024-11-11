import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { RoleTable } from '../components/roles/RoleTable';
import { RoleForm } from '../components/roles/RoleForm';
import { RoleDetails } from '../components/roles/RoleDetails';
import { useRoles } from '../hooks/useRoles';
import { Role } from '../types/role';

export const RoleManagement = () => {
  const { t } = useTranslation();
  const {
    roles,
    searchQuery,
    setSearchQuery,
    addRole,
    updateRole,
    deleteRole,
  } = useRoles();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roles, searchQuery]);

  const handleAdd = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDeleteRole'))) {
      deleteRole(id);
    }
  };

  const handleViewDetails = (role: Role) => {
    setSelectedRole(role);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('roleManagement')}</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchRoles')}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <RoleTable
        roles={filteredRoles}
        onAddRole={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedRole ? t('editRole') : t('addRole')}
            </h2>
            <RoleForm
              initialData={selectedRole || undefined}
              onSubmit={(data) => {
                if (selectedRole) {
                  updateRole(selectedRole.id, data);
                } else {
                  addRole(data);
                }
                setIsFormOpen(false);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {isDetailsOpen && selectedRole && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <RoleDetails
              role={selectedRole}
              onClose={() => setIsDetailsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};