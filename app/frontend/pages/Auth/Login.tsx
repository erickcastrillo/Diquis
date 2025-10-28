import { Head, Link, useForm } from '@inertiajs/react'
import { Fragment, FormEventHandler } from 'react'

interface Props {
  errors?: string[]
}

export default function Login({ errors = [] }: Props) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    remember: false
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post('/users/sign_in')
  }

  return (
    <Fragment>
      <Head title="Sign In" />
      
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h1 className="h3 mb-0">Sign In</h1>
                  <p className="text-muted">Welcome back to Diquis</p>
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
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={data.remember}
                      onChange={e => setData('remember', e.target.checked)}
                      className="form-check-input"
                    />
                    <label htmlFor="remember" className="form-check-label">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-primary w-100 mb-3"
                  >
                    {processing ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="text-center">
                  <Link href="/users/sign_up" className="text-decoration-none">
                    Don't have an account? Sign up
                  </Link>
                  <br />
                  <Link href="/users/password/new" className="text-muted text-decoration-none small">
                    Forgot your password?
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