import React from "react";
import "./CustomButton.scss";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  buttonStyle: ButtonStyle;
  size?: ButtonSize;
  children?: React.ReactNode;
  onClick?: () => void;
}

export enum ButtonStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

const Button: React.FC<Props> = ({ type, children, onClick, size = 'md' }) => {
  return (
    <button onClick={onClick} className={`custom-button ${type} ${size}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
