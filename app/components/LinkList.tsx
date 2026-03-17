import React from 'react';
import { LinkCard } from './LinkCard';

interface Link {
  id: string;
  title: string;
  url: string;
  visitCount: number;
}

interface LinkListProps {
  links: Link[];
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const LinkList: React.FC<LinkListProps> = ({
  links,
  onDelete,
  onVisit,
  isLoading = false,
  emptyMessage = 'No links saved yet. Add your first link above!',
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading links...</p>
        </div>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Links
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {links.length} {links.length === 1 ? 'link' : 'links'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            url={link.url}
            visitCount={link.visitCount}
            onDelete={onDelete}
            onVisit={onVisit}
          />
        ))}
      </div>
    </div>
  );
};
