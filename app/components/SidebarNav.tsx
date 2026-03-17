import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardIcon, LinksIcon, SettingsIcon } from './Icons';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    href: '/dashboard/links',
    label: 'Links',
    icon: LinksIcon,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: SettingsIcon,
  },
];

export const SidebarNav: React.FC = () => {
  const currentPath = usePathname();
  return (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
