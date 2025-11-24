import React from "react";
import Display, { DisplayProps } from "../Display/Display";
import Keypad from "../Keypad/Keypad";

interface CalculatorLayoutProps {
  displayProps: DisplayProps;
  keypadProps: any;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ displayProps, keypadProps }) => {
  return (
    <div className="calculator-layout">
      <Display {...displayProps} />
      <Keypad {...keypadProps} />
    </div>
  );
};

export default CalculatorLayout;
