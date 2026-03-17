import { NextResponse } from 'next/server';
import { getAllLinks } from '@/app/lib/links-storage';

/**
 * GET /api/links/top
 * Returns the top N most visited links
 * Query parameters:
 *   - limit: number of links to return (default: 5, max: 100)
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');

    // Validate and parse limit
    let limit = 5;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);

      if (isNaN(parsedLimit)) {
        return NextResponse.json(
          {
            success: false,
            error: 'limit must be a valid number',
          },
          { status: 400 }
        );
      }

      if (parsedLimit < 1) {
        return NextResponse.json(
          {
            success: false,
            error: 'limit must be at least 1',
          },
          { status: 400 }
        );
      }

      if (parsedLimit > 100) {
        return NextResponse.json(
          {
            success: false,
            error: 'limit must be at most 100',
          },
          { status: 400 }
        );
      }

      limit = parsedLimit;
    }

    // Get all links and sort by visit count (descending)
    const allLinks = getAllLinks();
    const topLinks = allLinks
      .sort((a, b) => b.visitCount - a.visitCount)
      .slice(0, limit);

    return NextResponse.json(
      {
        success: true,
        data: topLinks,
        count: topLinks.length,
        limit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching top links:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch top links',
      },
      { status: 500 }
    );
  }
}
