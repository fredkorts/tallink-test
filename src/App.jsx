import { useState } from "react";
import AppLayout from "./components/Layout/AppLayout";
import MathCalculator from "./features/math/components/MathCalculator";
import CurrencyConverter from "./features/currency/components/CurrencyConverter";
import { CALCULATOR_MODES } from "./utils/constants";

function App() {
  const [mode, setMode] = useState(CALCULATOR_MODES.MATH);

  return (
    <AppLayout mode={mode} onModeChange={setMode}>
      {mode === CALCULATOR_MODES.MATH ? <MathCalculator /> : <CurrencyConverter />}
    </AppLayout>
  );
}

export default App;
