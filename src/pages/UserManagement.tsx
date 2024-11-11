import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserList } from './UserList';
import { RoleManagement } from './RoleManagement';
import { MenuManagement } from './MenuManagement';

export const UserManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users/list" replace />} />
      <Route path="/list" element={<UserList />} />
      <Route path="/roles" element={<RoleManagement />} />
      <Route path="/menus" element={<MenuManagement />} />
    </Routes>
  );
};