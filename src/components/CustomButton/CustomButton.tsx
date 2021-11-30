import React from "react";
import "./CustomButton.scss";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  buttonStyle: ButtonStyle;
  children?: React.ReactNode;
  onClick?: () => void;
}

export enum ButtonStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

const Button: React.FC<Props> = ({ type, children, onClick }) => {
  return (
    <button onClick={onClick} className={`custom-button ${type}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
