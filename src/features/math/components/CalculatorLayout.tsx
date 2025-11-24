import React from "react";
import Display, { type DisplayProps } from "./Display";
import Keypad from "./Keypad";
import type { CalculatorMode } from "../../../utils/constants";

interface CalculatorLayoutProps {
  mode: CalculatorMode;
  displayProps: DisplayProps;
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
