import '@testing-library/jest-dom';

// Polyfills for jsdom environment
if (typeof globalThis.Request === 'undefined') {
  // @ts-ignore
  globalThis.Request = global.Request;
}
if (typeof globalThis.Response === 'undefined') {
  // @ts-ignore
  globalThis.Response = global.Response;
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/dashboard';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return children;
  };
});
