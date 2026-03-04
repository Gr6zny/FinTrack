// components/common/CheckboxField.tsx
import React from "react";
import s from "./index.module.css";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  return (
    <div className={s.formGroup}>
      <label className={s.checkbox}>
        <input type="checkbox" id={id} {...props} />
        <span>{label}</span>
      </label>
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};
