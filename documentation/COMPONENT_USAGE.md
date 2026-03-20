# Component Usage Guide

This file provides quick copy-paste examples for using the dashboard components.

## Quick Start

### 1. Import Components
```typescript
// Use the barrel export for cleaner imports
import { 
  Sidebar, 
  Header, 
  UserProfile, 
  DashboardIcon,
  SettingsIcon 
} from '@/app/components';
```

---

## Component Examples

### Header Component
```typescript
import { Header } from '@/app/components';

export default function MyPage() {
  return (
    <Header 
      title="Analytics Dashboard"
      onMenuClick={() => console.log('Menu clicked')}
    />
  );
}
```

### Sidebar Component (with State)
```typescript
'use client';
import { useState } from 'react';
import { Sidebar } from '@/app/components';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        logo="🎯"
        companyName="My Company"
      >
        <div className="text-xs text-gray-500">
          © 2024 My Company v1.0
        </div>
      </Sidebar>
      
      <div className="flex-1">
        {/* Content */}
      </div>
    </div>
  );
}
```

### UserProfile Component
```typescript
import { UserProfile } from '@/app/components';

export default function MyHeader() {
  return (
    <header className="flex justify-end p-4">
      <UserProfile 
        userName="Jane Smith"
        userEmail="jane@company.com"
      />
    </header>
  );
}
```

### Icons Component
```typescript
import { 
  DashboardIcon, 
  LinksIcon, 
  SettingsIcon,
  UserIcon 
} from '@/app/components';

export default function IconShowcase() {
  return (
    <div className="flex gap-4">
      <DashboardIcon className="w-8 h-8 text-blue-600" />
      <LinksIcon className="w-8 h-8 text-green-600" />
      <SettingsIcon className="w-8 h-8 text-red-600" />
      <UserIcon className="w-8 h-8 text-purple-600" />
    </div>
  );
}
```

---

## Common Customizations

### Add New Navigation Item
1. Open `app/components/SidebarNav.tsx`
2. Create a new icon in `Icons.tsx` (if needed)
3. Add to `navItems` array:

```typescript
// app/components/SidebarNav.tsx
import { AnalyticsIcon } from './Icons'; // Add your icon

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
  },
  // Add new item
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: AnalyticsIcon,
  },
  // ... rest of items
];
```

### Custom Color Scheme
Replace Tailwind color classes:
```typescript
// Before (Blue theme)
className="bg-blue-600 hover:bg-blue-700"

// After (Purple theme)
className="bg-purple-600 hover:bg-purple-700"

// After (Green theme)
className="bg-emerald-600 hover:bg-emerald-700"
```

Available Tailwind colors: `blue`, `green`, `red`, `purple`, `indigo`, `cyan`, `amber`, `orange`, `pink`, etc.

### Modify Header Layout
```typescript
// app/components/Header.tsx
// Add search bar
<div className="flex items-center gap-4">
  <input 
    type="text" 
    placeholder="Search..."
    className="px-4 py-2 rounded-lg border dark:bg-gray-800"
  />
  <UserProfile />
</div>
```

### Styled Stats Card
Create a reusable stat component:

```typescript
// app/components/StatCard.tsx
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp = true,
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </p>
        {trend && (
          <p className={`text-sm mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}%
          </p>
        )}
      </div>
      {icon && <span className="text-4xl">{icon}</span>}
    </div>
  </div>
);

// Usage
<StatCard 
  title="Revenue" 
  value="$24,500" 
  icon="💰"
  trend={12.5}
  trendUp={true}
/>
```

### Dark Mode Toggle
```typescript
// app/components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

---

## Layout Patterns

### Full Dashboard Layout
```typescript
// app/dashboard/layout.tsx
'use client';
import { useState } from 'react';
import { Sidebar, Header } from '@/app/components';

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        {/* Optional: Add sidebar footer content */}
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Two Column Layout
```typescript
export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Main content - 2/3 width on desktop */}
      </div>
      <div>
        {/* Sidebar content - 1/3 width on desktop */}
      </div>
    </div>
  );
}
```

### Card Grid
```typescript
export default function CardsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <div 
          key={item.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          {/* Card content */}
        </div>
      ))}
    </div>
  );
}
```

---

## Form Patterns

### Basic Form
```typescript
'use client';
import { useState } from 'react';

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
```

### Checkbox Form
```typescript
'use client';
import { useState } from 'react';

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
  });

  const handleToggle = (field: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-3">
      {Object.entries(preferences).map(([key, value]) => (
        <label key={key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value}
            onChange={() => handleToggle(key)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </span>
        </label>
      ))}
    </div>
  );
}
```

---

## Data Loading Patterns

### Server Component (Recommended)
```typescript
// app/dashboard/analytics/page.tsx
// This is a server component by default

async function getAnalytics() {
  const res = await fetch('https://api.example.com/analytics', {
    next: { revalidate: 60 } // Cache for 60 seconds
  });
  return res.json();
}

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <div>
      {/* Use data directly */}
    </div>
  );
}
```

### Client Component with useEffect
```typescript
'use client';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {/* Render data */}
    </div>
  );
}
```

---

## Type Definitions

### Add to `app/types/index.ts`
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DashboardStats {
  title: string;
  value: string | number;
  trend?: number;
  icon?: string;
}
```

---

## Debugging Tips

### Check Active Route
```typescript
'use client';
import { usePathname } from 'next/navigation';

export default function Component() {
  const pathname = usePathname();
  console.log('Current path:', pathname);
  // Output: /dashboard, /dashboard/settings, etc.
}
```

### Print Component Props
```typescript
interface ComponentProps {
  title: string;
  [key: string]: any;
}

export default function Component(props: ComponentProps) {
  console.log('Component props:', props);
  return <div>{props.title}</div>;
}
```

---

## Performance Optimization

### Memoize Components
```typescript
import { memo } from 'react';

const StatCard = memo(({ title, value }: Props) => (
  <div className="bg-white p-6 rounded-lg">
    {title}: {value}
  </div>
));

export default StatCard;
```

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Don't server-render
});

export default function Page() {
  return <HeavyChart />;
}
```

---

Happy building! 🚀
