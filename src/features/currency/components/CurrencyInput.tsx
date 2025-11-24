import { ChangeEvent } from "react";
import { CurrencyCode } from "../../../utils/constants";
import CurrencySelect from "./CurrencySelect";
import styles from "./CurrencyInput.module.css";

interface CurrencyInputProps {
  label: string;
  currency: CurrencyCode;
  amount: string;
  currencies: readonly CurrencyCode[];
  onCurrencyChange: (code: CurrencyCode) => void;
  onAmountChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function CurrencyInput({
  label,
  currency,
  amount,
  currencies,
  onCurrencyChange,
  onAmountChange,
  readOnly = false,
}: CurrencyInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onAmountChange) {
      onAmountChange(event.target.value);
    }
  };

  return (
    <div className={styles["input"]}>
      <div className={styles["label"]}>{label}</div>
      <div className={styles["row"]}>
        <CurrencySelect value={currency} options={currencies} onChange={onCurrencyChange} />
        <input
          className={styles["field"]}
          value={amount}
          onChange={handleChange}
          readOnly={readOnly}
          inputMode="decimal"
          aria-label={`${label} amount`}
        />
      </div>
    </div>
  );
}
