'use client';

import React from 'react';
import { MenuIcon } from './Icons';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};
