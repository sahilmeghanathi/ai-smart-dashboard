# LinkCard Component Documentation

## Overview
`LinkCard` is a reusable component for displaying links with:
- Link title and URL
- Visit counter
- Delete functionality
- Responsive hover states
- Dark mode support

## Location
[app/components/LinkCard.tsx](../app/components/LinkCard.tsx)

---

## Props

```typescript
interface LinkCardProps {
  id: string;                           // Unique identifier
  title: string;                        // Link display title
  url: string;                          // Link URL
  visitCount: number;                   // Number of visits
  onDelete?: (id: string) => void;      // Delete callback
  onVisit?: (id: string) => void;       // Visit tracking callback
}
```

### Prop Details

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the link |
| `title` | `string` | ✅ | Display title (shown as link text) |
| `url` | `string` | ✅ | Full URL (opens in new tab) |
| `visitCount` | `number` | ✅ | Current visit count |
| `onDelete` | `function` | ❌ | Called when delete button clicked |
| `onVisit` | `function` | ❌ | Called when link is clicked |

---

## Features

### 1. Link Display
- Shows title as primary text
- Displays full URL below title
- Opens in new tab (`target="_blank"`)
- Truncates overflow with ellipsis
- Hover effect with blue color

### 2. Visit Counter
- Badge showing total visits
- Dynamic singular/plural ("visit" vs "visits")
- Blue accent background
- Always visible

### 3. Delete Button
- Hidden until hover (gradient reveal)
- Red danger styling
- Appears on group hover
- Smooth opacity transition
- Accessible label

### 4. Styling
- White background (dark: gray-800)
- Subtle border (gray-200 / gray-700)
- Hover shadow effect
- Responsive padding
- Full dark mode support

### 5. Accessibility
- Proper `aria-label` on buttons
- Semantic HTML structure
- Title attribute on truncated text
- Keyboard accessible

---

## Usage Examples

### Basic Usage (No Callbacks)
```typescript
<LinkCard
  id="1"
  title="Next.js Documentation"
  url="https://nextjs.org/docs"
  visitCount={24}
/>
```

### With Delete Handler
```typescript
'use client';
import { useState } from 'react';
import { LinkCard } from '@/app/components';

export default function LinksPage() {
  const [links, setLinks] = useState([/* ... */]);

  const handleDelete = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map(link => (
        <LinkCard
          key={link.id}
          id={link.id}
          title={link.title}
          url={link.url}
          visitCount={link.visitCount}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### With Visit Tracking
```typescript
const handleVisit = (id: string) => {
  setLinks(prev =>
    prev.map(link =>
      link.id === id 
        ? { ...link, visitCount: link.visitCount + 1 }
        : link
    )
  );
};

<LinkCard
  id={link.id}
  title={link.title}
  url={link.url}
  visitCount={link.visitCount}
  onVisit={handleVisit}
  onDelete={handleDelete}
/>
```

### In a Grid Layout
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {links.map(link => (
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
```

---

## Visual Layout

```
┌─────────────────────────────────────┐
│ [Title Text] [Delete Button]        │  ← Header (hover reveals delete)
│                                     │
│ https://example.com/path            │  ← URL (truncated)
│                                     │
│ 👁️ 24 visits                         │  ← Footer with counter
└─────────────────────────────────────┘
```

---

## Styling

### Colors
- **Background**: White (`bg-white`), Dark: Gray-800
- **Border**: Gray-200, Dark: Gray-700
- **Text**: Gray-900, Dark: White
- **URL**: Gray-500, Dark: Gray-400
- **Hover**: Blue highlight
- **Delete**: Red background

### Responsive
- Maintains fixed height
- Text truncation handles long titles/URLs
- Touch-friendly delete button size
- Grid-based layout for parent

### Dark Mode
Full dark mode support via `dark:` Tailwind prefix:
```css
bg-white dark:bg-gray-800
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700
```

---

## Behavior

### Link Click
- Opens URL in new tab
- Calls `onVisit` callback (if provided)
- Does not prevent link opening

### Delete Click
- Calls `onDelete` callback with link ID
- Prevents default link behavior
- Must handle removal in parent component

### Hover States
- Delete button appears (opacity: 0 → 100)
- Card shadow increases
- Link title color changes to blue
- Smooth transitions (all 200ms)

---

## Integration Points

### Import
```typescript
import { LinkCard } from '@/app/components';
```

### Or with Barrel Export
```typescript
import { LinkCard } from '@/app/components';
```

---

## Code Quality

✅ **TypeScript**
- Fully typed Props interface
- No `any` types
- Type-safe callbacks

✅ **React Best Practices**
- Functional component
- Proper event handlers
- No unnecessary re-renders

✅ **Accessibility**
- Semantic HTML
- Proper button labels
- Keyboard navigation

✅ **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Maintains usability at all sizes

✅ **Dark Mode**
- Full dark mode support
- All states covered
- Proper contrast

---

## Related Components

- [Icons.tsx](./Icons.tsx) - Icon library for SVG icons
- [Header.tsx](./Header.tsx) - Main header component
- [Sidebar.tsx](./Sidebar.tsx) - Navigation sidebar

---

## Example File

For complete working examples, see: [LinkCard.usage.tsx](./LinkCard.usage.tsx)

Examples include:
- Basic list
- Stateful management
- Categorized grouping
- API integration patterns

---

## Performance

- ~2KB component size
- No external dependencies
- Efficient re-renders with stable event handlers
- Optimized SVG icons (inline)

---

## TypeScript Types

Export for type definitions in other files:
```typescript
import type { LinkCardProps } from '@/app/components/LinkCard';
```

---

## Tips & Tricks

### Adding API Integration
```typescript
const handleDelete = async (id: string) => {
  try {
    await fetch(`/api/links/${id}`, { method: 'DELETE' });
    setLinks(prev => prev.filter(link => link.id !== id));
  } catch (error) {
    console.error('Failed to delete:', error);
  }
};
```

### Add Confirmation Dialog
```typescript
const handleDelete = (id: string) => {
  if (confirm('Delete this link?')) {
    setLinks(prev => prev.filter(link => link.id !== id));
  }
};
```

### Filter/Search Links
```typescript
const [searchTerm, setSearchTerm] = useState('');

const filteredLinks = links.filter(link =>
  link.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Sort by Visits
```typescript
const sortedLinks = [...links].sort((a, b) => b.visitCount - a.visitCount);
```

---

## Troubleshooting

### Delete button not appearing
- Ensure `onDelete` prop is passed
- Check parent div has `group` class
- Verify CSS is loading

### Visit count not updating
- Pass `onVisit` callback to LinkCard
- Make sure to update state correctly
- Check event is being triggered

### URL not opening
- Verify `url` prop is valid URL with protocol (http://)
- Check browser popup settings
- Ensure `target="_blank"` is not blocked

---

## Future Enhancements

- [ ] Drag-to-reorder
- [ ] Edit functionality
- [ ] Category assignment
- [ ] Analytics/stats view
- [ ] Copy URL button
- [ ] Share functionality
- [ ] Import/Export

---

## Version History

- **v1.0.0** - Initial release
  - Link display with title/URL
  - Visit counter
  - Delete button
  - Full dark mode support
