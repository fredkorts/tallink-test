import Display from "./Display.tsx";
import Keypad from "./Keypad.tsx";
// import HistoryPanel from "./HistoryPanel"; // (optional/future)

/**
 * Main container for Math Calculator mode
 * Renders the display, keypad, and (optionally) history panel
 */
export default function MathCalculator() {
  // Placeholder state for display and keypad integration
  // TODO: Integrate with useCalculator hook
  return (
    <div className="math-calculator">
      <Display />
      {/* <HistoryPanel /> */}
      <Keypad />
    </div>
  );
}
