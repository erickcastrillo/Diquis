import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";

interface Props {
  reset_password_token: string;
  errors?: Record<string, string[]>;
}

export default function ResetPassword({
  reset_password_token,
  errors = {},
}: Props) {
  const { data, setData, put, processing } = useForm({
    reset_password_token: reset_password_token,
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put("/users/password");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title="Reset Password" />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <p className="text-base-content/60 mt-2">
                  Enter your new password below
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
                {/* Password Field */}
                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className={`input input-bordered w-full ${
                      hasError("password") ? "input-error" : ""
                    }`}
                    placeholder="Enter new password"
                    required
                    autoFocus
                  />
                  {hasError("password") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password")}
                      </span>
                    </label>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Minimum 6 characters
                    </span>
                  </label>
                </div>

                {/* Password Confirmation Field */}
                <div className="form-control">
                  <label htmlFor="password_confirmation" className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    className={`input input-bordered w-full ${
                      hasError("password_confirmation") ? "input-error" : ""
                    }`}
                    placeholder="Confirm new password"
                    required
                  />
                  {hasError("password_confirmation") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("password_confirmation")}
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
                  {processing ? "Resetting password..." : "Reset Password"}
                </button>
              </form>

              {/* Helper Links */}
              <div className="divider">OR</div>

              <div className="text-center">
                <Link href="/users/sign_in" className="link link-primary">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
