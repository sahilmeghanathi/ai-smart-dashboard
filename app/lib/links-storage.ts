/**
 * In-memory storage for links
 * Shared across API routes
 * In production, replace with database
 */

export interface Link {
  id: string;
  title: string;
  url: string;
  visitCount: number;
  createdAt: string;
}

/**
 * In-memory storage instance
 * Stores all links with their data
 */
let links: Link[] = [
  {
    id: '1',
    title: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    visitCount: 12,
    createdAt: new Date('2025-03-01').toISOString(),
  },
  {
    id: '2',
    title: 'React Official',
    url: 'https://react.dev',
    visitCount: 8,
    createdAt: new Date('2025-03-05').toISOString(),
  },
];

/**
 * Get all links
 */
export function getAllLinks(): Link[] {
  return [...links];
}

/**
 * Get link by ID
 */
export function getLinkById(id: string): Link | undefined {
  return links.find((link) => link.id === id);
}

/**
 * Create new link
 */
export function createLink(newLink: Link): Link {
  links.unshift(newLink);
  return newLink;
}

/**
 * Delete link by ID
 */
export function deleteLink(id: string): Link | undefined {
  const index = links.findIndex((link) => link.id === id);
  if (index === -1) return undefined;
  const [deleted] = links.splice(index, 1);
  return deleted;
}

/**
 * Increment visit count for a link
 */
export function incrementVisitCount(id: string): Link | undefined {
  const link = links.find((link) => link.id === id);
  if (!link) return undefined;
  link.visitCount += 1;
  return { ...link };
}

/**
 * Update link
 */
export function updateLink(id: string, updates: Partial<Link>): Link | undefined {
  const index = links.findIndex((link) => link.id === id);
  if (index === -1) return undefined;
  links[index] = { ...links[index], ...updates };
  return { ...links[index] };
}
