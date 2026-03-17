import React from 'react';

export default function LinksPage() {
  const linkCategories = [
    {
      name: 'Documentation',
      links: [
        { title: 'Getting Started', url: '#' },
        { title: 'API Reference', url: '#' },
        { title: 'FAQ', url: '#' },
      ],
    },
    {
      name: 'Resources',
      links: [
        { title: 'Blog', url: '#' },
        { title: 'Case Studies', url: '#' },
        { title: 'Webinars', url: '#' },
      ],
    },
    {
      name: 'Community',
      links: [
        { title: 'Discord', url: '#' },
        { title: 'GitHub', url: '#' },
        { title: 'Twitter', url: '#' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Links
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Quick access to important resources and documentation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linkCategories.map((category, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-linear-to-r from-blue-600 to-blue-800 p-4">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            </div>
            <div className="p-4 space-y-3">
              {category.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href={link.url}
                  className="block p-3 rounded bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
