import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../test/utils";
import FlashMessages from "./FlashMessages";

// Mock Inertia's usePage hook
const mockUsePage = vi.fn();
vi.mock("@inertiajs/react", () => ({
  usePage: () => mockUsePage(),
}));

describe("FlashMessages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when there are no flash messages", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {},
      },
    });

    const { container } = render(<FlashMessages />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a success notice message", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          notice: "User created successfully",
        },
      },
    });

    render(<FlashMessages />);
    expect(screen.getByText("User created successfully")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alert-success");
  });

  it("renders an alert message", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          alert: "Something needs your attention",
        },
      },
    });

    render(<FlashMessages />);
    expect(
      screen.getByText("Something needs your attention")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alert-warning");
  });

  it("renders an error message", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          error: "Failed to delete user",
        },
      },
    });

    render(<FlashMessages />);
    expect(screen.getByText("Failed to delete user")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alert-error");
  });

  it("renders multiple messages at once", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          notice: "Success message",
          alert: "Warning message",
          error: "Error message",
        },
      },
    });

    render(<FlashMessages />);
    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByText("Warning message")).toBeInTheDocument();
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getAllByRole("alert")).toHaveLength(3);
  });

  it("displays the correct icon for success messages", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          notice: "Success with icon",
        },
      },
    });

    const { container } = render(<FlashMessages />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Check for checkmark circle path (success icon)
    expect(svg?.querySelector("path")).toHaveAttribute(
      "d",
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    );
  });

  it("displays the correct icon for error/alert messages", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          error: "Error with icon",
        },
      },
    });

    const { container } = render(<FlashMessages />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    // Check for warning triangle path (error/alert icon)
    expect(svg?.querySelector("path")).toHaveAttribute(
      "d",
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    );
  });

  it("positions messages in top-right corner", () => {
    mockUsePage.mockReturnValue({
      props: {
        flash: {
          notice: "Position test",
        },
      },
    });

    const { container } = render(<FlashMessages />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("fixed");
    expect(wrapper).toHaveClass("bottom-4");
    expect(wrapper).toHaveClass("right-4");
    expect(wrapper).toHaveClass("z-9999");
  });

  it("handles flash object being undefined", () => {
    mockUsePage.mockReturnValue({
      props: {},
    });

    const { container } = render(<FlashMessages />);
    expect(container.firstChild).toBeNull();
  });

  it("clears timers on unmount to prevent memory leaks", () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

    mockUsePage.mockReturnValue({
      props: {
        flash: {
          notice: "Cleanup test",
        },
      },
    });

    const { unmount } = render(<FlashMessages />);
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
