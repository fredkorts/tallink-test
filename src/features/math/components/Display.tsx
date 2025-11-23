import { SPECIAL_VALUES } from "../../../utils/constants";

interface DisplayProps {
  expression: string;
  result: string | null;
  history: string[];
  isError?: boolean;
}

export default function Display({ expression, result, history, isError }: DisplayProps) {
  const visibleValue = isError ? SPECIAL_VALUES.NAN : result ?? expression;

  return (
    <div className="calculator-display" aria-live="polite">
      <div className="display-history">
        {history.length > 0 ? (
          history.slice(-5).map((entry, i) => <div key={i}>{entry}</div>)
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className="display-result">{visibleValue}</div>
    </div>
  );
}
