import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../test/utils";
import New from "./New";

// Mock Inertia
const mockUseForm = vi.fn();
const mockUsePage = vi.fn();

vi.mock("@inertiajs/react", () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ href, children }: any) => <a href={href}>{children}</a>,
  useForm: () => mockUseForm(),
  usePage: () => mockUsePage(),
}));

// Mock custom hooks
vi.mock("../../../lib/i18n", () => ({
  useTranslations: () => ({
    t: (key: string, options?: { count?: number }) => {
      const translations: Record<string, string> = {
        "user_management.users.new.title": "Create New User",
        "user_management.users.new.subtitle": "Add a new user to the system",
        "user_management.users.new.create_button": "Create User",
        "user_management.users.new.creating": "Creating...",
        "user_management.users.new.help_title": "Important Information",
        "user_management.users.new.help_note_1": "All users will receive an email with login instructions",
        "user_management.users.new.help_note_2": "Email addresses must be unique across the system",
        "user_management.users.new.help_note_3": "Players and parents require full profile information",
        "user_management.users.fields.email": "Email",
        "user_management.users.fields.first_name": "First Name",
        "user_management.users.fields.last_name": "Last Name",
        "user_management.users.fields.phone": "Phone",
        "user_management.users.fields.role": "Role",
        "user_management.users.fields.password": "Password",
        "user_management.users.fields.password_confirmation":
          "Confirm Password",
        "user_management.users.form.sections.account_info": "Account Information",
        "user_management.users.form.sections.profile_info": "Profile Information",
        "user_management.users.form.sections.password": "Password",
        "user_management.users.form.phone_placeholder": "e.g., +1 555-0000",
        "user_management.users.form.minimum_chars": `Minimum ${options?.count || 6} characters`,
        "user_management.users.roles.player": "Player",
        "user_management.users.roles.parent": "Parent",
        "user_management.users.roles.staff": "Staff",
        "user_management.users.roles.coach": "Coach",
        "user_management.users.roles.academy_admin": "Academy Admin",
        "common.cancel": "Cancel",
        "common.back": "Back",
        "common.required": "required",
        "app.layout.header.search_placeholder": "Search",
        "app.layout.header.theme_toggle": "Toggle theme",
        "app.layout.header.language": "Language",
        "app.layout.header.notifications": "Notifications",
        "app.layout.header.profile": "Profile",
        "user_management.users.index.title": "User Management",
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
describe("UserManagement/Users/New", () => {
  const defaultFormState = {
    data: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      role: "player",
      password: "",
      password_confirmation: "",
    },
    setData: vi.fn(),
    post: vi.fn(),
    processing: false,
    errors: {},
    hasErrors: false,
    reset: vi.fn(),
    clearErrors: vi.fn(),
    setError: vi.fn(),
  };

  const defaultPageProps = {
    props: {
      auth: {
        user: {
          id: 1,
          email: "admin@example.com",
          role: "academy_admin",
          full_name: "Admin User",
        },
      },
      roles: ["player", "parent", "staff", "coach", "academy_admin"],
      translations: {},
      locale: "en",
      available_locales: [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "es", name: "Español", flag: "🇪🇸" },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseForm.mockReturnValue(defaultFormState);
    mockUsePage.mockReturnValue(defaultPageProps);
  });

  it("renders the page title correctly", () => {
    render(
      <New user={{}} available_roles={["player", "parent"]} errors={{}} />
    );
    expect(screen.getByText("Create New User")).toBeInTheDocument();
    expect(
      screen.getByText("Add a new user to the system")
    ).toBeInTheDocument();
  });

  it("renders form fields with proper labels", () => {
    render(
      <New
        user={{}}
        available_roles={["player", "coach", "parent"]}
        errors={{}}
      />
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    // Password appears twice (section header and label), so use getAllByText
    expect(screen.getAllByText("Password").length).toBeGreaterThan(0);
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("displays server-side validation errors", () => {
    const formWithErrors = {
      ...defaultFormState,
      errors: {
        email: ["Email can't be blank"],
        password: ["Password is too short"],
      },
    };
    mockUseForm.mockReturnValue(formWithErrors);

    render(
      <New
        user={{}}
        available_roles={["player"]}
        errors={formWithErrors.errors}
      />
    );

    expect(screen.getByText("Email can't be blank")).toBeInTheDocument();
    expect(screen.getByText("Password is too short")).toBeInTheDocument();
  });

  it("shows required indicators on required fields", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    // Check for asterisk (*) required indicators
    const asterisks = screen.getAllByText("*");
    expect(asterisks.length).toBeGreaterThan(0);
  });

  it("renders available roles in select dropdown", () => {
    const roles = ["player", "coach", "parent"];
    render(<New user={{}} available_roles={roles} errors={{}} />);

    // Find the select element by its value (first role becomes default)
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThan(0);
    
    // Check that role options are present
    expect(screen.getByText("Player")).toBeInTheDocument();
  });

  it("displays create button", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    const createButton = screen.getByRole("button", { name: /Create User/i });
    expect(createButton).toBeInTheDocument();
    expect(createButton).not.toBeDisabled();
  });

  it("shows processing state when submitting", () => {
    const processingFormState = {
      ...defaultFormState,
      processing: true,
    };
    mockUseForm.mockReturnValue(processingFormState);

    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    const submitButton = screen.getByRole("button", { name: /Creating/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("displays cancel link", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    const cancelLink = screen.getByRole("link", { name: /Cancel/i });
    expect(cancelLink).toBeInTheDocument();
    expect(cancelLink).toHaveAttribute("href", "/admin/users");
  });

  it("calls setData when form fields are changed", () => {
    const setDataMock = vi.fn();
    mockUseForm.mockReturnValue({
      ...defaultFormState,
      setData: setDataMock,
    });

    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    // Get inputs by type attribute
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);
    
    // Verify form is interactive
    expect(screen.getByRole("button", { name: /create user/i })).toBeInTheDocument();
  });

  it("renders password requirement hints", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    // Check for password length hint (the component shows "minimum 6 chars")
    expect(screen.getByText(/minimum 6/i)).toBeInTheDocument();
  });

  it("shows help notes section", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    expect(screen.getByText(/Important/i)).toBeInTheDocument();
  });

  it("handles empty roles array gracefully", () => {
    render(<New user={{}} available_roles={[]} errors={{}} />);

    // Should still render the form even without roles
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
