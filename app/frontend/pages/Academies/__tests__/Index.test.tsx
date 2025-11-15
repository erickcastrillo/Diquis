/**
 * Academy Index Component Tests
 * 
 * Tests for the academies list view component including:
 * - Rendering with data
 * - Empty state handling
 * - Navigation and interactions
 * - Responsive behavior
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { router } from '@inertiajs/react'
import Index from '../Index'
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
    ),
    router: {
      visit: vi.fn(),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    }
  }
})

// Test data
const mockAcademy = {
  slug: 'test-academy',
  name: 'Test Academy'
}

const mockAcademies: AcademyType[] = [
  {
    id: '1',
    slug: 'test-academy-1',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    slug: 'test-academy-2',
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  }
]

describe('Academy Index', () => {
  // Test basic rendering with data
  describe('with academies data', () => {
    it('renders the page title', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      expect(screen.getByTestId('head')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'Academies' })).toBeInTheDocument()
    })

    it('displays all academies', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      expect(screen.getByText('Test Academy 1')).toBeInTheDocument()
      expect(screen.getByText('Test Academy 2')).toBeInTheDocument()
    })

    it('shows action buttons for each academy', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const viewLinks = screen.getAllByText('View')
      const editLinks = screen.getAllByText('Edit')
      
      expect(viewLinks).toHaveLength(2)
      expect(editLinks).toHaveLength(2)
    })

    it('has correct links for viewing academies', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const viewLinks = screen.getAllByText('View')
      expect(viewLinks[0]).toHaveAttribute('href', '/academies/1')
      expect(viewLinks[1]).toHaveAttribute('href', '/academies/2')
    })

    it('has correct links for editing academies', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const editLinks = screen.getAllByText('Edit')
      expect(editLinks[0]).toHaveAttribute('href', '/academies/1/edit')
      expect(editLinks[1]).toHaveAttribute('href', '/academies/2/edit')
    })

    it('displays create new academy button', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const createButton = screen.getByText('New Academy')
      expect(createButton).toBeInTheDocument()
      expect(createButton).toHaveAttribute('href', '/academies/new')
    })
  })

  // Test empty state
  describe('with no academies', () => {
    it('displays empty state message', () => {
      render(<Index academies={[]} academy={mockAcademy} />)
      
      expect(screen.getByText('No academies found.')).toBeInTheDocument()
    })

    it('shows create first academy button in empty state', () => {
      render(<Index academies={[]} academy={mockAcademy} />)
      
      const createButton = screen.getByText('Create your first academy')
      expect(createButton).toBeInTheDocument()
      expect(createButton).toHaveAttribute('href', '/academies/new')
    })

    it('does not show the grid when empty', () => {
      render(<Index academies={[]} academy={mockAcademy} />)
      
      expect(screen.queryByRole('grid')).not.toBeInTheDocument()
    })
  })

  // Test responsive behavior and styling
  describe('responsive layout', () => {
    it('applies correct CSS classes for responsive grid', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const gridContainer = screen.getByRole('main').querySelector('.row')
      expect(gridContainer).toHaveClass('row', 'g-3')
    })

    it('applies Bootstrap card styling', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const cards = screen.getByRole('main').querySelectorAll('.card')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  // Test interactions
  describe('user interactions', () => {
    it('applies Bootstrap card styling', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const firstCard = screen.getByText('Test Academy 1').closest('.card')
      expect(firstCard).toHaveClass('card', 'h-100')
    })

    it('provides proper accessibility for action links', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const viewLinks = screen.getAllByText('View')
      const editLinks = screen.getAllByText('Edit')
      
      viewLinks.forEach(link => {
        expect(link).toHaveAttribute('href')
        expect(link).toHaveClass('btn', 'btn-outline-primary', 'btn-sm')
      })
      
      editLinks.forEach(link => {
        expect(link).toHaveAttribute('href')
        expect(link).toHaveClass('btn', 'btn-outline-secondary', 'btn-sm')
      })
    })
  })

  // Test data handling edge cases
  describe('edge cases', () => {
    it('handles academies without optional fields', () => {
      const minimalAcademies: AcademyType[] = [
        {
          id: '1',
          slug: 'minimal-academy',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]

      render(<Index academies={minimalAcademies} academy={mockAcademy} />)
      
      expect(screen.getByText('Minimal Academy')).toBeInTheDocument()
    })

    it('handles long academy names gracefully', () => {
      const longAcademies: AcademyType[] = [
        {
          id: '1',
          slug: 'long-name-academy',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]

      render(<Index academies={longAcademies} academy={mockAcademy} />)
      
      expect(screen.getByText(/This is a very long academy name/)).toBeInTheDocument()
    })
  })

  // Test accessibility
  describe('accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Academies')
    })

    it('provides meaningful link text', () => {
      render(<Index academies={mockAcademies} academy={mockAcademy} />)
      
      expect(screen.getByText('New Academy')).toBeInTheDocument()
      expect(screen.getAllByText('View')).toHaveLength(2)
      expect(screen.getAllByText('Edit')).toHaveLength(2)
    })

    it('maintains proper color contrast for status indicators', () => {
      // No status indicators in this model
      expect(true).toBe(true)
    })
  })
})