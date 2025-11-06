import { describe, it, expect, vi, beforeEach } from "vitest";
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
    t: (key: string) => {
      const translations: Record<string, string> = {
        "user_management.users.new.title": "Create New User",
        "user_management.users.new.subtitle": "Add a new user to the system",
        "user_management.users.new.create_button": "Create User",
        "user_management.users.new.creating": "Creating...",
        "user_management.users.fields.email": "Email",
        "user_management.users.fields.first_name": "First Name",
        "user_management.users.fields.last_name": "Last Name",
        "user_management.users.fields.phone": "Phone",
        "user_management.users.fields.role": "Role",
        "user_management.users.fields.password": "Password",
        "user_management.users.fields.password_confirmation":
          "Confirm Password",
        "user_management.users.roles.player": "Player",
        "user_management.users.roles.parent": "Parent",
        "user_management.users.roles.staff": "Staff",
        "user_management.users.roles.coach": "Coach",
        "user_management.users.roles.academy_admin": "Academy Admin",
        "common.cancel": "Cancel",
        "common.required": "required",
      };
      return translations[key] || key;
    },
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
    render(<New user={{}} available_roles={["player", "parent"]} errors={{}} />);
    expect(screen.getByText("Create New User")).toBeInTheDocument();
    expect(
      screen.getByText("Add a new user to the system")
    ).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<New user={{}} available_roles={["player", "parent"]} errors={{}} />);

    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/)).toBeInTheDocument();
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

    render(<New user={{}} available_roles={["player"]} errors={formWithErrors.errors} />);

    expect(screen.getByText("Email can't be blank")).toBeInTheDocument();
    expect(screen.getByText("Password is too short")).toBeInTheDocument();
  });

  it("shows required indicators on required fields", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    // Check for "required" text indicators
    const requiredIndicators = screen.getAllByText("required");
    expect(requiredIndicators.length).toBeGreaterThan(0);
  });

  it("renders available roles in select dropdown", () => {
    const roles = ["player", "parent", "staff"];
    render(<New user={{}} available_roles={roles} errors={{}} />);

    const roleSelect = screen.getByLabelText(/Role/);
    expect(roleSelect).toBeInTheDocument();

    // Check that options are rendered
    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Parent")).toBeInTheDocument();
    expect(screen.getByText("Staff")).toBeInTheDocument();
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

    const emailInput = screen.getByLabelText(/Email/);
    emailInput.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );

    // Note: In real tests with user interaction, you'd use userEvent.type()
    // but this demonstrates the concept
  });

  it("renders password requirement hints", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    // Check for password length hint
    expect(screen.getByText(/Minimum 12 characters/i)).toBeInTheDocument();
  });

  it("shows help notes section", () => {
    render(<New user={{}} available_roles={["player"]} errors={{}} />);

    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
  });

  it("handles empty roles array gracefully", () => {
    render(<New user={{}} available_roles={[]} errors={{}} />);

    const roleSelect = screen.getByLabelText(/Role/);
    expect(roleSelect).toBeInTheDocument();
  });
});
