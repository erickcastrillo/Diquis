import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
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
  confirmed_at: string | null;
  locked_at: string | null;
  sign_in_count: number;
}

interface Props {
  users: User[];
  can_create: boolean;
}

const UsersIndexPage: React.FC<Props> = ({
  users,
  can_create,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role_display.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getStatusBadge = (user: User) => {
    if (user.locked_at) {
      return <span className="badge badge-error badge-sm">Locked</span>;
    }
    if (!user.confirmed_at) {
      return <span className="badge badge-warning badge-sm">Unconfirmed</span>;
    }
    return <span className="badge badge-success badge-sm">Active</span>;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <FlyonUILayout>
      <Head title="User Management | Diquis" />

      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-base-content/70 mt-1">
              Manage users and their roles
            </p>
          </div>
          {can_create && (
            <Link
              href="/admin/users/new"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create User
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="form-control flex-1">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-base-content/70 text-sm">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Sign Ins</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="text-base-content/50">
                          {searchTerm
                            ? "No users found matching your search"
                            : "No users found"}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-primary text-primary-content w-10 rounded-full">
                                <span className="text-sm">
                                  {user.full_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold">
                                {user.full_name}
                              </div>
                              <div className="text-base-content/70 text-sm">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${getRoleBadgeColor(user.role)}`}
                          >
                            {user.role_display}
                          </span>
                        </td>
                        <td>{getStatusBadge(user)}</td>
                        <td>
                          <span className="text-base-content/70">
                            {user.sign_in_count}
                          </span>
                        </td>
                        <td>
                          <span className="text-base-content/70">
                            {formatDate(user.created_at)}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/users/${user.id}`}
                              className="btn btn-ghost btn-sm"
                            >
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
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View
                            </Link>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="btn btn-ghost btn-sm"
                            >
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <div className="text-sm opacity-80">Total Users</div>
              <div className="text-3xl font-bold">{users.length}</div>
            </div>
          </div>
          <div className="card bg-success text-success-content">
            <div className="card-body">
              <div className="text-sm opacity-80">Active Users</div>
              <div className="text-3xl font-bold">
                {users.filter((u) => u.confirmed_at && !u.locked_at).length}
              </div>
            </div>
          </div>
          <div className="card bg-warning text-warning-content">
            <div className="card-body">
              <div className="text-sm opacity-80">Unconfirmed</div>
              <div className="text-3xl font-bold">
                {users.filter((u) => !u.confirmed_at).length}
              </div>
            </div>
          </div>
          <div className="card bg-error text-error-content">
            <div className="card-body">
              <div className="text-sm opacity-80">Locked</div>
              <div className="text-3xl font-bold">
                {users.filter((u) => u.locked_at).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default UsersIndexPage;
