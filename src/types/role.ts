export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  userCount: number;
}

export interface RoleFormData {
  name: string;
  description: string;
  permissions: string[];
}