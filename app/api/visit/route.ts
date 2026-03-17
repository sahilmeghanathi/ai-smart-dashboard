import { NextRequest, NextResponse } from 'next/server';
import { incrementVisitCount, getLinkById } from '@/app/lib/links-storage';

/**
 * Request body for tracking a visit
 */
interface TrackVisitRequest {
  linkId: string;
}

/**
 * Validates track visit request
 */
function validateTrackVisitRequest(body: unknown): {
  valid: boolean;
  error?: string;
  data?: TrackVisitRequest;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }

  const { linkId } = body as Record<string, unknown>;

  if (!linkId || typeof linkId !== 'string') {
    return { valid: false, error: 'linkId is required and must be a string' };
  }

  if (linkId.trim().length === 0) {
    return { valid: false, error: 'linkId cannot be empty' };
  }

  return { valid: true, data: { linkId: linkId.trim() } };
}

/**
 * POST /api/visit
 * Track a visit for a specific link by incrementing its visit count
 * 
 * Request body:
 * {
 *   "linkId": "link-id-string"
 * }
 * 
 * Response (200):
 * {
 *   "success": true,
 *   "data": { Link object with updated visitCount },
 *   "message": "Visit tracked successfully"
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validation = validateTrackVisitRequest(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const { linkId } = validation.data!;

    // Check if link exists
    const existingLink = getLinkById(linkId);
    if (!existingLink) {
      return NextResponse.json(
        {
          success: false,
          error: 'Link not found',
        },
        { status: 404 }
      );
    }

    // Increment visit count
    const updatedLink = incrementVisitCount(linkId);

    if (!updatedLink) {
      return NextResponse.json(
        {
          success: false,
          error: 'Link not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedLink,
        message: 'Visit tracked successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error tracking visit:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track visit',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/visit
 * Returns information about the visit tracking endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: true,
      data: {
        endpoint: '/api/visit',
        method: 'POST',
        description: 'Track a visit for a link by incrementing its visit count',
        requestBody: {
          linkId: 'string (required) - The ID of the link to track visit for',
        },
        examples: {
          request: {
            url: 'http://localhost:3000/api/visit',
            method: 'POST',
            body: {
              linkId: '1',
            },
          },
          response: {
            success: true,
            data: {
              id: '1',
              title: 'Next.js Documentation',
              url: 'https://nextjs.org/docs',
              visitCount: 13,
              createdAt: '2025-03-01T00:00:00.000Z',
            },
            message: 'Visit tracked successfully',
          },
        },
      },
    },
    { status: 200 }
  );
}
