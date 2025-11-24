import type { FC } from "react";
import Display, { type DisplayProps } from "../Display";
import Keypad, { type KeypadProps } from "../Keypad";
import type { CalculatorMode } from "../../../../utils/constants";

export interface CalculatorLayoutProps {
  mode: CalculatorMode;
  displayProps: DisplayProps;
  keypadProps: Omit<KeypadProps, "mode">;
}

const CalculatorLayout: FC<CalculatorLayoutProps> = ({ mode, displayProps, keypadProps }) => {
  return (
    <div className="calculator-layout">
      <Display {...displayProps} mode={mode} />
      <Keypad {...keypadProps} mode={mode} />
    </div>
  );
};

export default CalculatorLayout;
