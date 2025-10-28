import { Head } from '@inertiajs/react'
import { Fragment } from 'react'

interface HomeProps {
  message?: string
}

export default function Home({ message = "Welcome to Diquis!" }: HomeProps) {
  return (
    <Fragment>
      <Head title="Home" />
      <div className="card">
        <div className="card-body">
          <h1 className="display-4 fw-bold mb-4">
            {message}
          </h1>
          <p className="lead text-muted mb-4">
            Your Rails application with Inertia.js and React is ready to go!
          </p>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card bg-primary bg-opacity-10 border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">Rails 8</h5>
                  <p className="card-text text-primary-emphasis">
                    Built with the latest Rails framework for robust backend functionality.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card bg-success bg-opacity-10 border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">Inertia.js</h5>
                  <p className="card-text text-success-emphasis">
                    Modern SPA experience without the complexity of separate API endpoints.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card bg-info bg-opacity-10 border-info">
                <div className="card-body">
                  <h5 className="card-title text-info">React</h5>
                  <p className="card-text text-info-emphasis">
                    Dynamic frontend with React components and TypeScript support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}