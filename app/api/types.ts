/**
 * Type definitions for Link API
 * Used across frontend components and API routes
 */

export interface Link {
  id: string;
  title: string;
  url: string;
  visitCount: number;
  createdAt: string;
}

export interface CreateLinkRequest {
  title: string;
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export type LinkListResponse = ApiResponse<Link[]>;
export type LinkResponse = ApiResponse<Link>;
