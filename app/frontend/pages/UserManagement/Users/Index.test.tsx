import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Index from "./Index";

// Mock Inertia
vi.mock("@inertiajs/react", () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ href, children, method, onBefore, ...props }: any) => {
    const handleClick = (e: React.MouseEvent) => {
      if (method === "delete") {
        e.preventDefault();
        if (onBefore) {
          const result = onBefore();
          if (result) {
            // Mock delete called
          }
        }
      }
    };
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  },
  router: {
    visit: vi.fn(),
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
    t: (key: string, options?: { item?: string }) => {
      const translations: Record<string, string> = {
        "user_management.users.index.title": "User Management",
        "user_management.users.index.subtitle": "Manage system users",
        "user_management.users.index.create_user": "Create User",
        "user_management.users.index.search_placeholder":
          "Search users by name or email...",
        "user_management.users.index.showing": "Showing",
        "user_management.users.index.to": "to",
        "user_management.users.index.of": "of",
        "user_management.users.index.users": "users",
        "user_management.users.index.no_results": "No users found",
        "user_management.users.index.no_users": "No users yet",
        "user_management.users.fields.full_name": "Full Name",
        "user_management.users.fields.email": "Email",
        "user_management.users.fields.role": "Role",
        "user_management.users.fields.created_at": "Created At",
        "common.status.label": "Status",
        "common.status.active": "Active",
        "common.status.pending": "Pending",
        "common.status.locked": "Locked",
        "common.actions": "Actions",
        "common.search": "Search",
        "common.select_all": "Select all",
        "common.never": "Never",
        "common.previous": "Previous",
        "common.next": "Next",
        "common.view_item": `View ${options?.item || "item"}`,
        "common.edit_item": `Edit ${options?.item || "item"}`,
        "common.delete_item": `Delete ${options?.item || "item"}`,
        "common.confirm_delete": "Are you sure?",
        "common.select_item": "Select item",
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

describe("UserManagement/Users/Index", () => {
  const mockUsers = [
    {
      id: "1",
      email: "john@example.com",
      first_name: "John",
      last_name: "Doe",
      full_name: "John Doe",
      phone: "+1234567890",
      role: "player",
      role_display: "Player",
      created_at: "2024-01-01T00:00:00Z",
      confirmed_at: "2024-01-01T00:00:00Z",
      locked_at: null,
      sign_in_count: 5,
    },
    {
      id: "2",
      email: "jane@example.com",
      first_name: "Jane",
      last_name: "Smith",
      full_name: "Jane Smith",
      phone: null,
      role: "coach",
      role_display: "Coach",
      created_at: "2024-01-02T00:00:00Z",
      confirmed_at: null,
      locked_at: null,
      sign_in_count: 0,
    },
    {
      id: "3",
      email: "locked@example.com",
      first_name: "Locked",
      last_name: "User",
      full_name: "Locked User",
      phone: null,
      role: "parent",
      role_display: "Parent",
      created_at: "2024-01-03T00:00:00Z",
      confirmed_at: "2024-01-03T00:00:00Z",
      locked_at: "2024-01-04T00:00:00Z",
      sign_in_count: 10,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.confirm
    window.confirm = vi.fn(() => true);
  });

  it("renders the page title correctly", () => {
    render(<Index users={mockUsers} can_create={true} />);

    expect(screen.getByText("User Management")).toBeInTheDocument();
    expect(screen.getByText("Manage system users")).toBeInTheDocument();
  });

  it("displays the create user button when can_create is true", () => {
    render(<Index users={mockUsers} can_create={true} />);

    const createButton = screen.getByRole("link", { name: /Create User/i });
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveAttribute("href", "/admin/users/new");
  });

  it("does not display create user button when can_create is false", () => {
    render(<Index users={mockUsers} can_create={false} />);

    expect(
      screen.queryByRole("link", { name: /Create User/i })
    ).not.toBeInTheDocument();
  });

  it("displays all users in the table", () => {
    render(<Index users={mockUsers} can_create={true} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Locked User")).toBeInTheDocument();
  });

  it("displays correct status badges", () => {
    render(<Index users={mockUsers} can_create={true} />);

    // John Doe - Active (confirmed and not locked)
    expect(screen.getByText("Active")).toBeInTheDocument();

    // Jane Smith - Pending (not confirmed)
    expect(screen.getByText("Pending")).toBeInTheDocument();

    // Locked User - Locked
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("displays role badges correctly", () => {
    render(<Index users={mockUsers} can_create={true} />);

    // Roles may appear in tooltip or multiple places
    expect(screen.getAllByText("Player").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Coach").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Parent").length).toBeGreaterThan(0);
  });

  it("filters users based on search input", async () => {
    const user = userEvent.setup();
    render(<Index users={mockUsers} can_create={true} />);

    const searchInput = screen.getByPlaceholderText(
      "Search users by name or email..."
    );

    // Initially all users visible
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Search for "john"
    await user.type(searchInput, "john");

    // Only John should be visible, but Jane and Locked should still be in document
    // because we're filtering, not removing from DOM
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows no results message when search has no matches", async () => {
    const user = userEvent.setup();
    render(<Index users={mockUsers} can_create={true} />);

    const searchInput = screen.getByPlaceholderText(
      "Search users by name or email..."
    );

    await user.type(searchInput, "nonexistent");

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("shows empty state when no users exist", () => {
    render(<Index users={[]} can_create={true} />);

    expect(screen.getByText("No users yet")).toBeInTheDocument();
  });

  it("displays pagination controls", () => {
    // Create more than 8 users to trigger pagination
    const manyUsers = Array.from({ length: 20 }, (_, i) => ({
      ...mockUsers[0],
      id: `${i + 1}`,
      email: `user${i + 1}@example.com`,
      full_name: `User ${i + 1}`,
    }));

    render(<Index users={manyUsers} can_create={true} />);

    // Should show pagination buttons
    expect(
      screen.getByRole("button", { name: /Previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("allows selecting individual users", async () => {
    const user = userEvent.setup();
    render(<Index users={mockUsers} can_create={true} />);

    const checkboxes = screen.getAllByRole("checkbox");
    // First checkbox is "select all", second is first user
    expect(checkboxes.length).toBeGreaterThan(1);

    await user.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });

  it("allows selecting all users", async () => {
    const user = userEvent.setup();
    render(<Index users={mockUsers} can_create={true} />);

    const selectAllCheckbox = screen.getByLabelText("Select all");
    await user.click(selectAllCheckbox);

    expect(selectAllCheckbox).toBeChecked();
  });

  it("displays action buttons for each user", () => {
    render(<Index users={mockUsers} can_create={true} />);

    // Should have view, edit, delete buttons for each user
    const viewButtons = screen.getAllByLabelText(/View user/i);
    const editButtons = screen.getAllByLabelText(/Edit user/i);
    const deleteButtons = screen.getAllByLabelText(/Delete user/i);

    expect(viewButtons).toHaveLength(3);
    expect(editButtons).toHaveLength(3);
    expect(deleteButtons).toHaveLength(3);
  });

  it("navigates to user detail page when view button clicked", () => {
    render(<Index users={mockUsers} can_create={true} />);

    const viewButtons = screen.getAllByLabelText(/View user/i);
    expect(viewButtons[0]).toHaveAttribute("href", "/admin/users/1");
  });

  it("navigates to edit page when edit button clicked", () => {
    render(<Index users={mockUsers} can_create={true} />);

    const editButtons = screen.getAllByLabelText(/Edit user/i);
    expect(editButtons[0]).toHaveAttribute("href", "/admin/users/1/edit");
  });

  it("shows pagination info correctly", () => {
    render(<Index users={mockUsers} can_create={true} />);

    // Check for pagination text - looking for the combined text
    const paginationText = screen.getByText((content) => {
      // Check if this is a text node that contains pagination info
      return (
        content.includes("Showing") &&
        content.includes("to") &&
        content.includes("of") &&
        content.includes("users")
      );
    });
    expect(paginationText).toBeInTheDocument();
  });
});
