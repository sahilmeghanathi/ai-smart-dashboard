'use client';

import React, { useState } from 'react';
import { UserIcon } from './Icons';

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName = 'John Doe',
  userEmail = 'john@example.com',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="User menu"
      >
        <UserIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Preferences
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
