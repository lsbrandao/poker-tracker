import React from "react";
import "./Card.scss";

export default function Card({ children }: { children: JSX.Element }) {
  return <div className="card-container">{children}</div>;
}
