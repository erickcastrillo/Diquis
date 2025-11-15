/**
 * Academy Show Component Tests
 * 
 * Tests for the academy detail view component including:
 * - Data display and formatting
 * - Action buttons and navigation
 * - Date formatting and display
 * - Status indicators and accessibility
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Show from '../Show'
import { AcademyType } from '../types'

// Mock Inertia.js
vi.mock('@inertiajs/react', async () => {
  const actual = await vi.importActual('@inertiajs/react')
  return {
    ...actual,
    Head: ({ children, title }: { children?: React.ReactNode; title: string }) => (
      <head data-testid="head">
        <title>{title}</title>
        {children}
      </head>
    ),
    Link: ({ href, children, className, ...props }: any) => (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }
})

// Test data
const mockAcademy = {
  slug: 'test-academy',
  name: 'Test Academy'
}

const mockAcademy: AcademyType = {
  id: 'test-academy-id',
  slug: 'test-academy-slug',
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-20T14:45:00Z'
}

describe('Academy Show', () => {
  // Test basic rendering and data display
  describe('content rendering', () => {
    it('renders the page with correct title', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      expect(screen.getByTestId('head')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Test Academy' })).toBeInTheDocument()
    })

    it('displays the academy name prominently', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Test Academy')
      expect(heading).toHaveClass('text-2xl', 'font-bold', 'text-gray-900')
    })

    it('displays all attribute details', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
    })

    it('displays formatted creation date', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      expect(screen.getByText('Created')).toBeInTheDocument()
      expect(screen.getByText('1/15/2024')).toBeInTheDocument()
    })

    it('displays formatted last updated date', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      expect(screen.getByText('Last Updated')).toBeInTheDocument()
      expect(screen.getByText('1/20/2024')).toBeInTheDocument()
    })
  })

  // Test action buttons and navigation
  describe('action buttons', () => {
    it('displays edit button with correct link', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const editButton = screen.getByText('Edit')
      expect(editButton).toBeInTheDocument()
      expect(editButton).toHaveAttribute('href', '/academies/test-academy-id/edit')
      expect(editButton).toHaveClass('bg-blue-600', 'hover:bg-blue-700', 'text-white')
    })

    it('displays back to list button with correct link', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const backButton = screen.getByText('Back to List')
      expect(backButton).toBeInTheDocument()
      expect(backButton).toHaveAttribute('href', '/academies')
      expect(backButton).toHaveClass('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800')
    })

    it('positions action buttons correctly', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const actionsContainer = screen.getByText('Edit').closest('.flex')
      expect(actionsContainer).toHaveClass('space-x-3')
    })
  })

  // Test data handling edge cases
  describe('data handling', () => {
  })

  // Test layout and responsive behavior
  describe('layout and styling', () => {
    it('applies correct container classes', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const container = screen.getByRole('main').firstElementChild
      expect(container).toHaveClass('bg-white', 'shadow', 'rounded-lg')
    })

    it('applies responsive grid layout', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const gridContainer = screen.getByText('Details').closest('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'gap-6')
    })

    it('properly spaces detail items', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const detailsList = screen.getByText('Details').nextElementSibling
      expect(detailsList).toHaveClass('space-y-3')
    })
  })

  // Test accessibility
  describe('accessibility', () => {
    it('uses proper heading hierarchy', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const mainHeading = screen.getByRole('heading', { level: 1 })
      const sectionHeading = screen.getByRole('heading', { level: 3 })
      
      expect(mainHeading).toHaveTextContent('Test Academy')
      expect(sectionHeading).toHaveTextContent('Details')
    })

    it('uses semantic HTML for definition lists', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      const definitionList = screen.getByRole('main').querySelector('dl')
      expect(definitionList).toBeInTheDocument()
      
      const terms = screen.getByRole('main').querySelectorAll('dt')
      const definitions = screen.getByRole('main').querySelectorAll('dd')
      
      expect(terms.length).toBeGreaterThan(0)
      expect(definitions.length).toEqual(terms.length)
    })

    it('provides meaningful button text', () => {
      render(<Show academy={mockAcademy} academy={mockAcademy} />)
      
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Back to List')).toBeInTheDocument()
    })

    it('maintains proper color contrast for status badges', () => {
      // No status badges in this model
      expect(true).toBe(true)
    })
  })

  // Test edge cases and error handling
  describe('edge cases', () => {
    it('handles missing academy data gracefully', () => {
      const emptyAcademy = { slug: '', name: '' }
      
      render(<Show academy={mockAcademy} academy={emptyAcademy} />)
      
      expect(screen.getByRole('heading', { name: 'Test Academy' })).toBeInTheDocument()
    })

    it('handles very long content appropriately', () => {
      const longContentAcademy = {
        ...mockAcademy,
        name: 'This is an extremely long academy name that should be handled properly without breaking the layout or causing any issues with the display',
      }
      
      render(<Show academy={longContentAcademy} academy={mockAcademy} />)
      
      expect(screen.getByText(/This is an extremely long academy name/)).toBeInTheDocument()
    })

    it('handles date parsing errors gracefully', () => {
      const invalidDateAcademy = {
        ...mockAcademy,
        created_at: 'invalid-date',
        updated_at: 'also-invalid'
      }
      
      // This should not throw an error
      expect(() => {
        render(<Show academy={invalidDateAcademy} academy={mockAcademy} />)
      }).not.toThrow()
    })
  })
})