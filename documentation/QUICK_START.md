# ⚡ Quick Start Guide

## 🚀 Get Started in 30 Seconds

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser
```
http://localhost:3000
```
*Automatically redirects to `/dashboard`*

---

## 📱 What You'll See

### Desktop View (≥1024px)
```
┌─────────────────────────────────────────────────┐
│  [Menu] Dashboard     |    [User Profile ▼]     │ ← Header
├──────────┬───────────────────────────────────────┤
│          │                                        │
│ • Dashboard                                      │
│ • Links                                          │
│ • Settings                                       │
│          │  Welcome back, John! 👋              │
│          │  [Stats: 1,234 | $24,500 | +12.5%...│
│          │                                        │
│          │  [Monthly Trends] [Recent Activity]  │
│          │                                        │
└──────────┴───────────────────────────────────────┘
```

### Mobile View (<768px)
```
┌─────────────────────────────┐
│ [≡] Dashboard  [User Profile]│ ← Header with menu toggle
├─────────────────────────────┤
│         ON MENU CLICK:      │
│  [X] Dashboard             │ ← Sidebar appears
│  [ ] Links                 │   (overlay)
│  [ ] Settings              │
├─────────────────────────────┤
│ Welcome back, John! 👋      │
│ [Stats fill screen]        │
│ [Charts below]             │
└─────────────────────────────┘
```

---

## 🗂️ File Organization Cheat Sheet

### Add New Page
```
1. Create: app/dashboard/newpage/page.tsx
2. Add to: SidebarNav.tsx navigation items
3. Done! 🎉
```

### Add New Icon
```
1. Create SVG component in: Icons.tsx
2. Export from: Icons.tsx
3. Use: import { NewIcon } from '@/app/components'
```

### Customize Colors
```
Find & Replace in components:
- bg-blue-600 → bg-purple-600
- text-blue-100 → text-purple-100
- Repeat for all color classes
```

### Add Dark Mode Toggle
```typescript
// app/components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
};
```

---

## 🔗 Navigation Routes

| Route | Component | File |
|-------|-----------|------|
| `/` | Home (Redirect) | `app/page.tsx` |
| `/dashboard` | Dashboard Home | `app/dashboard/page.tsx` |
| `/dashboard/links` | Links Page | `app/dashboard/links/page.tsx` |
| `/dashboard/settings` | Settings Page | `app/dashboard/settings/page.tsx` |

---

## 📚 Component Import Reference

```typescript
// All components available from one import:
import {
  Sidebar,
  Header,
  UserProfile,
  SidebarNav,
  DashboardIcon,
  LinksIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
} from '@/app/components';
```

---

## 🎨 Styling Quick Reference

### Common Tailwind Classes Used
```
Spacing:     p-4 (padding), m-2 (margin), gap-6 (spacing)
Size:        w-full, h-screen, w-64, h-8
Colors:      bg-blue-600, text-white, border-gray-200
Responsive:  md: (tablet), lg: (desktop)
Dark:        dark:bg-gray-800, dark:text-white
Hover:       hover:bg-gray-100, hover:shadow-lg
Rounded:     rounded-lg (border-radius)
```

---

## 🧪 Test Features

### Test Responsive Design
```
1. npm run dev
2. Open DevTools (F12)
3. Toggle between devices:
   - iPhone 12 (375px)
   - iPad (768px)
   - Desktop (1024px+)
```

### Test Dark Mode
```typescript
// In browser console:
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
```

### Test Mobile Menu
```
1. Open DevTools
2. Select mobile device
3. Click menu button (≡)
4. Should toggle sidebar
```

---

## 🔧 Common Tasks

### Change Dashboard Title
**File**: `app/dashboard/layout.tsx`
```typescript
<Header
  title="Analytics Dashboard"  // ← Change this
  onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
/>
```

### Change Company Logo
**File**: `app/dashboard/layout.tsx`
```typescript
<Sidebar
  logo="🎯"  // ← Change emoji
  companyName="My Company"
>
```

### Add a New Link Item
**File**: `app/dashboard/links/page.tsx`
```typescript
{
  title: 'My New Link',
  url: 'https://example.com'  // Add here
}
```

### Add a New Setting
**File**: `app/dashboard/settings/page.tsx`
```typescript
const [formData, setFormData] = useState({
  // ... existing settings
  myNewSetting: false,  // Add here
});
```

---

## 📊 Stats Card Template

Copy & paste to add new stat cards:

```typescript
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
        Title
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
        Value
      </p>
    </div>
    <span className="text-4xl">📊</span>
  </div>
</div>
```

---

## ✅ Verification Checklist

- [x] Project builds without errors: `npm run build`
- [x] All pages route correctly
- [x] Sidebar toggles on mobile
- [x] Header shows on all pages
- [x] User profile menu opens
- [x] Dark mode classes present
- [x] TypeScript compiles
- [x] Components export correctly

---

## 🐛 Common Issues & Fixes

### `Module not found` Error
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Sidebar doesn't toggle
Check that `dashboard/layout.tsx` has `'use client'` at the top

### Styles not applying
Make sure Tailwind CSS import in `globals.css`:
```css
@import "tailwindcss";
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit

# Fix imports
import type { ComponentProps } from 'react';
```

---

## 🚢 Deploy to Production

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Deploy automatically via Vercel Dashboard
# or use Vercel CLI:
npm install -g vercel
vercel
```

### Other Platforms
```bash
# Build first
npm run build

# Then deploy the .next folder
# (Follow platform-specific instructions)
```

---

## 📚 Documentation Links

- **Quick Start**: README.md
- **Full Guide**: DASHBOARD_GUIDE.md
- **Component Usage**: COMPONENT_USAGE.md
- **File Reference**: FILES_REFERENCE.md

---

## 💡 Tips & Tricks

### Quickly Add Pages
```bash
# Creates new route automatically:
mkdir -p app/dashboard/newpage
touch app/dashboard/newpage/page.tsx
# Add content and it works!
```

### Typography
```typescript
// Heading sizes
<h1 className="text-3xl font-bold">Title</h1>
<h2 className="text-2xl font-bold">Subtitle</h2>
<h3 className="text-lg font-semibold">Section</h3>
<p className="text-sm">Body text</p>
```

### Button Styles
```typescript
// Primary
<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">

// Secondary
<button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300">

// Danger
<button className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100">
```

---

## ⚡ Performance Tips

1. **Use Server Components** - Default is server (no `'use client'`)
2. **Lazy Load Images** - Use Next.js `Image` component
3. **Code Split** - Use dynamic imports for heavy components
4. **Cache API Calls** - Use `next: { revalidate: 60 }`

---

**That's it! You're ready to build. Happy coding! 🎉**

```
npm run dev  →  http://localhost:3000  →  Dashboard!
```
