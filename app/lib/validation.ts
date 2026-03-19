/**
 * Shared validation utilities
 * Used across components and API routes for consistent validation
 */

/**
 * Validates if a string is a valid URL
 * @param url - URL string to validate
 * @returns true if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates link title
 * @param title - Title to validate
 * @returns error message if invalid, undefined if valid
 */
export const validateTitle = (title: string): string | undefined => {
  if (!title || !title.trim()) {
    return 'Title is required';
  }
  if (title.trim().length > 200) {
    return 'Title must be less than 200 characters';
  }
  return undefined;
};

/**
 * Validates link URL
 * @param url - URL to validate
 * @returns error message if invalid, undefined if valid
 */
export const validateURL = (url: string): string | undefined => {
  if (!url || !url.trim()) {
    return 'URL is required';
  }
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL';
  }
  return undefined;
};

/**
 * Validates create link request body
 * @param body - Request body to validate
 * @returns validation result with error message if invalid
 */
export const validateCreateLinkRequest = (body: unknown): {
  valid: boolean;
  error?: string;
  data?: { title: string; url: string };
} => {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body is required' };
  }

  const { title, url } = body as Record<string, unknown>;

  // Validate title
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Title is required and must be a string' };
  }

  const titleError = validateTitle(title);
  if (titleError) {
    return { valid: false, error: titleError };
  }

  // Validate URL
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required and must be a string' };
  }

  const urlError = validateURL(url);
  if (urlError) {
    return { valid: false, error: urlError };
  }

  return { valid: true, data: { title: title.trim(), url } };
};
