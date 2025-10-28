import { Head } from '@inertiajs/react'
import { Fragment, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <Fragment>
      <Head title={title} />
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">
              Diquis
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {/* Add navigation items here */}
              </ul>
            </div>
          </div>
        </nav>
        <main className="container-fluid py-4">
          {children}
        </main>
      </div>
    </Fragment>
  )
}