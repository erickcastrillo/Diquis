import { Head, Link, usePage } from '@inertiajs/react'
import { Fragment, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  const { auth } = usePage().props as any
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
                {auth?.user ? (
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown"
                    >
                      {auth.user.email}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link 
                          href="/users/edit" 
                          className="dropdown-item"
                          method="get"
                        >
                          Profile
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link 
                          href="/users/sign_out" 
                          className="dropdown-item"
                          method="delete"
                        >
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link href="/users/sign_in" className="nav-link">
                        Sign In
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/users/sign_up" className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main className="container py-4">
          {children}
        </main>
      </div>
    </Fragment>
  )
}