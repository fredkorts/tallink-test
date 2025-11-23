import CurrencyInput from "./CurrencyInput";
import CurrencyKeypad from "./CurrencyKeypad";
import RateUpdateInfo from "./RateUpdateInfo";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useCurrencyRates } from "../hooks/useCurrencyRates";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { CURRENCIES } from "../../../utils/constants";
import { formatCurrency } from "../utils/currencyFormatters";

export default function CurrencyConverter() {
  const { rates, loading, error, refresh, elapsed } = useCurrencyRates();
  const {
    amount,
    convertedAmount,
    sourceCurrency,
    targetCurrency,
    setAmount,
    setSourceCurrency,
    setTargetCurrency,
    handleKeypadInput,
    clearAmount,
    backspace,
    swapCurrencies,
  } = useCurrencyConverter(rates);

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <div>
          <h2>Exchange Rate</h2>
          <p className="converter-subtitle">Live conversion between your favorite currencies.</p>
        </div>
        <RateUpdateInfo elapsed={elapsed} onRefresh={refresh} loading={loading} />
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}

      <div className="currency-inputs">
        <CurrencyInput
          label="From"
          currency={sourceCurrency}
          amount={amount}
          currencies={CURRENCIES}
          onCurrencyChange={(code) => {
            setSourceCurrency(code);
          }}
          onAmountChange={setAmount}
        />

        <CurrencyInput
          label="To"
          currency={targetCurrency}
          amount={formatCurrency(convertedAmount)}
          currencies={CURRENCIES}
          onCurrencyChange={(code) => {
            setTargetCurrency(code);
          }}
          readOnly
        />

        <button type="button" className="swap-btn" onClick={swapCurrencies} aria-label="Swap currencies">
          ⇄
        </button>
      </div>

      <div className="conversion-result" aria-live="polite">
        {`${amount || 0} ${sourceCurrency} = ${formatCurrency(convertedAmount)} ${targetCurrency}`}
      </div>

      <CurrencyKeypad onInput={handleKeypadInput} onClear={clearAmount} onBackspace={backspace} />
    </div>
  );
}
