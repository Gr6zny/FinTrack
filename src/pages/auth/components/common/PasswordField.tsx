// components/common/PasswordField.tsx
import React, { useState } from "react";
import s from "./index.module.css";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showStrength?: boolean;
  strength?: { text: string; color: string; value: number };
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  error,
  showStrength = false,
  strength,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={s.formGroup}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.inputWrapper}>
        <i className={`fas fa-lock ${s.inputIcon}`}></i>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`${s.input} ${error ? s.error : ""}`}
          {...props}
        />
        <button
          type="button"
          className={s.passwordToggle}
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`fas fa-${showPassword ? "eye-slash" : "eye"}`}></i>
        </button>
      </div>

      {showStrength && strength && props.value && (
        <div className={s.passwordStrength}>
          <div className={s.strengthBar}>
            <div
              className={s.strengthFill}
              style={{
                width: `${strength.value}%`,
                backgroundColor: strength.color,
              }}
            ></div>
          </div>
          <span style={{ color: strength.color }}>{strength.text} пароль</span>
        </div>
      )}

      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};
