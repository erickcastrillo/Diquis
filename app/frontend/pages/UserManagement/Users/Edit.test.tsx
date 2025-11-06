import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Edit from "./Edit";

// Mock Inertia useForm
const mockSetData = vi.fn();
const mockPatch = vi.fn();

const mockUseForm = vi.fn(() => ({
  data: {
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",
    role: "player",
    password: "",
    password_confirmation: "",
  },
  setData: mockSetData,
  patch: mockPatch,
  processing: false,
  errors: {},
}));

vi.mock("@inertiajs/react", () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  useForm: () => mockUseForm(),
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
    t: (key: string, options?: { count?: number }) => {
      const translations: Record<string, string> = {
        "user_management.users.index.title": "User Management",
        "user_management.users.edit.title": "Edit User",
        "user_management.users.edit.subtitle": "Update user information",
        "user_management.users.edit.update_button": "Update User",
        "user_management.users.edit.updating": "Updating...",
        "user_management.users.edit.password_section": "Change Password",
        "user_management.users.edit.password_note":
          "Leave blank to keep current password",
        "user_management.users.edit.new_password": "New Password",
        "user_management.users.edit.confirm_new_password":
          "Confirm New Password",
        "user_management.users.edit.role_permission_note":
          "You don't have permission to change roles",
        "user_management.users.edit.help_title": "Important Information",
        "user_management.users.edit.help_note_1":
          "Email addresses must be unique",
        "user_management.users.edit.help_note_2":
          "Password must be at least 6 characters",
        "user_management.users.edit.help_note_3":
          "Changes will be reflected immediately",
        "user_management.users.fields.email": "Email",
        "user_management.users.fields.first_name": "First Name",
        "user_management.users.fields.last_name": "Last Name",
        "user_management.users.fields.phone": "Phone",
        "user_management.users.fields.role": "Role",
        "user_management.users.fields.password": "Password",
        "user_management.users.form.sections.account_info":
          "Account Information",
        "user_management.users.form.sections.profile_info":
          "Profile Information",
        "user_management.users.form.phone_placeholder": "e.g., +1 555-0000",
        "user_management.users.form.minimum_chars": `Minimum ${
          options?.count || 6
        } characters`,
        "user_management.users.roles.player": "Player",
        "user_management.users.roles.coach": "Coach",
        "user_management.users.roles.parent": "Parent",
        "common.cancel": "Cancel",
        "common.back": "Back",
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

describe("UserManagement/Users/Edit", () => {
  const mockUser = {
    id: "1",
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",
    role: "player",
  };

  const defaultProps = {
    user: mockUser,
    available_roles: ["player", "coach", "parent"],
    can_manage_roles: true,
    errors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseForm.mockReturnValue({
      data: {
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
        role: "player",
        password: "",
        password_confirmation: "",
      },
      setData: mockSetData,
      patch: mockPatch,
      processing: false,
      errors: {},
    });
  });

  it("renders the page title correctly", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(screen.getByText("Update user information")).toBeInTheDocument();
  });

  it("displays back button linking to user detail page", () => {
    render(<Edit {...defaultProps} />);

    const backButton = screen.getByRole("link", { name: /Back/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/admin/users/1");
  });

  it("pre-fills form with user data", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+1234567890")).toBeInTheDocument();
  });

  it("displays all form sections", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText("Account Information")).toBeInTheDocument();
    expect(screen.getByText("Profile Information")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });

  it("shows role select when can_manage_roles is true", () => {
    render(<Edit {...defaultProps} />);

    const roleSelect = screen.getByRole("combobox");
    expect(roleSelect).toBeInTheDocument();
    expect(screen.getByText("Player")).toBeInTheDocument();
  });

  it("shows disabled role input when can_manage_roles is false", () => {
    render(<Edit {...defaultProps} can_manage_roles={false} />);

    const roleInputs = screen.getAllByDisplayValue("Player");
    const disabledInput = roleInputs.find(
      (input) => (input as HTMLInputElement).disabled
    );
    expect(disabledInput).toBeTruthy();
    expect(
      screen.getByText("You don't have permission to change roles")
    ).toBeInTheDocument();
  });

  it("displays available roles in select dropdown", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Coach")).toBeInTheDocument();
    expect(screen.getByText("Parent")).toBeInTheDocument();
  });

  it("shows password fields for changing password", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText("New Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm New Password")).toBeInTheDocument();
    expect(
      screen.getByText("Leave blank to keep current password")
    ).toBeInTheDocument();
  });

  it("displays password requirement hint", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText(/Minimum 6 characters/i)).toBeInTheDocument();
  });

  it("shows required indicators on required fields", () => {
    render(<Edit {...defaultProps} />);

    const asterisks = screen.getAllByText("*");
    expect(asterisks.length).toBeGreaterThan(0);
  });

  it("displays cancel button linking to user detail page", () => {
    render(<Edit {...defaultProps} />);

    const cancelButton = screen.getByRole("link", { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveAttribute("href", "/admin/users/1");
  });

  it("displays update button", () => {
    render(<Edit {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /Update User/i })
    ).toBeInTheDocument();
  });

  it("shows processing state when submitting", () => {
    mockUseForm.mockReturnValue({
      data: {
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
        role: "player",
        password: "",
        password_confirmation: "",
      },
      setData: mockSetData,
      patch: mockPatch,
      processing: true,
      errors: {},
    });

    render(<Edit {...defaultProps} />);

    expect(screen.getByText("Updating...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Updating.../i })).toBeDisabled();
  });

  it("submits form with patch request when submitted", async () => {
    const user = userEvent.setup();
    render(<Edit {...defaultProps} />);

    const submitButton = screen.getByRole("button", { name: /Update User/i });
    await user.click(submitButton);

    expect(mockPatch).toHaveBeenCalledWith("/admin/users/1");
  });

  it("displays server-side validation errors", () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        email: ["Email has already been taken"],
      },
    };

    render(<Edit {...propsWithErrors} />);

    expect(
      screen.getByText("Email has already been taken")
    ).toBeInTheDocument();
  });

  it("applies error styling to fields with errors", () => {
    mockUseForm.mockReturnValue({
      data: {
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
        role: "player",
        password: "",
        password_confirmation: "",
      },
      setData: mockSetData,
      patch: mockPatch,
      processing: false,
      errors: {
        email: ["Email has already been taken"],
      },
    });

    render(<Edit {...defaultProps} />);

    const emailInput = screen.getByDisplayValue("john@example.com");
    expect(emailInput).toHaveClass("input-error");
  });

  it("displays help information section", () => {
    render(<Edit {...defaultProps} />);

    expect(screen.getByText("Important Information")).toBeInTheDocument();
    expect(
      screen.getByText("Email addresses must be unique")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  it("makes first and last name required for player role", () => {
    mockUseForm.mockReturnValue({
      data: {
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
        role: "player",
        password: "",
        password_confirmation: "",
      },
      setData: mockSetData,
      patch: mockPatch,
      processing: false,
      errors: {},
    });

    render(<Edit {...defaultProps} />);

    const firstNameInput = screen.getByDisplayValue("John");
    const lastNameInput = screen.getByDisplayValue("Doe");

    expect(firstNameInput).toBeRequired();
    expect(lastNameInput).toBeRequired();
  });

  it("shows phone field placeholder", () => {
    render(<Edit {...defaultProps} />);

    const phoneInput = screen.getByPlaceholderText("e.g., +1 555-0000");
    expect(phoneInput).toBeInTheDocument();
  });

  it("handles user with missing optional fields", () => {
    const userWithoutOptionalFields = {
      ...mockUser,
      email: "minimal@example.com",
      first_name: null,
      last_name: null,
      phone: null,
    };

    // Update mock to reflect the user's data
    mockUseForm.mockReturnValue({
      data: {
        email: "minimal@example.com",
        first_name: "",
        last_name: "",
        phone: "",
        role: "player",
        password: "",
        password_confirmation: "",
      },
      setData: mockSetData,
      patch: mockPatch,
      processing: false,
      errors: {},
    });

    render(<Edit {...defaultProps} user={userWithoutOptionalFields} />);

    const emailInputs = screen.getAllByDisplayValue("minimal@example.com");
    expect(emailInputs.length).toBeGreaterThan(0);
    // Empty inputs should exist for optional fields
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
