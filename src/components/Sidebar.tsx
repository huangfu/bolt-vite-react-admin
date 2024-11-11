import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Shield,
  Settings,
  Activity,
  Factory,
  LayoutDashboard,
  ChevronDown,
  Menu,
} from 'lucide-react';

export const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('dashboard'),
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
    },
    {
      title: t('userManagement'),
      icon: <Users className="w-5 h-5" />,
      path: '/users',
      submenu: [
        { title: t('userList'), path: '/users/list' },
        { title: t('roles'), path: '/users/roles' },
        { title: t('menus'), path: '/users/menus' },
      ],
    },
    {
      title: t('qualityControl'),
      icon: <Shield className="w-5 h-5" />,
      path: '/quality',
      submenu: [
        { title: t('inspections'), path: '/quality/inspections' },
        { title: t('reports'), path: '/quality/reports' },
      ],
    },
    {
      title: t('production'),
      icon: <Factory className="w-5 h-5" />,
      path: '/production',
      submenu: [
        { title: t('planning'), path: '/production/planning' },
        { title: t('monitoring'), path: '/production/monitoring' },
      ],
    },
    {
      title: t('settings'),
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <Activity className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              {t('adminPortal')}
            </span>
          </div>
          <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
            {menuItems.map((item) => (
              <div key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </NavLink>
                {item.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`
                        }
                      >
                        <span className="ml-3">{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};