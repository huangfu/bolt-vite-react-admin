import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserTable } from '../components/users/UserTable';
import { UserForm } from '../components/users/UserForm';
import { UserDetails } from '../components/users/UserDetails';
import { UserFilters } from '../components/users/UserFilters';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user';

export const UserList = () => {
  const { t } = useTranslation();
  const {
    users,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = !filters.role || user.role === filters.role;
      const matchesDepartment =
        !filters.department || user.department === filters.department;
      const matchesStatus = !filters.status || user.status === filters.status;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [users, searchQuery, filters]);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      deleteUser(id);
    }
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('userList')}</h2>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={setFilters}
      />

      <UserTable
        users={filteredUsers}
        onAddUser={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedUser ? t('editUser') : t('addUser')}
            </h2>
            <UserForm
              initialData={selectedUser || undefined}
              onSubmit={(data) => {
                if (selectedUser) {
                  updateUser(selectedUser.id, data);
                } else {
                  addUser(data);
                }
                setIsFormOpen(false);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {isDetailsOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <UserDetails
              user={selectedUser}
              onClose={() => setIsDetailsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};