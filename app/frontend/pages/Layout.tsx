import { Head } from '@inertiajs/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Diquis
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  )
}