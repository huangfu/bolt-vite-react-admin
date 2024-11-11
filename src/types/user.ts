export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  permissions: string[];
  createdAt: string;
  lastLogin: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  department: string;
  permissions: string[];
}