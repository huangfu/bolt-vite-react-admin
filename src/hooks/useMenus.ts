import { create } from 'zustand';
import { MenuItem, MenuFormData } from '../types/menu';

interface MenuState {
  menus: MenuItem[];
  searchQuery: string;
  filters: {
    visibility: string;
    permission: string;
  };
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<MenuState['filters']>) => void;
  addMenu: (menuData: MenuFormData) => void;
  updateMenu: (id: string, menuData: Partial<MenuItem>) => void;
  deleteMenu: (id: string) => void;
  reorderMenu: (id: string, newOrder: number) => void;
}

const mockMenus: MenuItem[] = [
  {
    id: '1',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    order: 1,
    isVisible: true,
    requiredPermissions: [],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'User Management',
    path: '/users',
    icon: 'Users',
    order: 2,
    isVisible: true,
    requiredPermissions: ['users.manage'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
    children: [
      {
        id: '2-1',
        name: 'User List',
        path: '/users/list',
        parentId: '2',
        order: 1,
        isVisible: true,
        requiredPermissions: ['users.manage'],
        createdAt: '2024-03-01',
        updatedAt: '2024-03-15',
      },
      {
        id: '2-2',
        name: 'Roles',
        path: '/users/roles',
        parentId: '2',
        order: 2,
        isVisible: true,
        requiredPermissions: ['users.manage'],
        createdAt: '2024-03-01',
        updatedAt: '2024-03-15',
      },
    ],
  },
  {
    id: '3',
    name: 'Quality Control',
    path: '/quality',
    icon: 'Shield',
    order: 3,
    isVisible: true,
    requiredPermissions: ['quality.manage'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
    children: [
      {
        id: '3-1',
        name: 'Inspections',
        path: '/quality/inspections',
        parentId: '3',
        order: 1,
        isVisible: true,
        requiredPermissions: ['quality.manage'],
        createdAt: '2024-03-01',
        updatedAt: '2024-03-15',
      },
    ],
  },
];

export const useMenus = create<MenuState>((set) => ({
  menus: mockMenus,
  searchQuery: '',
  filters: {
    visibility: '',
    permission: '',
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  addMenu: (menuData) =>
    set((state) => ({
      menus: [
        ...state.menus,
        {
          id: Math.random().toString(36).substr(2, 9),
          ...menuData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        },
      ],
    })),
  updateMenu: (id, menuData) =>
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === id
          ? {
              ...menu,
              ...menuData,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : menu
      ),
    })),
  deleteMenu: (id) =>
    set((state) => ({
      menus: state.menus.filter((menu) => menu.id !== id),
    })),
  reorderMenu: (id, newOrder) =>
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === id ? { ...menu, order: newOrder } : menu
      ),
    })),
}));