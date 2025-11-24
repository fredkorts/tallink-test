import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<ErrorMessage title="Error" message="Something went wrong" />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("does not render when message is empty", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });

  it("does not render when message is undefined", () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });

  it("applies error type class by default", () => {
    const { container } = render(<ErrorMessage message="Error" />);
    const errorDiv = container.firstElementChild as HTMLElement | null;
    if (!errorDiv) throw new Error("Expected error message element");

    expect(errorDiv.className).toMatch(/errorMessage/);
  });

  it("applies warning type class", () => {
    const { container } = render(<ErrorMessage message="Warning" type="warning" />);
    const errorDiv = container.firstElementChild as HTMLElement | null;
    if (!errorDiv) throw new Error("Expected error message element");

    expect(errorDiv.className).toMatch(/errorMessage--warning/);
  });

  it("applies info type class", () => {
    const { container } = render(<ErrorMessage message="Info" type="info" />);
    const errorDiv = container.firstElementChild as HTMLElement | null;
    if (!errorDiv) throw new Error("Expected error message element");

    expect(errorDiv.className).toMatch(/errorMessage--info/);
  });

  it("applies custom className", () => {
    const { container } = render(<ErrorMessage message="Error" className="custom-error" />);
    expect(container.querySelector(".custom-error")).toBeInTheDocument();
  });
});
