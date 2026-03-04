// components/common/InputField.tsx
import React from "react";
import s from "./index.module.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className={s.formGroup}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.inputWrapper}>
        <i className={`fas fa-${icon} ${s.inputIcon}`}></i>
        <input
          id={id}
          className={`${s.input} ${error ? s.error : ""} ${className || ""}`}
          {...props}
        />
      </div>
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};
