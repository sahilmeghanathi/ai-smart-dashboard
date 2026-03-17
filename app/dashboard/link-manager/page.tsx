'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { LinkForm } from '@/app/components/LinkForm';
import { LinkList } from '@/app/components/LinkList';

interface Link {
  id: string;
  title: string;
  url: string;
  visitCount: number;
}

export default function LinkManagementPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLinks([
        {
          id: '1',
          title: 'Next.js Documentation',
          url: 'https://nextjs.org/docs',
          visitCount: 12,
        },
        {
          id: '2',
          title: 'React Official',
          url: 'https://react.dev',
          visitCount: 8,
        },
      ]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const generateId = (): string => {
    return Date.now().toString();
  };

  const handleAddLink = useCallback(
    (data: { title: string; url: string }) => {
      const newLink: Link = {
        id: generateId(),
        title: data.title,
        url: data.url,
        visitCount: 0,
      };

      setLinks((prev) => [newLink, ...prev]);
    },
    []
  );

  const handleDeleteLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  const handleLinkVisit = useCallback((id: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, visitCount: link.visitCount + 1 } : link
      )
    );
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Link Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create, organize, and track your important links
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl">
        <LinkForm onSubmit={handleAddLink} />
      </div>

      {/* Links List Section */}
      <LinkList
        links={links}
        onDelete={handleDeleteLink}
        onVisit={handleLinkVisit}
        isLoading={isLoading}
      />
    </div>
  );
}
