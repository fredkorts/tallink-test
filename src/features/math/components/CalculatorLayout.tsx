import React from "react";
import Display from "./Display";
import Keypad from "./Keypad";

interface CalculatorLayoutProps {
  mode: "math" | "currency";
  displayProps: any;
  keypadProps: any;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ mode, displayProps, keypadProps }) => {
  return (
    <div className="calculator-layout">
      <Display {...displayProps} mode={mode} />
      <Keypad {...keypadProps} mode={mode} />
    </div>
  );
};

export default CalculatorLayout;
