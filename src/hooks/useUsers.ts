import { create } from 'zustand';
import { User, UserFormData } from '../types/user';

interface UsersState {
  users: User[];
  searchQuery: string;
  filters: {
    role: string;
    department: string;
    status: string;
  };
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<UsersState['filters']>) => void;
  addUser: (userData: UserFormData) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

// Mock initial data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    department: 'IT',
    status: 'active',
    permissions: ['users.manage', 'quality.manage'],
    createdAt: '2024-03-01',
    lastLogin: '2024-03-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    department: 'Production',
    status: 'active',
    permissions: ['production.manage'],
    createdAt: '2024-02-15',
    lastLogin: '2024-03-14',
  },
];

export const useUsers = create<UsersState>((set) => ({
  users: mockUsers,
  searchQuery: '',
  filters: {
    role: '',
    department: '',
    status: '',
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  addUser: (userData) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...userData,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0],
          lastLogin: '-',
        },
      ],
    })),
  updateUser: (id, userData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));