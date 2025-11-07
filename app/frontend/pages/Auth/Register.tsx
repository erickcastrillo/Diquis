import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, Fragment } from "react";

interface Props {
  errors?: Record<string, string[]>;
}

export default function Register({ errors = {} }: Props) {
  const { data, setData, post, processing } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "player", // Default role
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post("/users");
  };

  const hasError = (field: string) => errors[field] && errors[field].length > 0;
  const getError = (field: string) => errors[field]?.[0];

  return (
    <Fragment>
      <Head title="Sign Up" />

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Create Account</h1>
                <p className="text-base-content/60 mt-2">Join Diquis Academy</p>
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
                {/* First Name Field */}
                <div className="form-control">
                  <label htmlFor="first_name" className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                    className={`input input-bordered w-full ${
                      hasError("first_name") ? "input-error" : ""
                    }`}
                    placeholder="Enter your first name"
                    required
                  />
                  {hasError("first_name") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("first_name")}
                      </span>
                    </label>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="form-control">
                  <label htmlFor="last_name" className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                    className={`input input-bordered w-full ${
                      hasError("last_name") ? "input-error" : ""
                    }`}
                    placeholder="Enter your last name"
                    required
                  />
                  {hasError("last_name") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("last_name")}
                      </span>
                    </label>
                  )}
                </div>

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
                    placeholder="Create a password"
                    required
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
                    <span className="label-text">Confirm Password</span>
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
                    placeholder="Confirm your password"
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

                {/* Role Field */}
                <div className="form-control">
                  <label htmlFor="role" className="label">
                    <span className="label-text">I am a...</span>
                  </label>
                  <select
                    id="role"
                    value={data.role}
                    onChange={(e) => setData("role", e.target.value)}
                    className={`select select-bordered w-full ${
                      hasError("role") ? "select-error" : ""
                    }`}
                    required
                  >
                    <option value="player">Player</option>
                    <option value="parent">Parent/Guardian</option>
                    <option value="coach">Coach</option>
                  </select>
                  {hasError("role") && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {getError("role")}
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
                  {processing ? "Creating account..." : "Create Account"}
                </button>
              </form>

              {/* Helper Links */}
              <div className="divider">OR</div>

              <div className="text-center">
                <Link href="/users/sign_in" className="link link-primary">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
