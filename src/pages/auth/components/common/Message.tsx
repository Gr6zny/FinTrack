// components/common/Message.tsx
import React from "react";
import s from "./index.module.css";

interface MessageProps {
  type: "success" | "error";
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <div className={`${s.message} ${s[type]}`}>
      <i
        className={`fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}`}
      ></i>
      <span>{children}</span>
    </div>
  );
};
