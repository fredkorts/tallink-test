import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../features/math/hooks/useCalculator", () => ({
  useCalculator: vi.fn(),
}));

vi.mock("../../../features/math/hooks/useHistory", () => ({
  default: vi.fn(),
}));

vi.mock("../../../features/math/hooks/useKeyboardHandler", () => ({
  useKeyboardHandler: vi.fn(),
}));

vi.mock("../../../hooks/useCurrencyRates", () => ({
  useCurrencyRates: vi.fn(),
}));

vi.mock("../../../features/currency/hooks/useCurrencyConverter", () => ({
  useCurrencyConverter: vi.fn(),
}));

import Calculator from "../Calculator";
import { useCalculator } from "../../../features/math/hooks/useCalculator";
import useHistory from "../../../features/math/hooks/useHistory";
import { useKeyboardHandler } from "../../../features/math/hooks/useKeyboardHandler";
import { useCurrencyRates } from "../../../hooks/useCurrencyRates";
import { useCurrencyConverter } from "../../../features/currency/hooks/useCurrencyConverter";

describe("Calculator", () => {
  const mockUseCalculator = useCalculator as unknown as vi.Mock;
  const mockUseHistory = useHistory as unknown as vi.Mock;
  const mockUseKeyboardHandler = useKeyboardHandler as unknown as vi.Mock;
  const mockUseCurrencyRates = useCurrencyRates as unknown as vi.Mock;
  const mockUseCurrencyConverter = useCurrencyConverter as unknown as vi.Mock;

  beforeEach(() => {
    mockUseCalculator.mockReturnValue({
      expression: "1+1",
      result: "2",
      lastEntry: null,
      isError: false,
      handleNumberInput: vi.fn(),
      handleDecimalInput: vi.fn(),
      handleOperatorInput: vi.fn(),
      handleEquals: vi.fn(),
      handleClear: vi.fn(),
      handleBackspace: vi.fn(),
    });

    mockUseHistory.mockReturnValue({
      history: ["1+1=2"],
      addHistoryEntry: vi.fn(),
      clearHistory: vi.fn(),
    });

    mockUseKeyboardHandler.mockReturnValue(undefined);

    mockUseCurrencyRates.mockReturnValue({
      rates: null,
      currencies: ["EUR", "USD"],
      timestamp: "2024-01-01T00:00:00Z",
      loading: false,
      error: null,
      refresh: vi.fn(),
      convert: vi.fn(),
    });

    mockUseCurrencyConverter.mockReturnValue({
      fromCurrency: "USD",
      toCurrency: "EUR",
      inputValue: "10",
      outputValue: "9.4",
      handlers: {
        onFromCurrencyChange: vi.fn(),
        onToCurrencyChange: vi.fn(),
        onInputValueChange: vi.fn(),
        onNumber: vi.fn(),
        onDecimal: vi.fn(),
        onClear: vi.fn(),
        onBackspace: vi.fn(),
      },
    });
  });

  it("renders math view by default", () => {
    render(<Calculator />);

    expect(screen.getByText("1+1=2")).toBeInTheDocument();
    expect(screen.getByText("Calculator")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exchange Rate" })).toBeInTheDocument();
  });

  it("switches to currency view when toggled", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: "Exchange Rate" }));

    const selects = await screen.findAllByRole("combobox");
    expect(selects).toHaveLength(2);
    expect(screen.getByText("9.4")).toBeInTheDocument();
    expect(mockUseKeyboardHandler).toHaveBeenCalledWith(expect.any(Object), true);
    expect(screen.getByRole("button", { name: "Calculator" })).toBeInTheDocument();
  });
});
