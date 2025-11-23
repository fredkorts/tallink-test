import { CurrencyRates } from "../../../services/types";
import { CurrencyCode } from "../../../utils/constants";

export function convertAmount(
  amount: number,
  rates: CurrencyRates | null,
  from: CurrencyCode,
  to: CurrencyCode,
): number {
  if (!rates) return NaN;
  if (from === to) return amount;
  const rate = rates[from]?.[to];
  if (!rate) return NaN;
  return amount * rate;
}
