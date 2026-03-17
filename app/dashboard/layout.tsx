'use client';

import React, { useState } from 'react';
import { Sidebar, Header } from '@/app/components';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        logo="📊"
        companyName="Dashboard"
      >
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 Smart Dashboard</p>
          <p>v1.0.0</p>
        </div>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Dashboard"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
