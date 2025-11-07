import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";

interface Props {
  errors?: Record<string, string[]>;
}

export default function ForgotPassword({ errors = {} }: Props) {
  const { data, setData, post, processing } = useForm({
    email: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/users/password");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title="Forgot Password" />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Forgot Password?</h1>
                <p className="text-base-content/60 mt-2">
                  No worries! Enter your email and we'll send you reset
                  instructions.
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
                    autoFocus
                  />
                  {hasError("email") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("email")}
                      </span>
                    </label>
                  )}
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
                  {processing
                    ? "Sending instructions..."
                    : "Send Reset Instructions"}
                </button>
              </form>

              {/* Helper Links */}
              <div className="divider">OR</div>

              <div className="text-center space-y-2">
                <div>
                  <Link href="/users/sign_in" className="link link-primary">
                    Back to Sign In
                  </Link>
                </div>
                <div>
                  <Link
                    href="/users/sign_up"
                    className="link link-neutral text-sm"
                  >
                    Don't have an account? Sign up
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
