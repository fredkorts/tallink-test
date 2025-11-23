import { CurrencyCode } from "../../../utils/constants";

interface CurrencySelectProps {
  value: CurrencyCode;
  options: readonly CurrencyCode[];
  onChange: (code: CurrencyCode) => void;
}

export default function CurrencySelect({ value, options, onChange }: CurrencySelectProps) {
  return (
    <label className="currency-select">
      <span className="sr-only">Currency</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        aria-label="Currency selector"
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
