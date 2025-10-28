import { Head, Link, useForm } from '@inertiajs/react'
import { Fragment, FormEventHandler } from 'react'

interface Props {
  errors?: string[]
}

export default function Register({ errors = [] }: Props) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    password_confirmation: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/users')
  }

  return (
    <Fragment>
      <Head title="Sign Up" />
      
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h1 className="h3 mb-0">Sign Up</h1>
                  <p className="text-muted">Create your Diquis account</p>
                </div>

                {/* Display errors */}
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul className="mb-0">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={submit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={e => setData('password', e.target.value)}
                      className="form-control"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="form-text">
                      Password must be at least 6 characters long
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      id="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={e => setData('password_confirmation', e.target.value)}
                      className="form-control"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {processing ? 'Creating account...' : 'Sign Up'}
                  </button>
                </form>

                <div className="text-center">
                  <Link href="/users/sign_in" className="text-decoration-none">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}