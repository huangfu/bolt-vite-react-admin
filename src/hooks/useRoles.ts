import { create } from 'zustand';
import { Role, RoleFormData } from '../types/role';

interface RolesState {
  roles: Role[];
  searchQuery: string;
  addRole: (roleData: RoleFormData) => void;
  updateRole: (id: string, roleData: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: ['users.manage', 'roles.manage', 'quality.manage', 'production.manage'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
    userCount: 2,
  },
  {
    id: '2',
    name: 'Quality Manager',
    description: 'Manage quality control processes',
    permissions: ['quality.manage', 'quality.view'],
    createdAt: '2024-02-15',
    updatedAt: '2024-03-14',
    userCount: 5,
  },
  {
    id: '3',
    name: 'Production Supervisor',
    description: 'Oversee production operations',
    permissions: ['production.manage', 'production.view'],
    createdAt: '2024-02-10',
    updatedAt: '2024-03-12',
    userCount: 8,
  },
];

export const useRoles = create<RolesState>((set) => ({
  roles: mockRoles,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addRole: (roleData) =>
    set((state) => ({
      roles: [
        ...state.roles,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...roleData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          userCount: 0,
        },
      ],
    })),
  updateRole: (id, roleData) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id
          ? {
              ...role,
              ...roleData,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : role
      ),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));