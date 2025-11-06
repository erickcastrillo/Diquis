import "@inertiajs/core";

declare module "@inertiajs/core" {
  interface PageProps {
    flash?: {
      notice?: string;
      alert?: string;
      error?: string;
    };
    translations?: Record<string, any>;
    locale?: string;
    auth?: {
      user?: {
        id: number;
        email: string;
        first_name?: string;
        last_name?: string;
        role: string;
        full_name: string;
      };
    };
  }
}

export {};
