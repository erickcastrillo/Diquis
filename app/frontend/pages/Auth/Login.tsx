import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";

interface Props {
  errors?: Record<string, string[]>;
}

export default function Login({ errors = {} }: Props) {
  const { data, setData, post, processing } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/users/sign_in");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title="Sign In" />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p className="text-base-content/60 mt-2">
                  Welcome back to Diquis
                </p>
              </div>

              {/* Display global errors */}
              {errors.base && errors.base.length > 0 && (
                <div className="alert alert-error mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    {errors.base.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                {/* Email Field */}
                <div className="form-control">
                  <label htmlFor="email" className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className={`input input-bordered w-full ${
                      hasError("email") ? "input-error" : ""
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                  {hasError("email") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("email")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className={`input input-bordered w-full ${
                      hasError("password") ? "input-error" : ""
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  {hasError("password") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={data.remember}
                      onChange={(e) => setData("remember", e.target.checked)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary w-full"
                >
                  {processing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {processing ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Helper Links */}
              <div className="divider">OR</div>

              <div className="text-center space-y-2">
                <div>
                  <Link href="/users/sign_up" className="link link-primary">
                    Don't have an account? Sign up
                  </Link>
                </div>
                <div>
                  <Link
                    href="/users/password/new"
                    className="link link-neutral text-sm"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Additional Helper Links */}
              <div className="text-center mt-4 space-y-1 text-xs text-base-content/60">
                <div>
                  <Link
                    href="/users/confirmation/new"
                    className="link link-neutral"
                  >
                    Didn't receive confirmation instructions?
                  </Link>
                </div>
                <div>
                  <Link href="/users/unlock/new" className="link link-neutral">
                    Didn't receive unlock instructions?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
