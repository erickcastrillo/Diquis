import { vi } from "vitest";

// Mock Inertia router methods
export const mockInertia = {
  visit: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
  remember: vi.fn(),
  restore: vi.fn(),
  on: vi.fn(),
};

// Mock useForm hook
export const mockUseForm = (initialData = {}) => ({
  data: initialData,
  setData: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
  processing: false,
  errors: {},
  hasErrors: false,
  progress: null,
  wasSuccessful: false,
  recentlySuccessful: false,
  transform: vi.fn(),
  setDefaults: vi.fn(),
  reset: vi.fn(),
  clearErrors: vi.fn(),
  setError: vi.fn(),
  submit: vi.fn(),
  cancel: vi.fn(),
  isDirty: false,
});

// Mock usePage hook
export const mockUsePage = (props = {}) => ({
  component: "Test",
  props: {
    auth: {
      user: {
        id: 1,
        email: "test@example.com",
        first_name: "Test",
        last_name: "User",
        role: "player",
        full_name: "Test User",
      },
    },
    flash: {},
    translations: {},
    locale: "en",
    available_locales: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Español", flag: "🇪🇸" },
    ],
    ...props,
  },
  rememberedState: {},
  scrollRegions: [],
  url: "/test",
  version: "1",
});

// Helper to create mock page props
export const createMockPageProps = (overrides = {}) => ({
  auth: {
    user: {
      id: 1,
      email: "test@example.com",
      first_name: "Test",
      last_name: "User",
      role: "player",
      full_name: "Test User",
    },
  },
  flash: {},
  translations: {},
  locale: "en",
  available_locales: [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ],
  ...overrides,
});
