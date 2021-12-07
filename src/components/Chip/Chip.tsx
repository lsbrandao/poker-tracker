import React from "react";
import CheckIcon from "../../assets/check-icon.svg"
import HourGlassIcon from "../../assets/hour-glass-icon.svg"
import "./Chip.scss";

interface Props {
  type: "closed" | "open";
}


const Button: React.FC<Props> = ({ type }) => {
  return (
    <div className={`chip ${type}`}>
      <img src={type === 'closed' ? CheckIcon : HourGlassIcon} alt={type} />
      {type === 'closed' ? 'Closed' : 'Open'}
    </div>
  );
};

export default Button;
