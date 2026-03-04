// components/common/SelectField.tsx
import React from "react";
import s from "./index.module.css";
import type { Currency } from "../../types/auth.types";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon: string;
  options: Currency[];
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  icon,
  options,
  error,
  id,
  ...props
}) => {
  return (
    <div className={s.formGroup}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={s.selectWrapper}>
        <i className={`fas fa-${icon} ${s.selectIcon}`}></i>
        <select
          id={id}
          className={`${s.select} ${error ? s.error : ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name} ({option.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
