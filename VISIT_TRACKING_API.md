# Visit Tracking API Documentation

## Endpoint

```
POST /api/visit
```

## Purpose

Track visits for links by incrementing their visit count. This endpoint provides a dedicated way to record when users click on or visit links managed by the system.

## Request

### Method
```
POST
```

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "linkId": "string (required)"
}
```

### Parameters

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| linkId    | string | Yes      | The ID of the link |

### Validation

- `linkId` must be a non-empty string
- `linkId` is trimmed of whitespace
- Link with given ID must exist

## Response

### Success (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Next.js Documentation",
    "url": "https://nextjs.org/docs",
    "visitCount": 13,
    "createdAt": "2025-03-01T00:00:00.000Z"
  },
  "message": "Visit tracked successfully"
}
```

### Error Responses

#### 400 Bad Request - Missing linkId
```json
{
  "success": false,
  "error": "linkId is required and must be a string"
}
```

#### 400 Bad Request - Empty linkId
```json
{
  "success": false,
  "error": "linkId cannot be empty"
}
```

#### 400 Bad Request - Invalid JSON
```json
{
  "success": false,
  "error": "Invalid JSON in request body"
}
```

#### 404 Not Found - Link not found
```json
{
  "success": false,
  "error": "Link not found"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to track visit"
}
```

## Response Fields

| Field   | Type    | Description                      |
|---------|---------|----------------------------------|
| success | boolean | Indicates if request succeeded   |
| data    | object  | Updated link object (on success) |
| error   | string  | Error message (on failure)       |
| message | string  | Success message (on success)     |

### Link Object

| Field      | Type   | Description                   |
|------------|--------|-------------------------------|
| id         | string | Unique link identifier        |
| title      | string | Link title                    |
| url        | string | Link URL                      |
| visitCount | number | Total number of visits        |
| createdAt  | string | ISO 8601 timestamp of creation|

## Usage Examples

### JavaScript / TypeScript

```typescript
import type { LinkResponse } from '@/app/api/types';

// Track a visit for a link
async function trackVisit(linkId: string) {
  try {
    const response = await fetch('/api/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ linkId }),
    });

    const data: LinkResponse = await response.json();

    if (data.success) {
      console.log(`Visit tracked. New count: ${data.data?.visitCount}`);
    } else {
      console.error('Failed to track visit:', data.error);
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
}

// Usage
trackVisit('1');
```

### CURL

```bash
curl -X POST http://localhost:3000/api/visit \
  -H "Content-Type: application/json" \
  -d '{"linkId": "1"}'
```

### React Component

```typescript
import { useCallback } from 'react';
import type { LinkResponse } from '@/app/api/types';

export function LinkCard({ link }) {
  const handleLinkClick = useCallback(async () => {
    try {
      const response = await fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId: link.id }),
      });

      const data: LinkResponse = await response.json();

      if (data.success) {
        // Update local state or show notification
        console.log('Visit tracked');
      }

      // Open the link
      window.open(link.url, '_blank');
    } catch (error) {
      console.error('Error tracking visit:', error);
      // Still open the link even if tracking fails
      window.open(link.url, '_blank');
    }
  }, [link.id, link.url]);

  return (
    <a href={link.url} onClick={handleLinkClick}>
      {link.title}
    </a>
  );
}
```

## How It Works

1. Client sends POST request with linkId
2. Server validates the linkId parameter
3. Server checks if link exists in storage
4. Server increments the link's visitCount by 1
5. Server returns updated link object
6. Client receives updated visitCount

## Shared Storage

The visit tracking endpoint uses shared in-memory storage with other link management APIs:

- `/api/links` - Create, read, update, delete links
- `/api/visit` - Track visits for links

Both endpoints access the same storage module (`app/lib/links-storage.ts`), ensuring consistent visit counts across the application.

## Implementation Details

### File Structure

```
app/
├── api/
│   ├── visit/
│   │   └── route.ts          ← Visit tracking endpoint
│   ├── links/
│   │   └── route.ts          ← Link management endpoints
│   └── __tests__/
│       └── visit.test.ts     ← Visit tracking tests
└── lib/
    └── links-storage.ts      ← Shared in-memory storage
```

### Storage Functions Used

```typescript
// Get link by ID
const link = getLinkById(linkId);

// Increment visit count
const updatedLink = incrementVisitCount(linkId);
```

## Production Considerations

### Current Implementation
- **Storage**: In-memory JavaScript array
- **Persistence**: Data lost on server restart
- **Scaling**: Single-server only (no horizontal scaling)
- **Concurrency**: Limited by V8 event loop

### Production Recommendations

1. **Database Integration**
   - Replace in-memory storage with database
   - Use transactions for visit count increments
   - Add versioning/timestamps

2. **Analytics**
   - Store detailed visit logs (timestamp, user agent, IP)
   - Add visit events to analytics pipeline
   - Create visit statistics/reports

3. **Rate Limiting**
   - Prevent visit count manipulation
   - Implement rate limiting per IP/user
   - Add cooldown between visits

4. **Caching**
   - Cache popular links in Redis
   - Batch write visit counts to database
   - Implement cache invalidation

5. **Monitoring**
   - Track endpoint latency
   - Monitor for abuse patterns
   - Alert on unexpected visit spikes

## Related Endpoints

- [GET /api/links](API_DOCUMENTATION.md#1-get-apilinks) - Fetch all links
- [POST /api/links](API_DOCUMENTATION.md#2-post-apilinks) - Create link
- [DELETE /api/links?id={id}](API_DOCUMENTATION.md#3-delete-apilinksidasequal) - Delete link
- [PATCH /api/links?id={id}](API_DOCUMENTATION.md#4-patch-apilinksidasequal) - Update visit count (alternative to POST /api/visit)

## Testing

Comprehensive test suite included in `app/api/__tests__/visit.test.ts`:

- ✅ Successful visit tracking
- ✅ Missing linkId validation
- ✅ Empty linkId validation
- ✅ Invalid JSON handling
- ✅ Non-existent link handling
- ✅ Whitespace trimming
- ✅ Multiple visits tracking
- ✅ Complete response validation

Run tests with:
```bash
npm test -- app/api/__tests__/visit.test.ts
```

## Notes

- Visit count is incremented by exactly 1 per request
- No deduplication or fraud detection in basic implementation
- Consider implementing IP-based rate limiting for production
- Visit count is stored in memory (not persisted)
