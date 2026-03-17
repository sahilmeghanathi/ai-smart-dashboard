/**
 * LinkCard Component Usage Examples
 * 
 * This file demonstrates how to use the LinkCard component
 * in various scenarios within your dashboard.
 */

import { LinkCard } from '@/app/components';

// Basic Example - Simple Links List
export function BasicLinksExample() {
  const links = [
    {
      id: '1',
      title: 'Next.js Documentation',
      url: 'https://nextjs.org/docs',
      visitCount: 24,
    },
    {
      id: '2',
      title: 'Tailwind CSS Docs',
      url: 'https://tailwindcss.com',
      visitCount: 18,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          id={link.id}
          title={link.title}
          url={link.url}
          visitCount={link.visitCount}
        />
      ))}
    </div>
  );
}

// With State Management - Full Featured Example
'use client';

import { useState } from 'react';

interface Link {
  id: string;
  title: string;
  url: string;
  visitCount: number;
}

export function StatefulLinksExample() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'React Documentation',
      url: 'https://react.dev',
      visitCount: 45,
    },
    {
      id: '2',
      title: 'TypeScript Handbook',
      url: 'https://typescriptlang.org/docs',
      visitCount: 32,
    },
    {
      id: '3',
      title: 'GitHub',
      url: 'https://github.com',
      visitCount: 67,
    },
  ]);

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleVisit = (id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, visitCount: link.visitCount + 1 } : link
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Links
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Total: {links.length}
        </span>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No links saved yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              title={link.title}
              url={link.url}
              visitCount={link.visitCount}
              onDelete={handleDelete}
              onVisit={handleVisit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Categorized Links Example
export function CategorizedLinksExample() {
  type LinkCategory = {
    name: string;
    icon: string;
    links: Link[];
  };

  const categories: LinkCategory[] = [
    {
      name: 'Documentation',
      icon: '📚',
      links: [
        { id: '1', title: 'Next.js', url: 'https://nextjs.org', visitCount: 42 },
        {
          id: '2',
          title: 'React',
          url: 'https://react.dev',
          visitCount: 38,
        },
      ],
    },
    {
      name: 'Tools',
      icon: '🛠️',
      links: [
        { id: '3', title: 'GitHub', url: 'https://github.com', visitCount: 56 },
        { id: '4', title: 'npm', url: 'https://npm.com', visitCount: 29 },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {category.links.length} links
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.links.map((link) => (
              <LinkCard
                key={link.id}
                id={link.id}
                title={link.title}
                url={link.url}
                visitCount={link.visitCount}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Props Reference for LinkCard
 * 
 * @interface LinkCardProps
 * @property {string} id - Unique identifier for the link
 * @property {string} title - Display title of the link
 * @property {string} url - URL that the link points to
 * @property {number} visitCount - Number of times link has been visited
 * @property {(id: string) => void} [onDelete] - Callback when delete button is clicked
 * @property {(id: string) => void} [onVisit] - Callback when link is visited
 */
