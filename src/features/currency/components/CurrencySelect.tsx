import { CurrencyCode } from "../../../utils/constants";
import styles from "./CurrencySelect.module.css";

interface CurrencySelectProps {
  value: CurrencyCode;
  options: readonly CurrencyCode[];
  onChange: (code: CurrencyCode) => void;
}

export default function CurrencySelect({ value, options, onChange }: CurrencySelectProps) {
  return (
    <label>
      <span className="sr-only">Currency</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        aria-label="Currency selector"
        className={styles["select"]}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
