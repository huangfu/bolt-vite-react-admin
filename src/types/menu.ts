export interface MenuItem {
  id: string;
  name: string;
  path: string;
  icon?: string;
  parentId?: string;
  order: number;
  isVisible: boolean;
  requiredPermissions: string[];
  children?: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuFormData {
  name: string;
  path: string;
  icon?: string;
  parentId?: string;
  order: number;
  isVisible: boolean;
  requiredPermissions: string[];
}