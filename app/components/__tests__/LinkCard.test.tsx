/**
 * LinkCard Component Tests
 * Tests for rendering, user interactions, and callbacks
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkCard } from '../LinkCard';

describe('LinkCard', () => {
  const defaultProps = {
    id: '1',
    title: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    visitCount: 24,
  };

  describe('Rendering', () => {
    it('should render link title', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it('should render link URL', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText(defaultProps.url)).toBeInTheDocument();
    });

    it('should render visit count', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('24 visits')).toBeInTheDocument();
    });

    it('should display singular "visit" for count of 1', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          visitCount={1}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByText('1 visit')).toBeInTheDocument();
    });

    it('should render delete button', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      expect(screen.getByLabelText('Delete link')).toBeInTheDocument();
    });

    it('should render as a link with target="_blank"', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const linkElement = screen.getByRole('link', { name: defaultProps.title });
      expect(linkElement).toHaveAttribute('href', defaultProps.url);
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('User Interactions', () => {
    it('should call onDelete when delete button is clicked', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const deleteButton = screen.getByLabelText('Delete link');
      fireEvent.click(deleteButton);
      
      expect(mockDelete).toHaveBeenCalledWith(defaultProps.id);
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });

    it('should call onVisit when link is clicked', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const linkElement = screen.getByRole('link', { name: defaultProps.title });
      fireEvent.click(linkElement);
      
      expect(mockVisit).toHaveBeenCalledWith(defaultProps.id);
    });

    it('should not throw error if onDelete is not provided', () => {
      const { container } = render(
        <LinkCard {...defaultProps} />
      );
      
      expect(container).toBeInTheDocument();
    });

    it('should not throw error if onVisit is not provided', () => {
      const { container } = render(
        <LinkCard {...defaultProps} />
      );
      
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for delete button', () => {
      render(
        <LinkCard
          {...defaultProps}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      expect(screen.getByLabelText('Delete link')).toBeInTheDocument();
    });

    it('should have title attribute on link for truncation', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const linkElement = screen.getByRole('link', { name: defaultProps.title });
      expect(linkElement).toHaveAttribute('title', defaultProps.title);
    });

    it('should be keyboard accessible', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const deleteButton = screen.getByLabelText('Delete link');
      deleteButton.focus();
      
      expect(document.activeElement).toEqual(deleteButton);
    });
  });

  describe('Styling', () => {
    it('should have dark mode classes', () => {
      const { container } = render(
        <LinkCard
          {...defaultProps}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      const cardElement = container.firstChild as HTMLElement;
      const classNames = cardElement?.className || '';
      
      expect(classNames).toContain('dark:bg-gray-800');
      expect(classNames).toContain('dark:border-gray-700');
    });

    it('should have hover states', () => {
      const { container } = render(
        <LinkCard
          {...defaultProps}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      const cardElement = container.firstChild as HTMLElement;
      const classNames = cardElement?.className || '';
      
      expect(classNames).toContain('hover:shadow-lg');
    });
  });

  describe('Props Variations', () => {
    it('should handle zero visit count', () => {
      render(
        <LinkCard
          {...defaultProps}
          visitCount={0}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      expect(screen.getByText('0 visits')).toBeInTheDocument();
    });

    it('should handle high visit count', () => {
      render(
        <LinkCard
          {...defaultProps}
          visitCount={9999}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      expect(screen.getByText('9999 visits')).toBeInTheDocument();
    });

    it('should handle long titles with truncation', () => {
      const longTitle = 'A'.repeat(100);
      
      render(
        <LinkCard
          {...defaultProps}
          title={longTitle}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      const linkElement = screen.getByRole('link');
      expect(linkElement).toHaveAttribute('title', longTitle);
    });

    it('should handle long URLs with truncation', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(100);
      
      render(
        <LinkCard
          {...defaultProps}
          url={longUrl}
          onDelete={jest.fn()}
          onVisit={jest.fn()}
        />
      );
      
      expect(screen.getByText(longUrl)).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('should prevent default on delete button click', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const deleteButton = screen.getByLabelText('Delete link');
      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      
      fireEvent(deleteButton, event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not open link in new tab on delete click', () => {
      const mockDelete = jest.fn();
      const mockVisit = jest.fn();
      
      render(
        <LinkCard
          {...defaultProps}
          onDelete={mockDelete}
          onVisit={mockVisit}
        />
      );
      
      const deleteButton = screen.getByLabelText('Delete link');
      fireEvent.click(deleteButton);
      
      // onVisit should not be called when deleting
      expect(mockVisit).not.toHaveBeenCalled();
    });
  });
});
