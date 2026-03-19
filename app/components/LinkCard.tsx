import React from 'react';
import { SettingsIcon } from './Icons';

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  visitCount: number;
  onDelete?: (id: string) => void;
  onVisit?: (id: string) => void;
}

const LinkCardComponent: React.FC<LinkCardProps> = ({
  id,
  title,
  url,
  visitCount,
  onDelete,
  onVisit,
}) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleLinkClick = () => {
    if (onVisit) {
      onVisit(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden group">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="flex-1 text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            title={title}
          >
            {title}
          </a>
          <button
            onClick={handleDeleteClick}
            className="shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
            aria-label="Delete link"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">
          {url}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium">
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {visitCount} {visitCount === 1 ? 'visit' : 'visits'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders when props haven't changed
export const LinkCard = React.memo(LinkCardComponent);
