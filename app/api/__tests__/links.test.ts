/**
 * API Routes Tests for /api/links
 * Tests for GET, POST, DELETE, and PATCH handlers
 */

import { GET, POST, DELETE as deleteLink, PATCH } from '../links/route';
import { NextRequest } from 'next/server';

describe('/api/links', () => {
  describe('GET', () => {
    it('should return all links', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.count).toBeGreaterThanOrEqual(0);
    });

    it('should return links with correct structure', async () => {
      const response = await GET();
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
  });

  describe('POST', () => {
    it('should create a new link with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Link',
          url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.title).toBe('Test Link');
      expect(data.data.url).toBe('https://example.com');
      expect(data.data.visitCount).toBe(0);
    });

    it('should reject request without title', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Title');
    });

    it('should reject request without URL', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Link',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('URL');
    });

    it('should reject request with invalid URL', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Link',
          url: 'not-a-valid-url',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('valid URL');
    });

    it('should reject request with empty title', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          title: '   ',
          url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('empty');
    });

    it('should reject request with invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: 'invalid json{',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('JSON');
    });

    it('should trim title whitespace', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'POST',
        body: JSON.stringify({
          title: '  Test Link  ',
          url: 'https://example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.data.title).toBe('Test Link');
    });
  });

  describe('DELETE', () => {
    it('should delete a link by ID', async () => {
      // First, get the links to find an ID
      const getResponse = await GET();
      const getData = await getResponse.json();

      if (getData.data.length > 0) {
        const linkId = getData.data[0].id;

        const request = new NextRequest(
          `http://localhost:3000/api/links?id=${linkId}`,
          {
            method: 'DELETE',
          }
        );

        const response = await deleteLink(request);
        const data = await response.json();

        expect([200, 404]).toContain(response.status);
        if (response.status === 200) {
          expect(data.success).toBe(true);
          expect(data.data.id).toBe(linkId);
        }
      }
    });

    it('should return 400 when ID is not provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'DELETE',
      });

      const response = await deleteLink(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('ID');
    });

    it('should return 404 when link not found', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/links?id=non-existent-id',
        {
          method: 'DELETE',
        }
      );

      const response = await deleteLink(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not found');
    });
  });

  describe('PATCH', () => {
    it('should increment visit count', async () => {
      // First, get the links to find an ID
      const getResponse = await GET();
      const getData = await getResponse.json();

      if (getData.data.length > 0) {
        const linkId = getData.data[0].id;
        const initialCount = getData.data[0].visitCount;

        const request = new NextRequest(
          `http://localhost:3000/api/links?id=${linkId}`,
          {
            method: 'PATCH',
          }
        );

        const response = await PATCH(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.data.visitCount).toBe(initialCount + 1);
      }
    });

    it('should return 400 when ID is not provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/links', {
        method: 'PATCH',
      });

      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('ID');
    });

    it('should return 404 when link not found', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/links?id=non-existent-id',
        {
          method: 'PATCH',
        }
      );

      const response = await PATCH(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not found');
    });
  });
});
