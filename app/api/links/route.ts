import { NextRequest, NextResponse } from 'next/server';
import {
  getAllLinks,
  getLinkById,
  createLink,
  deleteLink,
  incrementVisitCount,
  type Link,
} from '@/app/lib/links-storage';
import { validateCreateLinkRequest } from '@/app/lib/validation';

/**
 * Request body for creating a link
 */
interface CreateLinkRequest {
  title: string;
  url: string;
}

/**
 * GET /api/links
 * Returns all links
 */
export async function GET(): Promise<NextResponse> {
  try {
    const links = getAllLinks();
    return NextResponse.json(
      {
        success: true,
        data: links,
        count: links.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch links',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/links
 * Creates a new link
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validation = validateCreateLinkRequest(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Create new link
    const newLink: Link = {
      id: Date.now().toString(),
      title: data.title,
      url: data.url,
      visitCount: 0,
      createdAt: new Date().toISOString(),
    };

    // Add to storage
    const createdLink = createLink(newLink);

    return NextResponse.json(
      {
        success: true,
        data: createdLink,
        message: 'Link created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating link:', error);

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
        error: 'Failed to create link',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/links?id=linkId
 * Deletes a link by ID
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Link ID is required as query parameter',
        },
        { status: 400 }
      );
    }

    // Find link index
    const link = getLinkById(id);

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          error: 'Link not found',
        },
        { status: 404 }
      );
    }

    // Remove link
    const deletedLink = deleteLink(id);

    return NextResponse.json(
      {
        success: true,
        data: deletedLink,
        message: 'Link deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete link',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/links?id=linkId
 * Updates visit count for a link
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Link ID is required as query parameter',
        },
        { status: 400 }
      );
    }

    // Find link
    const link = getLinkById(id);

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          error: 'Link not found',
        },
        { status: 404 }
      );
    }

    // Increment visit count
    const updatedLink = incrementVisitCount(id);

    return NextResponse.json(
      {
        success: true,
        data: updatedLink,
        message: 'Link visit count updated',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update link',
      },
      { status: 500 }
    );
  }
}
