import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Display from "../Display";

const noop = () => {};

describe("Display", () => {
  it("filters out the selected output currency from the input selector", () => {
    render(
      <Display
        mode="currency"
        fromCurrency="USD"
        toCurrency="EUR"
        currencies={["USD", "EUR", "JPY"]}
        ratesLoading={false}
        ratesError={null}
        onFromCurrencyChange={noop}
        onToCurrencyChange={noop}
        inputValue="10"
        onInputValueChange={noop}
        outputValue="9.4"
      />,
    );

    const selects = screen.getAllByRole<HTMLSelectElement>("combobox");
    const fromSelect = selects[0]!;
    const toSelect = selects[1]!;
    const fromOptions = within(fromSelect).getAllByRole("option");
    expect(fromOptions.map((opt) => opt.getAttribute("value"))).not.toContain("EUR");

    const toOptions = within(toSelect).getAllByRole("option");
    expect(toOptions.map((opt) => opt.getAttribute("value"))).not.toContain("USD");
  });

  it("shows math results with history", () => {
    render(
      <Display
        mode="math"
        expression="1+1"
        result="2"
        history={["3+3=6", "4+4=8"]}
        isError={false}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3+3=6")).toBeInTheDocument();
  });
});
