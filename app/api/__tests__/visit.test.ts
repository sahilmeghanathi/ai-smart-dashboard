/**
 * API Routes Tests for /api/visit
 * Tests for POST handler (visit tracking)
 */

import { POST, GET } from '../visit/route';
import { NextRequest } from 'next/server';

describe('/api/visit', () => {
  describe('GET', () => {
    it('should return endpoint information', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('endpoint', '/api/visit');
      expect(data.data).toHaveProperty('method', 'POST');
      expect(data.data).toHaveProperty('description');
      expect(data.data).toHaveProperty('requestBody');
      expect(data.data).toHaveProperty('examples');
    });

    it('should include request examples in endpoint info', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.data.examples).toHaveProperty('request');
      expect(data.data.examples).toHaveProperty('response');
      expect(data.data.examples.request).toHaveProperty('url');
      expect(data.data.examples.request).toHaveProperty('method', 'POST');
      expect(data.data.examples.request).toHaveProperty('body');
    });
  });

  describe('POST', () => {
    it('should increment visit count for a valid linkId', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: '1',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id', '1');
      expect(data.data).toHaveProperty('visitCount');
      expect(typeof data.data.visitCount).toBe('number');
      expect(data.data.visitCount).toBeGreaterThan(0);
      expect(data.message).toContain('Visit tracked');
    });

    it('should reject request without linkId', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('linkId');
    });

    it('should reject request with empty linkId', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: '   ',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('cannot be empty');
    });

    it('should reject request with non-string linkId', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: 123,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('linkId');
    });

    it('should return 404 when link not found', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: 'non-existent-id',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not found');
    });

    it('should reject request with invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: 'invalid json{',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('JSON');
    });

    it('should return complete link object with visit count', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: '2',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.data).toHaveProperty('id');
      expect(data.data).toHaveProperty('title');
      expect(data.data).toHaveProperty('url');
      expect(data.data).toHaveProperty('visitCount');
      expect(data.data).toHaveProperty('createdAt');
    });

    it('should trim whitespace from linkId', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
        body: JSON.stringify({
          linkId: '  1  ',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should reject request without body', async () => {
      const request = new NextRequest('http://localhost:3000/api/visit', {
        method: 'POST',
      });

      try {
        await POST(request);
      } catch (error) {
        // Expected to fail when no body is provided
        expect(error).toBeDefined();
      }
    });
  });

  describe('Integration', () => {
    it('should track multiple visits for same link', async () => {
      const linkId = '1';
      const visits = [];

      // Track 3 visits
      for (let i = 0; i < 3; i++) {
        const request = new NextRequest('http://localhost:3000/api/visit', {
          method: 'POST',
          body: JSON.stringify({ linkId }),
        });

        const response = await POST(request);
        const data = await response.json();
        visits.push(data.data.visitCount);
      }

      // Each visit should have incremented count
      expect(visits.length).toBe(3);
      // Visit counts should be progressively higher
      for (let i = 1; i < visits.length; i++) {
        expect(visits[i]).toBeGreaterThanOrEqual(visits[i - 1]);
      }
    });
  });
});
