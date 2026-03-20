"use client";

import React from "react";
import { LinkForm } from "@/app/components/LinkForm";
import { LinkList } from "@/app/components/LinkList";
import { useLinkManagement } from "./useLinkManagement";

export default function LinkManagementPage() {
  const {
    links,
    isLoading,
    isSubLoading,
    error,
    setError,
    handleAddLink,
    handleDeleteLink,
    handleLinkVisit,
  } = useLinkManagement();

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
