'use client';

import React, { ReactNode, useEffect } from 'react';
import { SidebarNav } from './SidebarNav';
import { CloseIcon } from './Icons';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  logo?: string;
  companyName?: string;
  children?: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  logo = '📊',
  companyName = 'Smart Dashboard',
  children,
}) => {
  // Handle Escape key for accessibility
  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // Organize CSS classes for readability
  const sidebarClasses = [
    'fixed md:static',
    'top-0 left-0',
    'h-screen w-64',
    'bg-white dark:bg-gray-900',
    'border-r border-gray-200 dark:border-gray-700',
    'flex flex-col',
    'transition-transform duration-300',
    'z-30',
    isOpen ? 'translate-x-0' : '-translate-x-64 md:translate-x-0',
  ].join(' ');

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{logo}</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {companyName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <SidebarNav />

        {/* Divider */}
        <div className="flex-1" />

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {children}
        </div>
      </aside>
    </>
  );
};
