/**
 * TypeScript type definitions for Academy
 * 
 * These types ensure type safety across the frontend application
 * and match the data structure returned from the backend API.
 */

// Main Academy type representing the full data structure
export interface AcademyType {
  id: string          // Public identifier (slug)
  slug: string        // URL-friendly identifier
  created_at: string  // ISO timestamp
  updated_at: string  // ISO timestamp
}

// Form data type for create/update operations
// Contains only the editable attributes
export interface AcademyFormData {
}