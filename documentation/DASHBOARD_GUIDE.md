# Smart Dashboard - Project Structure & Guide

## Project Overview
A modern, responsive admin dashboard built with:
- **Framework**: Next.js 16.1.7 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Features**: Sidebar navigation, responsive header, modular components

---

## Folder Structure

```
ai-smart-dashboard/
├── app/
│   ├── components/
│   │   ├── Icons.tsx                 # Icon library (SVG components)
│   │   ├── UserProfile.tsx           # User profile dropdown menu
│   │   ├── Header.tsx                # Main header with title & user icon
│   │   ├── Sidebar.tsx               # Sidebar shell (responsive)
│   │   ├── SidebarNav.tsx            # Navigation items & active states
│   │   └── index.ts                  # Barrel export for components
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                # Dashboard layout (sidebar + header)
│   │   ├── page.tsx                  # Dashboard home page
│   │   ├── links/
│   │   │   └── page.tsx              # Links page (resource hub)
│   │   └── settings/
│   │       └── page.tsx              # Settings page (form example)
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home (redirects to /dashboard)
│   └── globals.css                   # Tailwind CSS config
│
├── .github/
│   ├── copilot-instructions.md       # This file
│   ├── agents/                       # (For custom AI agents)
│   ├── prompts/                      # (For custom prompts)
│   └── ai-tasks/                     # (For task automation)
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts                # Tailwind config
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

---

## Component Architecture

### 1. **Icons.tsx** - Reusable SVG Icons
Location: `app/components/Icons.tsx`

Exported icons:
- `DashboardIcon` - Dashboard page icon
- `LinksIcon` - Links/Resources icon
- `SettingsIcon` - Settings gear icon
- `MenuIcon` - Mobile menu toggle
- `CloseIcon` - Close/X icon
- `UserIcon` - User avatar
- `LogoutIcon` - Logout icon

All icons accept `className` and `size` props for customization.

```typescript
import { DashboardIcon } from '@/app/components';

<DashboardIcon className="w-6 h-6" />
```

### 2. **UserProfile.tsx** - User Menu Component
Location: `app/components/UserProfile.tsx`

Features:
- Dropdown menu with user info
- Profile/Preferences/Sign Out options
- Responsive design
- Dark mode support

Props:
```typescript
interface UserProfileProps {
  userName?: string;        // Default: "John Doe"
  userEmail?: string;       // Default: "john@example.com"
}
```

### 3. **Header.tsx** - Main Header
Location: `app/components/Header.tsx`

Features:
- Responsive header with title
- Mobile menu button
- User profile integration
- Dark mode support

Props:
```typescript
interface HeaderProps {
  title: string;
  onMenuClick?: () => void;  // Callback for mobile menu toggle
}
```

### 4. **Sidebar.tsx** - Navigation Sidebar
Location: `app/components/Sidebar.tsx`

Features:
- Fixed on desktop, toggle on mobile
- Responsive with overlay on mobile
- Company logo & name
- Footer slot for additional content
- Smooth transitions

Props:
```typescript
interface SidebarProps {
  isOpen?: boolean;          // Default: true
  onClose?: () => void;      // Callback for close button
  logo?: string;             // Default: "📊"
  companyName?: string;      // Default: "Smart Dashboard"
  children?: ReactNode;      // Footer content
}
```

### 5. **SidebarNav.tsx** - Navigation Items
Location: `app/components/SidebarNav.tsx`

Features:
- Active page highlighting
- Icon + label for each nav item
- Smooth transitions
- Dark mode support

Navigation Items:
- Dashboard → `/dashboard`
- Links → `/dashboard/links`
- Settings → `/dashboard/settings`

---

## Layout Hierarchy

```
├── Root Layout (app/layout.tsx)
│   └── Home Page (app/page.tsx) → Redirects to /dashboard
│       
└── Dashboard Layout (app/dashboard/layout.tsx)
    ├── Sidebar Component
    │   └── SidebarNav Component
    ├── Header Component
    │   └── UserProfile Component
    │       └── Icons (UserIcon, LogoutIcon)
    └── Page Content
        ├── Dashboard Page (app/dashboard/page.tsx)
        ├── Links Page (app/dashboard/links/page.tsx)
        └── Settings Page (app/dashboard/settings/page.tsx)
```

---

## Page Details

### Dashboard Page (`/dashboard`)
- Welcome banner with user greeting
- Stats grid (4 responsive columns)
- Charts section (placeholder + recent activity)
- Ready for integration with charting libraries

### Links Page (`/dashboard/links`)
- Organized resource categories
- Card-based layout
- Example categories: Documentation, Resources, Community
- Customizable links

### Settings Page (`/dashboard/settings`)
- Appearance settings (theme selection)
- Notification preferences
- Security options (2FA toggle)
- Form state management example
- Save/Cancel actions

---

## Styling Features

### Tailwind CSS Integration
- **Color Scheme**: Blue primary with gray neutrals
- **Dark Mode**: Full dark mode support via `dark:` prefix
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints
- **Components**: Rounded corners, shadows, transitions

### Breakpoints Used
- `md:` (768px) - Tablet
- `lg:` (1024px) - Desktop

### Color Palette
- **Primary**: Blue (#2563eb)
- **Neutrals**: Gray (#6b7280)
- **Backgrounds**: White/Black depending on theme
- **Accents**: Red for destructive actions

---

## How to Use

### 1. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) - redirects to `/dashboard`

### 2. Customize Components

#### Change Dashboard Title
In `app/dashboard/layout.tsx`:
```typescript
<Header
  title="My Custom Dashboard"
  onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
/>
```

#### Change Company Branding
In `app/dashboard/layout.tsx`:
```typescript
<Sidebar
  logo="🎯"                    // Change emoji
  companyName="My Company"     // Change name
>
  {/* Footer content */}
</Sidebar>
```

#### Add Navigation Items
Edit `app/components/SidebarNav.tsx`:
```typescript
const navItems: NavItem[] = [
  // Add your items here
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: AnalyticsIcon,
  },
];
```

#### Customize Colors
Tailwind uses inline utilities. To change color scheme:
- Search for `bg-blue-600` and replace with desired color
- Or use Tailwind's color customization in `tailwind.config.ts`

### 3. Add Dark Mode Toggle
Create a theme provider component:
```typescript
// app/components/ThemeProvider.tsx
'use client';
import { useEffect, useState } from 'react';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('auto');
  
  useEffect(() => {
    // Implement theme toggle logic
  }, [theme]);
  
  return <>{children}</>;
};
```

### 4. Integrate a Charting Library
For the charts placeholder in Dashboard, install a library:
```bash
npm install recharts
# or
npm install chart.js react-chartjs-2
```

Then replace the placeholder in `app/dashboard/page.tsx`.

### 5. Connect Real Data
Replace mock data with API calls:
```typescript
'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    // Fetch data from your API
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);
  
  // Render with real data
}
```

---

## TypeScript Types

### Icon Component Props
```typescript
interface IconProps {
  className?: string;
  size?: number;
}
```

### Component Props Exported
Each component exports its interface for type safety:
```typescript
export interface HeaderProps { ... }
export interface SidebarProps { ... }
export interface UserProfileProps { ... }
```

---

## Responsive Breakpoints Reference

| Breakpoint | Size | When to Use |
|-----------|------|-----------|
| Mobile | < 768px | Single column layouts |
| Tablet (`md:`) | ≥ 768px | 2-column layouts |
| Desktop (`lg:`) | ≥ 1024px | Multi-column layouts |

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## Dark Mode Implementation

All components use Tailwind's dark mode prefix:
```jsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

To enable dark mode system-wide, update `html` element:
```html
<!-- Automatic based on system preference -->
<html class="dark">
```

---

## Next Steps

1. ✅ Dashboard layout created
2. ⏭️ Add authentication (NextAuth.js)
3. ⏭️ Connect to backend API
4. ⏭️ Add data visualization (Recharts)
5. ⏭️ Implement real user management
6. ⏭️ Add form validation (React Hook Form)
7. ⏭️ Set up testing (Jest + React Testing Library)

---

## Performance Tips

1. **Use `'use client'` for interactive components** ✓ (Already done)
2. **Lazy load heavy components**:
   ```typescript
   const UserProfile = dynamic(() => import('./UserProfile'));
   ```
3. **Optimize images** - Use Next.js Image component
4. **Enable Static Generation** - Mark pages as static where possible

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 19 Release](https://react.dev/blog/2024/12/19/react-19)

---

## Author Notes

This dashboard template provides:
- ✅ Clean, modular component structure
- ✅ Full TypeScript support
- ✅ Responsive mobile/tablet/desktop design
- ✅ Dark mode ready
- ✅ Reusable component library
- ✅ Example pages with real layouts

Happy building! 🚀
