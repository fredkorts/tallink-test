import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CurrencyDisplay from "../CurrencyDisplay";

describe("CurrencyDisplay", () => {
  const baseProps = {
    fromCurrency: "USD",
    toCurrency: "EUR",
    currencies: ["USD", "EUR", "JPY"],
    ratesLoading: false,
    ratesError: null,
    onFromCurrencyChange: () => {},
    onToCurrencyChange: () => {},
    inputValue: "10",
    onInputValueChange: () => {},
    outputValue: "9.4",
    timestamp: "2024-01-01T00:00:00Z",
  };

  it("filters out the paired currency from each selector", () => {
    render(<CurrencyDisplay {...baseProps} />);

    const [fromSelect, toSelect] = screen.getAllByRole<HTMLSelectElement>("combobox");
    const fromOptions = within(fromSelect).getAllByRole("option");
    const toOptions = within(toSelect).getAllByRole("option");

    expect(fromOptions.map((opt) => opt.getAttribute("value"))).not.toContain("EUR");
    expect(toOptions.map((opt) => opt.getAttribute("value"))).not.toContain("USD");
  });

  it("shows the latest output and timestamp", () => {
    render(<CurrencyDisplay {...baseProps} />);

    expect(screen.getByText("9.4")).toBeInTheDocument();
    expect(screen.getByText(/Last Updated/i)).toBeInTheDocument();
  });
});
