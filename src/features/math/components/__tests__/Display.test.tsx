import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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
        onModeChange={noop}
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
        onModeChange={noop}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3+3=6")).toBeInTheDocument();
  });

  it("shows the exchange rate link in math mode", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();

    render(
      <Display
        mode="math"
        expression="1"
        result={null}
        history={[]}
        isError={false}
        onModeChange={onModeChange}
      />,
    );

    const link = screen.getByRole("button", { name: "Exchange Rate" });
    await user.click(link);

    expect(onModeChange).toHaveBeenCalledWith("currency");
  });

  it("shows the calculator link in currency mode", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();

    render(
      <Display
        mode="currency"
        fromCurrency="USD"
        toCurrency="EUR"
        currencies={["USD", "EUR"]}
        ratesLoading={false}
        ratesError={null}
        onFromCurrencyChange={noop}
        onToCurrencyChange={noop}
        inputValue="10"
        onInputValueChange={noop}
        outputValue="9.4"
        onModeChange={onModeChange}
      />,
    );

    const link = screen.getByRole("button", { name: "Calculator" });
    await user.click(link);

    expect(onModeChange).toHaveBeenCalledWith("math");
  });
});
