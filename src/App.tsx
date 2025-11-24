import { useState } from "react";
import AppLayout from "./components/Layout/AppLayout";
import MathCalculator from "./features/math/components/MathCalculator";
import { CALCULATOR_MODES, type CalculatorMode } from "./utils/constants";

function App() {
  const [mode, setMode] = useState<CalculatorMode>(CALCULATOR_MODES.MATH);

  return (
    <AppLayout>
      <MathCalculator mode={mode} onModeChange={setMode} />
    </AppLayout>
  );
}

export default App;
