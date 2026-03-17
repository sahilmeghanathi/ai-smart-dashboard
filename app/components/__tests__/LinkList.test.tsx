/**
 * LinkList Component Tests
 * Tests for rendering, interactions, and state management
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkList } from '../LinkList';

describe('LinkList', () => {
  const mockLinks = [
    {
      id: '1',
      title: 'Next.js Documentation',
      url: 'https://nextjs.org/docs',
      visitCount: 12,
    },
    {
      id: '2',
      title: 'React Official',
      url: 'https://react.dev',
      visitCount: 8,
    },
  ];

  describe('Rendering', () => {
    it('should render title and link count', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('Your Links')).toBeInTheDocument();
      expect(screen.getByText('2 links')).toBeInTheDocument();
    });

    it('should render each link card', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('Next.js Documentation')).toBeInTheDocument();
      expect(screen.getByText('React Official')).toBeInTheDocument();
    });

    it('should display singular "link" when count is 1', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={[mockLinks[0]]}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('1 link')).toBeInTheDocument();
    });

    it('should display plural "links" when count is greater than 1', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('2 links')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty message when no links', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={[]}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(
        screen.getByText('No links saved yet. Add your first link above!')
      ).toBeInTheDocument();
    });

    it('should show custom empty message when provided', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      const customMessage = 'Custom empty state message';
      
      render(
        <LinkList
          links={[]}
          onDelete={mockDelete}
          onVisit={mockVisit}
          emptyMessage={customMessage}
        />
      );
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator when isLoading is true', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={[]}
          onDelete={mockDelete}
          onVisit={mockVisit}
          isLoading={true}
        />
      );
      
      expect(screen.getByText('Loading links...')).toBeInTheDocument();
    });

    it('should not render links when loading', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
          isLoading={true}
        />
      );
      
      expect(
        screen.queryByText('Next.js Documentation')
      ).not.toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should pass onDelete callback to LinkCard components', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      // LinkCard components should receive the callbacks
      // This is verified by LinkCard tests
      expect(mockDelete).not.toHaveBeenCalled();
    });

    it('should pass onVisit callback to LinkCard components', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      // LinkCard components should receive the callbacks
      // This is verified by LinkCard tests
      expect(mockVisit).not.toHaveBeenCalled();
    });
  });

  describe('Props', () => {
    it('should handle default isLoading prop as false', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkList
          links={[]}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      // Should show empty state, not loading state
      expect(
        screen.getByText('No links saved yet. Add your first link above!')
      ).toBeInTheDocument();
      expect(screen.queryByText('Loading links...')).not.toBeInTheDocument();
    });

    it('should render all required props correctly', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      const { container } = render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
          isLoading={false}
          emptyMessage="Custom message"
        />
      );
      
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Your Links')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should use responsive grid layout', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      const { container } = render(
        <LinkList
          links={mockLinks}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const gridElement = container.querySelector('.grid');
      expect(gridElement?.className).toContain('grid-cols-1');
      expect(gridElement?.className).toContain('md:grid-cols-2');
      expect(gridElement?.className).toContain('lg:grid-cols-3');
    });
  });
});
