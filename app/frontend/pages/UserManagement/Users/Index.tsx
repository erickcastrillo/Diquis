import { Head, Link } from "@inertiajs/react";
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
  confirmed_at: string | null;
  locked_at: string | null;
  sign_in_count: number;
}

interface Props {
  users: User[];
  can_create: boolean;
}

const UsersIndexPage: React.FC<Props> = ({ users, can_create }) => {
  const { t } = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(new Set(paginatedUsers.map((u) => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const getStatusBadge = (user: User) => {
    if (user.locked_at) {
      return (
        <span className="badge badge-soft badge-error badge-sm">{t("common.status.locked")}</span>
      );
    }
    if (!user.confirmed_at) {
      return (
        <span className="badge badge-soft badge-warning badge-sm">{t("common.status.pending")}</span>
      );
    }
    return (
      <span className="badge badge-soft badge-success badge-sm">{t("common.status.active")}</span>
    );
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      player: "badge-soft badge-primary",
      parent: "badge-soft badge-secondary",
      staff: "badge-soft badge-accent",
      coach: "badge-soft badge-info",
      academy_admin: "badge-soft badge-warning",
      academy_owner: "badge-soft badge-error",
      super_admin: "badge-soft badge-neutral",
    };
    return colors[role] || "badge-soft badge-neutral";
  };

  const getRoleIcon = (role: string) => {
    const icons: { [key: string]: string } = {
      player: "icon-[tabler--ball-football]",
      parent: "icon-[tabler--users]",
      staff: "icon-[tabler--briefcase]",
      coach: "icon-[tabler--whistle]",
      academy_admin: "icon-[tabler--settings]",
      academy_owner: "icon-[tabler--crown]",
      super_admin: "icon-[tabler--shield-lock]",
    };
    return icons[role] || "icon-[tabler--user]";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t("common.never");
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <FlyonUILayout>
      <Head title={`${t("user_management.users.index.title")} | Diquis`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {t("user_management.users.index.title")}
            </h1>
            <p className="text-base-content/60 mt-1">
              {t("user_management.users.index.subtitle")}
            </p>
          </div>
          {can_create && (
            <Link href="/admin/users/new" className="btn btn-primary">
              <span className="icon-[tabler--plus] size-5"></span>
              {t("user_management.users.index.create_user")}
            </Link>
          )}
        </div>

        {/* FlyonUI Datatable */}
        <div className="bg-base-100 flex flex-col rounded-md shadow-base-300/20 shadow-sm">
          {/* Search Bar */}
          <div className="py-3 ps-5 border-b border-base-content/25">
            <div className="input input-sm max-w-60">
              <span className="icon-[tabler--search] text-base-content/80 my-auto me-3 size-4 shrink-0"></span>
              <label className="sr-only" htmlFor="table-input-search">
                {t("common.search")}
              </label>
              <input
                type="search"
                className="grow"
                placeholder={t(
                  "user_management.users.index.search_placeholder"
                )}
                id="table-input-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="table min-w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="w-3.5 pe-0">
                        <div className="flex h-5 items-center">
                          <input
                            id="table-search-all"
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={
                              paginatedUsers.length > 0 &&
                              selectedUsers.size === paginatedUsers.length
                            }
                            onChange={handleSelectAll}
                          />
                          <label htmlFor="table-search-all" className="sr-only">
                            {t("common.select_all")}
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="group w-fit">
                        <div className="flex items-center justify-between">
                          {t("user_management.users.fields.full_name")}
                        </div>
                      </th>
                      <th scope="col" className="group w-fit">
                        <div className="flex items-center justify-between">
                          {t("user_management.users.fields.email")}
                        </div>
                      </th>
                      <th scope="col" className="group w-fit">
                        <div className="flex items-center justify-between">
                          {t("user_management.users.fields.role")}
                        </div>
                      </th>
                      <th scope="col" className="group w-fit">
                        <div className="flex items-center justify-between">
                          {t("common.status.label")}
                        </div>
                      </th>
                      <th scope="col" className="group w-fit">
                        <div className="flex items-center justify-between">
                          {t("user_management.users.fields.created_at")}
                        </div>
                      </th>
                      <th scope="col">{t("common.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <div className="py-10 px-5 flex flex-col justify-center items-center text-center">
                            <span className="icon-[tabler--search] shrink-0 size-6 text-base-content"></span>
                            <div className="max-w-sm mx-auto">
                              <p className="mt-2 text-sm text-base-content/80">
                                {searchTerm
                                  ? t("user_management.users.index.no_results")
                                  : t("user_management.users.index.no_users")}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="w-3.5 pe-0">
                            <div className="flex h-5 items-center">
                              <input
                                id={`table-search-${user.id}`}
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                checked={selectedUsers.has(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                              />
                              <label
                                htmlFor={`table-search-${user.id}`}
                                className="sr-only"
                              >
                                {t("common.select_item", { item: user.full_name })}
                              </label>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="size-10 rounded-full">
                                  <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      user.full_name
                                    )}&background=random`}
                                    alt={user.full_name}
                                  />
                                </div>
                              </div>
                              <div className="font-medium">
                                {user.full_name}
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <div className="tooltip">
                              <span
                                className={`tooltip-toggle badge badge-sm ${getRoleBadgeColor(
                                  user.role
                                )} inline-flex items-center gap-1`}
                              >
                                <span
                                  className={`${getRoleIcon(
                                    user.role
                                  )} size-3.5`}
                                ></span>
                                {user.role_display}
                              </span>
                              <span
                                className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
                                role="tooltip"
                              >
                                <span className="tooltip-body">
                                  {user.role
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td>{getStatusBadge(user)}</td>
                          <td className="text-sm">
                            {formatDate(user.created_at)}
                          </td>
                          <td>
                            <Link
                              href={`/admin/users/${user.id}`}
                              className="btn btn-circle btn-text btn-sm"
                              aria-label={t("common.view_item", { item: "user" })}
                            >
                              <span className="icon-[tabler--eye] size-5"></span>
                            </Link>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="btn btn-circle btn-text btn-sm"
                              aria-label={t("common.edit_item", { item: "user" })}
                            >
                              <span className="icon-[tabler--pencil] size-5"></span>
                            </Link>
                            <Link
                              href={`/admin/users/${user.id}`}
                              method="delete"
                              as="button"
                              className="btn btn-circle btn-text btn-sm"
                              aria-label={t("common.delete_item", { item: "user" })}
                              onBefore={() =>
                                confirm(
                                  t("common.confirm_delete", { item: user.full_name })
                                )
                              }
                            >
                              <span className="icon-[tabler--trash] size-5"></span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="border-base-content/25 flex items-center justify-between gap-3 border-t p-3 max-md:flex-wrap max-md:justify-center">
            <div className="text-base-content/80 text-sm">
              {t("user_management.users.index.showing")}{" "}
              <span className="font-medium">
                {filteredUsers.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              {t("user_management.users.index.to")}{" "}
              <span className="font-medium">
                {Math.min(endIndex, filteredUsers.length)}
              </span>{" "}
              {t("user_management.users.index.of")}{" "}
              <span className="font-medium">{filteredUsers.length}</span>{" "}
              {t("user_management.users.index.users")}
            </div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <span className="icon-[tabler--chevrons-left] size-4.5 rtl:rotate-180"></span>
                <span className="sr-only">{t("common.previous")}</span>
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      className={`btn btn-sm ${
                        page === currentPage ? "btn-primary" : "btn-text"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">{t("common.next")}</span>
                <span className="icon-[tabler--chevrons-right] size-4.5 rtl:rotate-180"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default UsersIndexPage;
