import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../../components/layout/FlyonUILayout";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string;
  phone: string | null;
  role: string;
  role_display: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  locked_at: string | null;
  sign_in_count: number;
  current_sign_in_at: string | null;
  last_sign_in_at: string | null;
}

interface Props {
  user: User;
  can_edit: boolean;
  can_delete: boolean;
  can_manage_roles: boolean;
}

const UsersShowPage: React.FC<Props> = ({ user, can_edit, can_delete }) => {
  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      router.delete(`/admin/users/${user.id}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      player: "badge-primary",
      parent: "badge-secondary",
      staff: "badge-accent",
      coach: "badge-info",
      academy_admin: "badge-warning",
      academy_owner: "badge-error",
      super_admin: "badge-neutral",
    };
    return colors[role] || "badge-neutral";
  };

  const getStatusInfo = () => {
    if (user.locked_at) {
      return {
        label: "Locked",
        color: "badge-error",
        icon: (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        ),
      };
    }
    if (!user.confirmed_at) {
      return {
        label: "Unconfirmed",
        color: "badge-warning",
        icon: (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    }
    return {
      label: "Active",
      color: "badge-success",
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    };
  };

  const status = getStatusInfo();

  return (
    <FlyonUILayout>
      <Head title={`${user.full_name} | User Management | Diquis`} />

      <div className="container mx-auto p-6">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumbs mb-4">
          <ol>
            <li>
              <Link href="/app/dashboard" className="flex items-center gap-2">
                <span className="icon-[tabler--home] size-5"></span>
                Dashboard
              </Link>
            </li>
            <li className="breadcrumbs-separator rtl:rotate-180">
              <span className="icon-[tabler--chevron-right]"></span>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center gap-2">
                <span className="icon-[tabler--users] size-5"></span>
                Users
              </Link>
            </li>
            <li className="breadcrumbs-separator rtl:rotate-180">
              <span className="icon-[tabler--chevron-right]"></span>
            </li>
            <li aria-current="page" className="flex items-center gap-2">
              <span className="icon-[tabler--user] size-5"></span>
              {user.full_name}
            </li>
          </ol>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Details</h1>
            <p className="text-base-content/70 mt-1">
              View and manage user information
            </p>
          </div>
          <div className="flex gap-2">
            {can_edit && (
              <Link
                href={`/admin/users/${user.id}/edit`}
                className="btn btn-primary"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit User
              </Link>
            )}
            {can_delete && (
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary text-primary-content w-24 rounded-full">
                    <span className="text-3xl">
                      {user.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                <h2 className="card-title">{user.full_name}</h2>
                <p className="text-base-content/70">{user.email}</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                    {user.role_display}
                  </span>
                  <span
                    className={`badge ${status.color} flex items-center gap-1`}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card mt-6">
              <div className="card-body">
                <h3 className="card-title text-lg">Activity Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-base-content/70 text-sm">
                      Total Sign Ins
                    </div>
                    <div className="text-2xl font-bold">
                      {user.sign_in_count}
                    </div>
                  </div>
                  <div className="divider my-2"></div>
                  <div>
                    <div className="text-base-content/70 text-sm">
                      Member Since
                    </div>
                    <div className="font-semibold">
                      {formatDate(user.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Account Information */}
            <div className="card mb-6">
              <div className="card-body">
                <h3 className="card-title mb-4">Account Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Email
                    </div>
                    <div className="font-medium">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Phone
                    </div>
                    <div className="font-medium">
                      {user.phone || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      First Name
                    </div>
                    <div className="font-medium">
                      {user.first_name || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Last Name
                    </div>
                    <div className="font-medium">
                      {user.last_name || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Role
                    </div>
                    <div>
                      <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                        {user.role_display}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Status
                    </div>
                    <div>
                      <span
                        className={`badge ${status.color} flex items-center gap-1 w-fit`}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Information */}
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-4">Activity Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Created At
                    </div>
                    <div className="font-medium">
                      {formatDate(user.created_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Updated At
                    </div>
                    <div className="font-medium">
                      {formatDate(user.updated_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Confirmed At
                    </div>
                    <div className="font-medium">
                      {formatDate(user.confirmed_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Locked At
                    </div>
                    <div className="font-medium">
                      {formatDate(user.locked_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Current Sign In
                    </div>
                    <div className="font-medium">
                      {formatDate(user.current_sign_in_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Last Sign In
                    </div>
                    <div className="font-medium">
                      {formatDate(user.last_sign_in_at)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/70 text-sm mb-1">
                      Sign In Count
                    </div>
                    <div className="font-medium">{user.sign_in_count}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default UsersShowPage;
