/**
 * API Routes Tests for /api/links/top
 * Tests for GET handler (top links by visits)
 */

import { GET } from '../links/top/route';

describe('/api/links/top', () => {
  describe('GET', () => {
    it('should return top 5 links by default', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.limit).toBe(5);
      expect(data.count).toBeLessThanOrEqual(5);
    });

    it('should sort links by visit count in descending order', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      if (data.data.length > 1) {
        for (let i = 0; i < data.data.length - 1; i++) {
          expect(data.data[i].visitCount).toBeGreaterThanOrEqual(
            data.data[i + 1].visitCount
          );
        }
      }
    });

    it('should respect custom limit parameter', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=3');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.limit).toBe(3);
      expect(data.count).toBeLessThanOrEqual(3);
    });

    it('should include all link properties', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      if (data.data.length > 0) {
        const link = data.data[0];
        expect(link).toHaveProperty('id');
        expect(link).toHaveProperty('title');
        expect(link).toHaveProperty('url');
        expect(link).toHaveProperty('visitCount');
        expect(link).toHaveProperty('createdAt');
      }
    });

    it('should handle limit=1', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=1');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.count).toBeLessThanOrEqual(1);
    });

    it('should handle limit=10', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=10');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.limit).toBe(10);
      expect(data.count).toBeLessThanOrEqual(10);
    });

    it('should handle limit=100 (maximum)', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=100');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.limit).toBe(100);
    });

    it('should reject limit greater than 100', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=101');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('at most 100');
    });

    it('should reject limit less than 1', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=0');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('at least 1');
    });

    it('should reject negative limit', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=-5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('at least 1');
    });

    it('should reject non-numeric limit', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=abc');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('valid number');
    });

    it('should handle float limit by parsing as integer', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=3.7');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.limit).toBe(3);
    });

    it('should return empty array if no links exist (unlikely)', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data.data)).toBe(true);
    });

    it('should return count matching actual returned items', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=5');
      const response = await GET(request);
      const data = await response.json();

      expect(data.count).toBe(data.data.length);
    });

    it('should handle multiple query parameters gracefully', async () => {
      const request = new Request(
        'http://localhost:3000/api/links/top?limit=3&other=param'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.limit).toBe(3);
    });

    it('should return links with correct visit count order', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=2');
      const response = await GET(request);
      const data = await response.json();

      if (data.data.length >= 2) {
        expect(data.data[0].visitCount).toBeGreaterThanOrEqual(
          data.data[1].visitCount
        );
      }
    });

    it('should include limit in response metadata', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=3');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toHaveProperty('limit', 3);
      expect(data).toHaveProperty('count');
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('data');
    });
  });

  describe('Error Handling', () => {
    it('should handle large limit values', async () => {
      const request = new Request(
        'http://localhost:3000/api/links/top?limit=999999'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
    });

    it('should handle special characters in limit', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=!@#');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should handle limit with spaces', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit= 5 ');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.limit).toBe(5);
    });
  });

  describe('Response Format', () => {
    it('should always include success property', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      expect(data).toHaveProperty('success');
      expect(typeof data.success).toBe('boolean');
    });

    it('should have consistent response structure on success', async () => {
      const request = new Request('http://localhost:3000/api/links/top');
      const response = await GET(request);
      const data = await response.json();

      if (data.success) {
        expect(data).toHaveProperty('data');
        expect(data).toHaveProperty('count');
        expect(data).toHaveProperty('limit');
        expect(data).not.toHaveProperty('error');
      }
    });

    it('should have consistent response structure on error', async () => {
      const request = new Request('http://localhost:3000/api/links/top?limit=abc');
      const response = await GET(request);
      const data = await response.json();

      if (!data.success) {
        expect(data).toHaveProperty('error');
        expect(typeof data.error).toBe('string');
      }
    });
  });
});
