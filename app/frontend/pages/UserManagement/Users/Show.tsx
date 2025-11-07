import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import FlyonUILayout from "../../../components/layout/FlyonUILayout";
import { useTranslations } from "../../../lib/i18n";

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

type TabType =
  | "account"
  | "security"
  | "billing"
  | "notifications"
  | "connections";

const UsersShowPage: React.FC<Props> = ({ user, can_edit, can_delete }) => {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState<TabType>("account");

  const handleDelete = () => {
    if (confirm(t("user_management.users.show.delete_confirm"))) {
      router.delete(`/admin/users/${user.id}`);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t("common.never");
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
        label: t("user_management.users.show.status.locked"),
        color: "badge-error",
      };
    }
    if (!user.confirmed_at) {
      return {
        label: t("user_management.users.show.status.unconfirmed"),
        color: "badge-warning",
      };
    }
    return {
      label: t("user_management.users.show.status.active"),
      color: "badge-success",
    };
  };

  const status = getStatusInfo();

  // Check if user has teams/academy access
  const hasTeamsAccess = [
    "player",
    "coach",
    "staff",
    "academy_admin",
    "academy_owner",
  ].includes(user.role);
  const isParent = user.role === "parent";

  return (
    <FlyonUILayout>
      <Head
        title={`${user.full_name} | ${t(
          "user_management.users.index.title"
        )} | Diquis`}
      />

      <div className="container mx-auto p-6">
        {/* Back Button */}
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-colors mb-4"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t("common.back")}
        </Link>

        {/* Profile Header Card */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content w-32 h-32 rounded-2xl">
                    <span className="text-4xl font-bold">
                      {user.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.full_name}</h1>
                  <p className="text-base-content/70">{user.role_display}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {user.sign_in_count}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {t("user_management.users.show.sign_ins")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">
                      {hasTeamsAccess ? "3" : "0"}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {t("user_management.users.show.teams")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">
                  {t("user_management.users.show.details")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base-content/60 w-24">Username:</span>
                    <span className="font-medium">
                      @{user.email.split("@")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base-content/60 w-24">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base-content/60 w-24">Status:</span>
                    <span className={`badge ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base-content/60 w-24">Role:</span>
                    <span className={`badge ${getRoleBadgeColor(user.role)}`}>
                      {user.role_display}
                    </span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-base-content/60 w-24">
                        Contact:
                      </span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base-content/60 w-24">Joined:</span>
                    <span className="font-medium">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  {can_edit && (
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="btn btn-primary btn-sm"
                    >
                      {t("common.edit")}
                    </Link>
                  )}
                  {can_delete && (
                    <button
                      onClick={handleDelete}
                      className="btn btn-error btn-outline btn-sm"
                    >
                      {t("common.delete")}
                    </button>
                  )}
                </div>
              </div>

              {/* Academy Plan Card (Mock) */}
              <div className="card bg-linear-to-br from-primary/10 to-secondary/10 w-full md:w-72">
                <div className="card-body">
                  <h4 className="font-semibold mb-2">
                    {t("user_management.users.show.academy_plan")}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">$49</span>
                    <span className="text-base-content/60">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      <span>Up to 200 Players</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      <span>15 Teams</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      <span>Basic Support</span>
                    </li>
                  </ul>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>26 of 30 Days</span>
                    </div>
                    <progress
                      className="progress progress-primary"
                      value="26"
                      max="30"
                    ></progress>
                    <div className="text-xs text-base-content/60 mt-1">
                      4 days remaining
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm btn-block">
                    {t("user_management.users.show.upgrade_plan")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="tabs tabs-bordered">
            <button
              className={`tab ${activeTab === "account" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {t("user_management.users.show.tabs.account")}
            </button>
            <button
              className={`tab ${activeTab === "security" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <svg
                className="h-4 w-4 mr-2"
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
              {t("user_management.users.show.tabs.security")}
            </button>
            <button
              className={`tab ${activeTab === "billing" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("billing")}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              {t("user_management.users.show.tabs.billing")}
            </button>
            <button
              className={`tab ${
                activeTab === "notifications" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {t("user_management.users.show.tabs.notifications")}
            </button>
            <button
              className={`tab ${
                activeTab === "connections" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("connections")}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {t("user_management.users.show.tabs.connections")}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "account" && (
          <AccountTab
            user={user}
            hasTeamsAccess={hasTeamsAccess}
            isParent={isParent}
            formatDate={formatDate}
          />
        )}
        {activeTab === "security" && <SecurityTab />}
        {activeTab === "billing" && <BillingTab isParent={isParent} />}
        {activeTab === "notifications" && <NotificationsTab />}
        {activeTab === "connections" && <ConnectionsTab />}
      </div>
    </FlyonUILayout>
  );
};

// Account Tab Component
const AccountTab: React.FC<{
  user: User;
  hasTeamsAccess: boolean;
  isParent: boolean;
  formatDate: (date: string | null) => string;
}> = ({ user, hasTeamsAccess, isParent, formatDate }) => {
  const { t } = useTranslations();

  // Mock data
  const mockTeams = [
    { id: 1, name: "U-17 Team A", role: "Player", players: 22 },
    { id: 2, name: "U-19 Elite Squad", role: "Reserve", players: 18 },
    { id: 3, name: "Youth Development", role: "Trainee", players: 25 },
  ];

  const mockInvoices = [
    { id: "INV-001", date: "2025-11-01", amount: "$150", status: "Paid" },
    { id: "INV-002", date: "2025-10-01", amount: "$150", status: "Paid" },
    { id: "INV-003", date: "2025-09-01", amount: "$150", status: "Paid" },
  ];

  const mockActivities = [
    {
      id: 1,
      title: "Training session completed",
      description: "Attended U-17 Team A training session",
      time: "2 hours ago",
      icon: "success",
    },
    {
      id: 2,
      title: "Profile updated",
      description: "Contact information was updated",
      time: "1 day ago",
      icon: "info",
    },
    {
      id: 3,
      title: "New team assignment",
      description: "Added to Youth Development team",
      time: "3 days ago",
      icon: "primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Teams List (for applicable roles) */}
        {hasTeamsAccess && (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">
                {t("user_management.users.show.teams_list")}
              </h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t("user_management.users.show.team_name")}</th>
                      <th>{t("user_management.users.show.role")}</th>
                      <th>{t("user_management.users.show.players")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeams.map((team) => (
                      <tr key={team.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-primary text-primary-content w-10 rounded-lg">
                                <span className="text-xs">
                                  {team.name.substring(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="font-medium">{team.name}</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-ghost">{team.role}</span>
                        </td>
                        <td>{team.players} players</td>
                        <td>
                          <button className="btn btn-ghost btn-sm">
                            {t("common.view")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Invoices (for parents) */}
        {isParent && (
          <div className="card">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="card-title">
                  {t("user_management.users.show.invoice_list")}
                </h3>
                <button className="btn btn-sm btn-outline">
                  {t("user_management.users.show.export")}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t("user_management.users.show.invoice_id")}</th>
                      <th>{t("user_management.users.show.date")}</th>
                      <th>{t("user_management.users.show.amount")}</th>
                      <th>{t("user_management.users.show.invoice_status")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="font-medium">{invoice.id}</td>
                        <td>{invoice.date}</td>
                        <td className="font-semibold">{invoice.amount}</td>
                        <td>
                          <span className="badge badge-success">
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-ghost btn-sm">
                            {t("user_management.users.show.download")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Activity Timeline */}
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-4">
              {t("user_management.users.show.activity_timeline")}
            </h3>
            <ul className="timeline timeline-vertical timeline-snap-icon">
              {mockActivities.map((activity, index) => (
                <li key={activity.id}>
                  {index > 0 && <hr />}
                  <div className="timeline-middle">
                    <div
                      className={`w-3 h-3 rounded-full bg-${activity.icon}`}
                    ></div>
                  </div>
                  <div className="timeline-end mb-10">
                    <time className="text-xs text-base-content/60">
                      {activity.time}
                    </time>
                    <div className="font-semibold">{activity.title}</div>
                    <div className="text-sm text-base-content/70">
                      {activity.description}
                    </div>
                  </div>
                  {index < mockActivities.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Account Information */}
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-base mb-4">
              {t("user_management.users.show.account_info")}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.first_name")}
                </div>
                <div className="font-medium">
                  {user.first_name ||
                    t("user_management.users.show.not_provided")}
                </div>
              </div>
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.last_name")}
                </div>
                <div className="font-medium">
                  {user.last_name ||
                    t("user_management.users.show.not_provided")}
                </div>
              </div>
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.email")}
                </div>
                <div className="font-medium break-all">{user.email}</div>
              </div>
              {user.phone && (
                <div>
                  <div className="text-base-content/60 mb-1">
                    {t("user_management.users.fields.phone")}
                  </div>
                  <div className="font-medium">{user.phone}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-base mb-4">
              {t("user_management.users.show.system_info")}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.created_at")}
                </div>
                <div className="font-medium">{formatDate(user.created_at)}</div>
              </div>
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.updated_at")}
                </div>
                <div className="font-medium">{formatDate(user.updated_at)}</div>
              </div>
              <div>
                <div className="text-base-content/60 mb-1">
                  {t("user_management.users.fields.confirmed_at")}
                </div>
                <div className="font-medium">
                  {formatDate(user.confirmed_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Security Tab (Mock)
const SecurityTab: React.FC = () => {
  const { t } = useTranslations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            {t("user_management.users.show.change_password")}
          </h3>
          <p className="text-sm text-base-content/70 mb-4">
            {t("user_management.users.show.password_requirements")}
          </p>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {t("user_management.users.show.current_password")}
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {t("user_management.users.show.new_password")}
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  {t("user_management.users.show.confirm_password")}
                </span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                disabled
              />
            </div>
            <button className="btn btn-primary" disabled>
              {t("user_management.users.show.update_password")}
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            {t("user_management.users.show.two_factor_auth")}
          </h3>
          <p className="text-sm text-base-content/70 mb-4">
            {t("user_management.users.show.two_factor_desc")}
          </p>
          <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
            <div>
              <div className="font-medium">
                {t("user_management.users.show.status")}
              </div>
              <div className="text-sm text-base-content/70">
                {t("user_management.users.show.disabled")}
              </div>
            </div>
            <button className="btn btn-sm btn-outline" disabled>
              {t("user_management.users.show.enable")}
            </button>
          </div>
        </div>
      </div>

      <div className="card lg:col-span-2">
        <div className="card-body">
          <h3 className="card-title">
            {t("user_management.users.show.recent_devices")}
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("user_management.users.show.browser")}</th>
                  <th>{t("user_management.users.show.device")}</th>
                  <th>{t("user_management.users.show.location")}</th>
                  <th>{t("user_management.users.show.recent_activity")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chrome on Windows</td>
                  <td>Desktop</td>
                  <td>New York, USA</td>
                  <td>2 hours ago</td>
                </tr>
                <tr>
                  <td>Safari on iOS</td>
                  <td>iPhone 13</td>
                  <td>Los Angeles, USA</td>
                  <td>1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Billing Tab (Mock)
const BillingTab: React.FC<{ isParent: boolean }> = ({ isParent }) => {
  const { t } = useTranslations();

  return (
    <div className="space-y-6">
      {isParent && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">
              {t("user_management.users.show.payment_methods")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-base-300 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                  <div>
                    <div className="font-medium">**** **** **** 4242</div>
                    <div className="text-sm text-base-content/70">
                      Expires 12/2025
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm" disabled>
                    {t("common.edit")}
                  </button>
                  <button className="btn btn-ghost btn-sm text-error" disabled>
                    {t("common.delete")}
                  </button>
                </div>
              </div>
              <button className="btn btn-outline btn-sm" disabled>
                {t("user_management.users.show.add_payment_method")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            {t("user_management.users.show.billing_history")}
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("user_management.users.show.date")}</th>
                  <th>{t("user_management.users.show.description")}</th>
                  <th>{t("user_management.users.show.amount")}</th>
                  <th>{t("user_management.users.show.status")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nov 1, 2025</td>
                  <td>Monthly Subscription</td>
                  <td>$49.00</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" disabled>
                      {t("user_management.users.show.invoice")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Oct 1, 2025</td>
                  <td>Monthly Subscription</td>
                  <td>$49.00</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" disabled>
                      {t("user_management.users.show.invoice")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Tab (Mock)
const NotificationsTab: React.FC = () => {
  const { t } = useTranslations();

  const notificationSettings = [
    {
      category: t("user_management.users.show.account_activity"),
      items: [
        {
          name: t("user_management.users.show.login_activity"),
          email: true,
          push: true,
        },
        {
          name: t("user_management.users.show.password_changes"),
          email: true,
          push: false,
        },
        {
          name: t("user_management.users.show.profile_updates"),
          email: false,
          push: true,
        },
      ],
    },
    {
      category: t("user_management.users.show.team_updates"),
      items: [
        {
          name: t("user_management.users.show.new_assignments"),
          email: true,
          push: true,
        },
        {
          name: t("user_management.users.show.training_reminders"),
          email: true,
          push: true,
        },
        {
          name: t("user_management.users.show.match_schedules"),
          email: true,
          push: false,
        },
      ],
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">
          {t("user_management.users.show.notification_preferences")}
        </h3>
        <div className="space-y-6">
          {notificationSettings.map((section) => (
            <div key={section.category}>
              <h4 className="font-semibold mb-3">{section.category}</h4>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm">{item.name}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={item.email}
                          disabled
                        />
                        <span className="text-sm text-base-content/70">
                          Email
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={item.push}
                          disabled
                        />
                        <span className="text-sm text-base-content/70">
                          Push
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card-actions justify-end mt-6">
          <button className="btn btn-primary" disabled>
            {t("user_management.users.show.save_preferences")}
          </button>
        </div>
      </div>
    </div>
  );
};

// Connections Tab (Mock)
const ConnectionsTab: React.FC = () => {
  const { t } = useTranslations();

  const connections = [
    {
      id: 1,
      name: "John Smith",
      role: "Coach",
      relation: "Team Coach",
      avatar: "JS",
      connected: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Parent",
      relation: "Team Parent",
      avatar: "SJ",
      connected: true,
    },
    {
      id: 3,
      name: "Mike Davis",
      role: "Player",
      relation: "Teammate",
      avatar: "MD",
      connected: false,
    },
    {
      id: 4,
      name: "Emily Wilson",
      role: "Staff",
      relation: "Medical Staff",
      avatar: "EW",
      connected: true,
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">
            {t("user_management.users.show.connections")}
          </h3>
          <button className="btn btn-primary btn-sm" disabled>
            {t("user_management.users.show.add_connection")}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content w-12 rounded-full">
                      <span className="text-sm">{connection.avatar}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{connection.name}</h4>
                    <p className="text-sm text-base-content/70">
                      {connection.role}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {connection.relation}
                    </p>
                  </div>
                  <button
                    className={`btn btn-sm ${
                      connection.connected ? "btn-ghost" : "btn-primary"
                    }`}
                    disabled
                  >
                    {connection.connected
                      ? t("user_management.users.show.connected")
                      : t("user_management.users.show.connect")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersShowPage;
