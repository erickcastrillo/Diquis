import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Show from "./Show";

// Mock Inertia router
vi.mock("@inertiajs/react", () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  router: {
    delete: vi.fn(),
  },
  usePage: () => ({
    props: {
      auth: { user: null },
      flash: {},
      locale: "en",
      available_locales: [],
      translations: {},
    },
  }),
}));

vi.mock("../../../lib/i18n", () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "user_management.users.index.title": "User Management",
        "user_management.users.show.title": "User Details",
        "user_management.users.show.subtitle": "View user information",
        "user_management.users.show.edit_user": "Edit User",
        "user_management.users.show.delete_user": "Delete User",
        "user_management.users.show.delete_confirm":
          "Are you sure you want to delete this user?",
        "user_management.users.show.account_info": "Account Information",
        "user_management.users.show.activity_info": "Activity Information",
        "user_management.users.show.activity_stats": "Activity Statistics",
        "user_management.users.show.total_sign_ins": "Total Sign Ins",
        "user_management.users.show.member_since": "Member Since",
        "user_management.users.show.not_provided": "Not provided",
        "user_management.users.show.status.active": "Active",
        "user_management.users.show.status.unconfirmed": "Unconfirmed",
        "user_management.users.show.status.locked": "Locked",
        "user_management.users.show.breadcrumb.dashboard": "Dashboard",
        "user_management.users.show.breadcrumb.users": "Users",
        "user_management.users.fields.email": "Email",
        "user_management.users.fields.phone": "Phone",
        "user_management.users.fields.first_name": "First Name",
        "user_management.users.fields.last_name": "Last Name",
        "user_management.users.fields.role": "Role",
        "user_management.users.fields.created_at": "Created At",
        "user_management.users.fields.updated_at": "Updated At",
        "user_management.users.fields.confirmed_at": "Confirmed At",
        "user_management.users.fields.locked_at": "Locked At",
        "user_management.users.fields.current_sign_in": "Current Sign In",
        "user_management.users.fields.last_sign_in": "Last Sign In",
        "user_management.users.fields.sign_in_count": "Sign In Count",
        "common.status.label": "Status",
        "common.never": "Never",
        "common.edit": "Edit",
        "common.delete": "Delete",
        "app.layout.header.search_placeholder": "Search",
        "app.layout.header.theme_toggle": "Toggle theme",
        "app.layout.header.language": "Language",
        "app.layout.header.notifications": "Notifications",
        "app.layout.header.profile": "Profile",
      };
      return translations[key] || key;
    },
    locale: "en",
    available_locales: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Español", flag: "🇪🇸" },
    ],
  }),
}));

describe("UserManagement/Users/Show", () => {
  const mockUser = {
    id: "1",
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    full_name: "John Doe",
    phone: "+1234567890",
    role: "player",
    role_display: "Player",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    confirmed_at: "2024-01-01T00:00:00Z",
    locked_at: null,
    sign_in_count: 5,
    current_sign_in_at: "2024-01-20T00:00:00Z",
    last_sign_in_at: "2024-01-19T00:00:00Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });



  it("displays user profile information", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    // Name and email may appear in multiple places (breadcrumb, profile card, etc.)
    const nameElements = screen.getAllByText("John Doe");
    expect(nameElements.length).toBeGreaterThan(0);

    const emailElements = screen.getAllByText("john@example.com");
    expect(emailElements.length).toBeGreaterThan(0);

    const playerElements = screen.getAllByText("Player");
    expect(playerElements.length).toBeGreaterThan(0);
  });

  it("displays user avatar with initials", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    // Avatar should show "JD" for John Doe
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows active status badge for confirmed and unlocked user", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    const activeElements = screen.getAllByText("Active");
    expect(activeElements.length).toBeGreaterThan(0);
  });

  it("shows unconfirmed status badge for unconfirmed user", () => {
    const unconfirmedUser = { ...mockUser, confirmed_at: null };
    render(
      <Show
        user={unconfirmedUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    const unconfirmedElements = screen.getAllByText("Unconfirmed");
    expect(unconfirmedElements.length).toBeGreaterThan(0);
  });

  it("shows locked status badge for locked user", () => {
    const lockedUser = { ...mockUser, locked_at: "2024-01-10T00:00:00Z" };
    render(
      <Show
        user={lockedUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    const lockedElements = screen.getAllByText("Locked");
    expect(lockedElements.length).toBeGreaterThan(0);
  });

  it("displays account information section", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(screen.getByText("Account Information")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });

  it("displays phone number when provided", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(screen.getAllByText("+1234567890").length).toBeGreaterThan(0);
  });

  it("shows 'Not provided' when phone is missing", () => {
    const userWithoutPhone = { ...mockUser, phone: null, first_name: null, last_name: null };
    render(
      <Show
        user={userWithoutPhone}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(screen.getAllByText("Not provided").length).toBeGreaterThan(0);
  });



  it("shows edit button when can_edit is true", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={false}
        can_manage_roles={true}
      />
    );

    const editButton = screen.getByRole("link", { name: /Edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveAttribute("href", "/admin/users/1/edit");
  });

  it("hides edit button when can_edit is false", () => {
    render(
      <Show
        user={mockUser}
        can_edit={false}
        can_delete={false}
        can_manage_roles={true}
      />
    );

    expect(
      screen.queryByRole("link", { name: /Edit/i })
    ).not.toBeInTheDocument();
  });

  it("shows delete button when can_delete is true", () => {
    render(
      <Show
        user={mockUser}
        can_edit={false}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(
      screen.getByRole("button", { name: /Delete/i })
    ).toBeInTheDocument();
  });

  it("hides delete button when can_delete is false", () => {
    render(
      <Show
        user={mockUser}
        can_edit={false}
        can_delete={false}
        can_manage_roles={true}
      />
    );

    expect(
      screen.queryByRole("button", { name: /Delete/i })
    ).not.toBeInTheDocument();
  });

  it("calls router.delete with confirmation when delete button clicked", async () => {
    const { router } = await import("@inertiajs/react");
    const user = userEvent.setup();
    render(
      <Show
        user={mockUser}
        can_edit={false}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this user?"
    );
    expect(router.delete).toHaveBeenCalledWith("/admin/users/1");
  });

  it("does not delete when user cancels confirmation", async () => {
    const { router } = await import("@inertiajs/react");
    window.confirm = vi.fn(() => false);
    const user = userEvent.setup();

    render(
      <Show
        user={mockUser}
        can_edit={false}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(router.delete).not.toHaveBeenCalled();
  });



  it("shows 'Never' for null date fields", () => {
    const userWithNullDates = {
      ...mockUser,
      locked_at: null,
      current_sign_in_at: null,
      confirmed_at: null,
    };

    render(
      <Show
        user={userWithNullDates}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(screen.getAllByText("Never").length).toBeGreaterThan(0);
  });

  it("displays first and last name separately", () => {
    render(
      <Show
        user={mockUser}
        can_edit={true}
        can_delete={true}
        can_manage_roles={true}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });
});
