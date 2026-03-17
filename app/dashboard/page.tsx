import React from 'react';

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
        <p className="text-blue-100">
          You have 3 new notifications and your dashboard is up to date.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', value: '1,234', icon: '👥' },
          { title: 'Revenue', value: '$24,500', icon: '💰' },
          { title: 'Growth', value: '+12.5%', icon: '📈' },
          { title: 'Active Sessions', value: '456', icon: '⚡' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Trends
          </h3>
          <div className="h-64 bg-linear-to-b from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Chart placeholder - Add your charting library here
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'New user signup', time: '2 minutes ago' },
              { action: 'Payment processed', time: '15 minutes ago' },
              { action: 'Report generated', time: '1 hour ago' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span className="text-sm text-gray-900 dark:text-white">
                  {item.action}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
