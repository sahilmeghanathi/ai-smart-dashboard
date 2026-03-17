'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { LinkForm } from '@/app/components/LinkForm';
import { LinkList } from '@/app/components/LinkList';
import type { Link, LinkResponse, LinkListResponse } from '@/app/api/types';

export default function LinkManagementPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isSubLoading, setIsSubLoading] = useState(false);

  // Fetch links from API on mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        
        const response = await fetch('/api/links');
        const data: LinkListResponse = await response.json();

        if (data.success && data.data) {
          setLinks(data.data);
        } else {
          setError('Failed to load links');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch links. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleAddLink = useCallback(
    async (data: { title: string; url: string }) => {
      try {
        setIsSubLoading(true);

        const response = await fetch('/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result: LinkResponse = await response.json();

        if (result.success && result.data) {
          const newLink = result.data;
          setLinks((prev) => [newLink, ...prev]);
        } else {
          setError(result.error || 'Failed to add link');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to add link. Please try again.'
        );
      } finally {
        setIsSubLoading(false);
      }
    },
    []
  );

  const handleDeleteLink = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/links?id=${id}`, {
        method: 'DELETE',
      });

      const data: LinkResponse = await response.json();

      if (data.success) {
        setLinks((prev) => prev.filter((link) => link.id !== id));
      } else {
        setError(data.error || 'Failed to delete link');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete link. Please try again.'
      );
    }
  }, []);

  const handleLinkVisit = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/links?id=${id}`, {
        method: 'PATCH',
      });

      const data: LinkResponse = await response.json();

      if (data.success && data.data) {
        const updatedLink = data.data;
        setLinks((prev) =>
          prev.map((link) =>
            link.id === id ? { ...link, visitCount: updatedLink.visitCount } : link
          )
        );
      }
    } catch (err) {
      console.error('Failed to track visit:', err);
    }
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

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-start justify-between">
            <div className="text-red-700 dark:text-red-400 text-sm">
              <p className="font-semibold mb-1">Error</p>
              <p>{error}</p>
            </div>
            <button
              onClick={() => setError(undefined)}
              className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-2xl">
        <LinkForm onSubmit={handleAddLink} isLoading={isSubLoading} />
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
