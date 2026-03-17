/**
 * LinkForm Component Tests
 * Tests for form validation, user interactions, and state management
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LinkForm } from '../LinkForm';

describe('LinkForm', () => {
  describe('Rendering', () => {
    it('should render form with title input', () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });

    it('should render form with URL input', () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText('URL')).toBeInTheDocument();
    });

    it('should render submit button', () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      expect(screen.getByRole('button', { name: /add link/i })).toBeInTheDocument();
    });

    it('should display loading state text when isLoading is true', () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} isLoading={true} />);
      
      expect(screen.getByRole('button', { name: /adding/i })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error when title is empty on submit', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const urlInput = screen.getByLabelText('URL');
      await userEvent.type(urlInput, 'https://example.com');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });
    });

    it('should show error when URL is empty on submit', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const titleInput = screen.getByLabelText('Title');
      await userEvent.type(titleInput, 'Example');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('URL is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid URL format', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const titleInput = screen.getByLabelText('Title');
      const urlInput = screen.getByLabelText('URL');
      
      await userEvent.type(titleInput, 'Example');
      await userEvent.type(urlInput, 'not-a-url');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
      });
    });

    it('should accept valid URL format', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const titleInput = screen.getByLabelText('Title');
      const urlInput = screen.getByLabelText('URL');
      
      await userEvent.type(titleInput, 'Example');
      await userEvent.type(urlInput, 'https://example.com');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          title: 'Example',
          url: 'https://example.com',
        });
      });
    });
  });

  describe('User Interactions', () => {
    it('should clear error when user types in field', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton); // Submit empty form
      
      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
      });
      
      const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
      await userEvent.type(titleInput, 'T');
      
      await waitFor(() => {
        expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
      });
    });

    it('should reset form after successful submission', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
      const urlInput = screen.getByLabelText('URL') as HTMLInputElement;
      
      await userEvent.type(titleInput, 'Example');
      await userEvent.type(urlInput, 'https://example.com');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(titleInput.value).toBe('');
        expect(urlInput.value).toBe('');
      });
    });

    it('should disable inputs when isLoading is true', () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} isLoading={true} />);
      
      const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
      const urlInput = screen.getByLabelText('URL') as HTMLInputElement;
      
      expect(titleInput.disabled).toBe(true);
      expect(urlInput.disabled).toBe(true);
    });
  });

  describe('Callbacks', () => {
    it('should call onSubmit with correct data', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const titleInput = screen.getByLabelText('Title');
      const urlInput = screen.getByLabelText('URL');
      
      await userEvent.type(titleInput, 'Next.js Docs');
      await userEvent.type(urlInput, 'https://nextjs.org/docs');
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          title: 'Next.js Docs',
          url: 'https://nextjs.org/docs',
        });
        expect(mockSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onSubmit with invalid data', async () => {
      const mockSubmit = jest.fn();
      render(<LinkForm onSubmit={mockSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /add link/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
