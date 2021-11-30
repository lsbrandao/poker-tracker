import React from "react";
import "./Card.scss";

const Card: React.FC<any> = ({ children }: { children: JSX.Element }) => {
  return <div className="card-container">{children}</div>;
}

export default Card;