import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IconButton from "../IconButton";

describe("IconButton", () => {
  const mockIcon = <span data-testid="test-icon">★</span>;

  it("renders icon and text", () => {
    render(<IconButton icon={mockIcon}>Click me</IconButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders icon only when iconOnly is true", () => {
    render(<IconButton icon={mockIcon} iconOnly ariaLabel="Star button" />);
    expect(screen.getByRole("button", { name: /star button/i })).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton icon={mockIcon} onClick={handleClick}>
        Click
      </IconButton>,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton icon={mockIcon} onClick={handleClick} disabled>
        Click
      </IconButton>,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies primary variant class", () => {
    render(
      <IconButton icon={mockIcon} variant="primary">
        Primary
      </IconButton>,
    );
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/iconButton--primary/);
  });

  it("applies icon-only class when iconOnly is true", () => {
    render(<IconButton icon={mockIcon} iconOnly ariaLabel="Icon" />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/iconButton--icon-only/);
  });

  it("applies custom className", () => {
    render(
      <IconButton icon={mockIcon} className="custom">
        Button
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("custom");
  });

  it("uses correct button type", () => {
    render(
      <IconButton icon={mockIcon} type="submit">
        Submit
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("uses ariaLabel when provided", () => {
    render(
      <IconButton icon={mockIcon} ariaLabel="Custom label">
        Text
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: /custom label/i })).toBeInTheDocument();
  });

  it("logs error when iconOnly is true but ariaLabel is missing", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<IconButton icon={mockIcon} iconOnly />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("ariaLabel is required when iconOnly is true"),
    );

    consoleErrorSpy.mockRestore();
  });

  it("does not log error when iconOnly is true and ariaLabel is provided", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<IconButton icon={mockIcon} iconOnly ariaLabel="Descriptive label" />);

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
