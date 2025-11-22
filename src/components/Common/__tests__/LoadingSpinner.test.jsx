import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default size", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("renders with small size", () => {
    const { container } = render(<LoadingSpinner size="small" />);
    const spinnerContainer = container.firstChild;
    expect(spinnerContainer.className).toMatch(/spinnerContainer--small/);
  });

  it("renders with large size", () => {
    const { container } = render(<LoadingSpinner size="large" />);
    const spinnerContainer = container.firstChild;
    expect(spinnerContainer.className).toMatch(/spinnerContainer--large/);
  });

  it("applies custom className", () => {
    const { container } = render(<LoadingSpinner className="custom-spinner" />);
    expect(container.querySelector(".custom-spinner")).toBeInTheDocument();
  });

  it("is accessible with aria-label for screen readers", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });
});
