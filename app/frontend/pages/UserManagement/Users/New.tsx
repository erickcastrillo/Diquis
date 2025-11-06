import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../../components/layout/FlyonUILayout";

interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  password: string;
  password_confirmation: string;
}

interface Props {
  user: Partial<User>;
  available_roles: string[];
  errors: { [key: string]: string[] };
}

const UsersNewPage: React.FC<Props> = ({ available_roles, errors: serverErrors }) => {
  const { data, setData, post, processing, errors: clientErrors } = useForm({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: available_roles[0] || "player",
    password: "",
    password_confirmation: "",
  });

  const errors = { ...serverErrors, ...clientErrors };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/admin/users");
  };

  const getRoleDisplay = (role: string) => {
    const displays: { [key: string]: string } = {
      player: "Player",
      parent: "Parent",
      staff: "Staff",
      coach: "Coach",
      academy_admin: "Academy Admin",
      academy_owner: "Academy Owner",
      super_admin: "Super Admin",
    };
    return displays[role] || role;
  };

  return (
    <FlyonUILayout>
      <Head title="Create User | User Management | Diquis" />

      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/admin/users" className="btn btn-ghost btn-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New User</h1>
            <p className="text-base-content/70 mt-1">
              Add a new user to the system
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="card max-w-3xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Account Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Email */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text">
                        Email <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      required
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.email[0]}</span>
                      </label>
                    )}
                  </div>

                  {/* Role */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text">
                        Role <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      className={`select select-bordered ${errors.role ? "select-error" : ""}`}
                      value={data.role}
                      onChange={(e) => setData("role", e.target.value)}
                      required
                    >
                      {available_roles.map((role) => (
                        <option key={role} value={role}>
                          {getRoleDisplay(role)}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.role[0]}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Profile Information Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* First Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        First Name
                        {(data.role === "player" || data.role === "parent") && (
                          <span className="text-error">*</span>
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered ${errors.first_name ? "input-error" : ""}`}
                      value={data.first_name}
                      onChange={(e) => setData("first_name", e.target.value)}
                      required={data.role === "player" || data.role === "parent"}
                    />
                    {errors.first_name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.first_name[0]}</span>
                      </label>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Last Name
                        {(data.role === "player" || data.role === "parent") && (
                          <span className="text-error">*</span>
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered ${errors.last_name ? "input-error" : ""}`}
                      value={data.last_name}
                      onChange={(e) => setData("last_name", e.target.value)}
                      required={data.role === "player" || data.role === "parent"}
                    />
                    {errors.last_name && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.last_name[0]}</span>
                      </label>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="tel"
                      className={`input input-bordered ${errors.phone ? "input-error" : ""}`}
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      placeholder="+1234567890"
                    />
                    {errors.phone && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.phone[0]}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Password Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Password</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Password <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="password"
                      className={`input input-bordered ${errors.password ? "input-error" : ""}`}
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      required
                      minLength={6}
                    />
                    {errors.password && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.password[0]}</span>
                      </label>
                    )}
                    <label className="label">
                      <span className="label-text-alt text-base-content/70">
                        Minimum 6 characters
                      </span>
                    </label>
                  </div>

                  {/* Password Confirmation */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Confirm Password <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="password"
                      className={`input input-bordered ${errors.password_confirmation ? "input-error" : ""}`}
                      value={data.password_confirmation}
                      onChange={(e) => setData("password_confirmation", e.target.value)}
                      required
                      minLength={6}
                    />
                    {errors.password_confirmation && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.password_confirmation[0]}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-6">
                <Link href="/admin/users" className="btn btn-ghost">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 max-w-3xl">
          <div className="alert alert-info">
            <svg
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm">
              <p className="font-semibold mb-1">Important Notes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Players and Parents require first and last names</li>
                <li>The user will receive a confirmation email</li>
                <li>You can only create users with roles you're authorized to manage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default UsersNewPage;
