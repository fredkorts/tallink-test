import { useState } from "react";
import { CALCULATOR_MODES, type CalculatorMode } from "../../utils/constants";
import AppLayout from "../Layout/AppLayout";
import MathCalculator from "../../features/math/components/MathCalculator";
import CurrencyConverter from "../../features/currency/components/CurrencyConverter";

/**
 * Main Calculator component
 * Manages calculator mode and renders the appropriate mode component
 */
export default function Calculator() {
    const [mode, setMode] = useState<CalculatorMode>(CALCULATOR_MODES.MATH);

    return (
        <AppLayout>
            {mode === CALCULATOR_MODES.MATH ? (
                <MathCalculator mode={mode} onModeChange={setMode} />
            ) : (
                <CurrencyConverter mode={mode} onModeChange={setMode} />
            )}
        </AppLayout>
    );
}
