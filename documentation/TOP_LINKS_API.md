# Top Links API Documentation

## Endpoint

```
GET /api/links/top
```

## Purpose

Retrieve the most visited links, sorted by visit count in descending order. Useful for analytics, dashboards, and trending content.

## Request

### Method
```
GET
```

### Query Parameters

| Parameter | Type   | Default | Max | Description              |
|-----------|--------|---------|-----|--------------------------|
| limit     | number | 5       | 100 | Number of links to return |

### Examples

```bash
# Get top 5 links (default)
GET http://localhost:3000/api/links/top

# Get top 3 links
GET http://localhost:3000/api/links/top?limit=3

# Get top 10 links
GET http://localhost:3000/api/links/top?limit=10

# Get top 1 link (most visited)
GET http://localhost:3000/api/links/top?limit=1
```

## Response

### Success (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Next.js Documentation",
      "url": "https://nextjs.org/docs",
      "visitCount": 42,
      "createdAt": "2025-03-01T00:00:00.000Z"
    },
    {
      "id": "2",
      "title": "React Official",
      "url": "https://react.dev",
      "visitCount": 35,
      "createdAt": "2025-03-05T00:00:00.000Z"
    }
  ],
  "count": 2,
  "limit": 5
}
```

### Error Responses

#### 400 Bad Request - Invalid limit

```json
{
  "success": false,
  "error": "limit must be a valid number"
}
```

```json
{
  "success": false,
  "error": "limit must be at least 1"
}
```

```json
{
  "success": false,
  "error": "limit must be at most 100"
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Failed to fetch top links"
}
```

## Response Fields

| Field   | Type    | Description                           |
|---------|---------|---------------------------------------|
| success | boolean | Indicates if request succeeded        |
| data    | array   | Array of link objects, sorted by visits |
| count   | number  | Number of links returned              |
| limit   | number  | Requested limit value                 |
| error   | string  | Error message (on failure)            |

### Link Object

| Field      | Type   | Description                    |
|------------|--------|--------------------------------|
| id         | string | Unique link identifier         |
| title      | string | Link title                     |
| url        | string | Link URL                       |
| visitCount | number | Total number of visits         |
| createdAt  | string | ISO 8601 timestamp of creation |

## Usage Examples

### JavaScript / TypeScript

```typescript
import type { LinkListResponse } from '@/app/api/types';

// Get top 5 links
async function getTopLinks(limit: number = 5) {
  try {
    const response = await fetch(`/api/links/top?limit=${limit}`);
    const data: LinkListResponse = await response.json();

    if (data.success) {
      console.log(`Top ${data.count} links by visits:`);
      data.data?.forEach((link, index) => {
        console.log(`${index + 1}. ${link.title} (${link.visitCount} visits)`);
      });
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Failed to fetch top links:', error);
  }
}

// Usage
getTopLinks(5);
getTopLinks(10);
```

### React Component

```typescript
import { useEffect, useState } from 'react';
import type { Link, LinkListResponse } from '@/app/api/types';

export function TopLinksWidget() {
  const [topLinks, setTopLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTopLinks = async () => {
      try {
        const response = await fetch('/api/links/top?limit=5');
        const data: LinkListResponse = await response.json();

        if (data.success && data.data) {
          setTopLinks(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch top links');
      } finally {
        setLoading(false);
      }
    };

    fetchTopLinks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Top 5 Most Visited Links</h2>
      <ol>
        {topLinks.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
            <span> - {link.visitCount} visits</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

### CURL

```bash
# Get top 5 links
curl http://localhost:3000/api/links/top

# Get top 3 links
curl http://localhost:3000/api/links/top?limit=3

# Get most visited link
curl http://localhost:3000/api/links/top?limit=1 | jq '.data[0]'
```

## Parameter Validation

| Input | Result |
|-------|--------|
| (no limit) | Uses default of 5 |
| `limit=1` | Returns 1 link |
| `limit=5` | Returns up to 5 links |
| `limit=50` | Returns up to 50 links |
| `limit=100` | Returns up to 100 links (maximum) |
| `limit=0` | Error: must be at least 1 |
| `limit=-5` | Error: must be at least 1 |
| `limit=101` | Error: must be at most 100 |
| `limit=abc` | Error: must be a valid number |
| `limit=3.7` | Parsed as 3 (integer) |

## Sorting Behavior

Links are sorted by `visitCount` in **descending order** (highest visits first):

```
Link A: 42 visits  ← First
Link B: 35 visits
Link C: 28 visits
Link D: 15 visits
Link E: 10 visits  ← Fifth
```

## Real-World Use Cases

### 1. Analytics Dashboard
```typescript
// Show trending links on admin dashboard
const response = await fetch('/api/links/top?limit=10');
```

### 2. Leaderboard
```typescript
// Display top 20 most popular links
const response = await fetch('/api/links/top?limit=20');
```

### 3. Trending Section
```typescript
// Show top 3 trending links on homepage
const response = await fetch('/api/links/top?limit=3');
```

### 4. Performance Monitoring
```typescript
// Check if most visited link is still up
const response = await fetch('/api/links/top?limit=1');
const mostVisited = response.data[0];
// Perform health check on mostVisited.url
```

### 5. Content Recommendations
```typescript
// Recommend top 5 links to users
const response = await fetch('/api/links/top?limit=5');
// Display as "Popular Links" section
```

## Performance Considerations

- **Algorithm**: O(n log n) due to sorting all links
- **Scaling**: Suitable for thousands of links
- **Optimization**: Consider caching results for high-traffic scenarios
- **Database**: Consider adding database indexes on `visitCount` for production

## Production Recommendations

### 1. Caching
```typescript
// Cache top links for 5 minutes
const CACHE_TTL = 5 * 60 * 1000;
let cachedTopLinks = null;
let cacheTime = 0;

if (Date.now() - cacheTime < CACHE_TTL) {
  return cachedTopLinks;
}
```

### 2. Database Optimization
```sql
-- Add index on visits for faster sorting
CREATE INDEX idx_visit_count ON links(visitCount DESC);
```

### 3. Rate Limiting
```typescript
// Rate limit public analytics endpoints
// E.g., 100 requests per minute
```

### 4. Time Window Analysis
```typescript
// Get top links in last 7 days
GET /api/links/top?limit=5&since=7d

// Get top links in last 30 days
GET /api/links/top?limit=5&since=30d
```

### 5. Pagination
```typescript
// For very large datasets
GET /api/links/top?limit=10&offset=0
GET /api/links/top?limit=10&offset=10
```

## Related Endpoints

- [GET /api/links](API_DOCUMENTATION.md#1-get-apilinks) - Fetch all links
- [POST /api/links](API_DOCUMENTATION.md#2-post-apilinks) - Create link
- [POST /api/visit](VISIT_TRACKING_API.md) - Track a visit

## Testing

Comprehensive test suite included in `app/api/__tests__/top-links.test.ts`:

- ✅ Default limit (5)
- ✅ Custom limit
- ✅ Sorting verification
- ✅ Limit validation (1-100)
- ✅ Error handling (invalid, out of range)
- ✅ Response format validation
- ✅ Edge cases

Run tests with:
```bash
npm test -- app/api/__tests__/top-links.test.ts
```

## Notes

- Visit count is sorted in descending order (most visited first)
- Returns fewer than requested items if not enough links exist
- Does not include links with 0 visits unless no other links exist
- Limit values are validated strictly (must be 1-100)
- Response always includes `count` and `limit` for clarity
