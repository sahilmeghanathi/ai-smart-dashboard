# Link Management API Documentation

## Base URL
```
/api/links
```

## Endpoints

### 1. GET /api/links
Retrieve all links from the system.

**Parameters:**
- None

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Next.js Documentation",
      "url": "https://nextjs.org/docs",
      "visitCount": 12,
      "createdAt": "2025-03-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch links"
}
```

---

### 2. POST /api/links
Create a new link.

**Request Body:**
```json
{
  "title": "Link Title",
  "url": "https://example.com"
}
```

**Parameters:**
- `title` (string, required): Link title (max 200 characters)
- `url` (string, required): Valid URL

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "1710733200000",
    "title": "Link Title",
    "url": "https://example.com",
    "visitCount": 0,
    "createdAt": "2025-03-17T10:00:00.000Z"
  },
  "message": "Link created successfully"
}
```

**Error Responses:**

400 Bad Request:
```json
{
  "success": false,
  "error": "Title is required and must be a string"
}
```

```json
{
  "success": false,
  "error": "URL must be a valid URL"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "error": "Failed to create link"
}
```

---

### 3. DELETE /api/links?id={linkId}
Delete a link by its ID.

**Query Parameters:**
- `id` (string, required): The ID of the link to delete

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Link Title",
    "url": "https://example.com",
    "visitCount": 5,
    "createdAt": "2025-03-01T00:00:00.000Z"
  },
  "message": "Link deleted successfully"
}
```

**Error Responses:**

400 Bad Request (missing ID):
```json
{
  "success": false,
  "error": "Link ID is required as query parameter"
}
```

404 Not Found:
```json
{
  "success": false,
  "error": "Link not found"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "error": "Failed to delete link"
}
```

---

### 4. PATCH /api/links?id={linkId}
Increment the visit count for a link.

**Query Parameters:**
- `id` (string, required): The ID of the link

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Link Title",
    "url": "https://example.com",
    "visitCount": 13,
    "createdAt": "2025-03-01T00:00:00.000Z"
  },
  "message": "Link visit count updated"
}
```

**Error Responses:**

400 Bad Request (missing ID):
```json
{
  "success": false,
  "error": "Link ID is required as query parameter"
}
```

404 Not Found:
```json
{
  "success": false,
  "error": "Link not found"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "error": "Failed to update link"
}
```

---

## Data Types

### Link Object
```typescript
interface Link {
  id: string;              // Unique identifier (timestamp-based)
  title: string;           // Link title (max 200 characters)
  url: string;             // Valid URL
  visitCount: number;      // Number of times link was visited
  createdAt: string;       // ISO 8601 timestamp
}
```

### CreateLinkRequest
```typescript
interface CreateLinkRequest {
  title: string;  // Link title
  url: string;    // Valid URL
}
```

### ApiResponse
```typescript
interface ApiResponse<T> {
  success: boolean;   // Request success status
  data?: T;          // Response data
  error?: string;    // Error message if failed
  message?: string;  // Success message
  count?: number;    // Count for list responses
}
```

---

## Validation Rules

### Title
- Required string
- Cannot be empty or whitespace only
- Maximum 200 characters
- Whitespace is trimmed

### URL
- Required string
- Must be a valid URL format
- Examples: `https://example.com`, `http://localhost:3000`

---

## Error Handling

The API uses HTTP status codes to indicate success/failure:

| Status Code | Meaning |
|------------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or malformed request |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

---

## Usage Examples

### Create a Link (JavaScript/TypeScript)
```typescript
const response = await fetch('/api/links', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Next.js Docs',
    url: 'https://nextjs.org/docs',
  }),
});

const data = await response.json();
if (data.success) {
  console.log('Link created:', data.data);
}
```

### Fetch All Links
```typescript
const response = await fetch('/api/links');
const data = await response.json();
if (data.success) {
  console.log('Links:', data.data);
}
```

### Delete a Link
```typescript
const linkId = '1710733200000';
const response = await fetch(`/api/links?id=${linkId}`, {
  method: 'DELETE',
});

const data = await response.json();
if (data.success) {
  console.log('Link deleted');
}
```

### Track Link Visit
```typescript
const linkId = '1710733200000';
const response = await fetch(`/api/links?id=${linkId}`, {
  method: 'PATCH',
});

const data = await response.json();
if (data.success) {
  console.log('Visit count:', data.data.visitCount);
}
```

---

## Notes

- **In-Memory Storage**: Currently uses in-memory storage (JavaScript array). Data will be lost when the server restarts.
- **Production**: Replace with a database (PostgreSQL, MongoDB, etc.) for persistence.
- **Scaling**: Consider adding pagination for large link collections.
- **Authentication**: Add authentication/authorization for production use.
- **Rate Limiting**: Consider adding rate limiting for POST/DELETE requests.
- **Unique Constraint**: URL uniqueness is not currently enforced.

---

## Integration with Frontend

Import types from `app/api/types.ts`:

```typescript
import type { Link, CreateLinkRequest, LinkResponse } from '@/app/api/types';

// Use in components
const handleCreateLink = async (request: CreateLinkRequest) => {
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  
  const data: LinkResponse = await response.json();
  // ...
};
```
