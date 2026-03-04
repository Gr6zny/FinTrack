// components/AuthForm/RegisterForm.tsx
import React from "react";
import { InputField } from "../common/InputField";
import { PasswordField } from "../common/PasswordField";
import { SelectField } from "../common/SelectField";
import { CheckboxField } from "../common/CheckboxField";
import { CURRENCIES } from "../../constants/auth.constants";

import s from "./AuthForm.module.css";
import type { PasswordStrengthInfo } from "../../types/auth.types";

interface RegisterFormProps {
  data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    currency: string;
    agreeTerms: boolean;
  };
  errors: Record<string, string>;
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  passwordStrength: PasswordStrengthInfo;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  data,
  errors,
  isLoading,
  passwordStrength,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className={s.form}>
      <InputField
        label="Полное имя"
        id="fullName"
        name="fullName"
        type="text"
        icon="user"
        value={data.fullName}
        onChange={onChange}
        error={errors.fullName}
        disabled={isLoading}
        placeholder="Иван Иванов"
      />

      <InputField
        label="Email"
        id="regEmail"
        name="email"
        type="email"
        icon="envelope"
        value={data.email}
        onChange={onChange}
        error={errors.email}
        disabled={isLoading}
        placeholder="example@mail.com"
      />

      <PasswordField
        label="Пароль"
        id="regPassword"
        name="password"
        value={data.password}
        onChange={onChange}
        error={errors.password}
        disabled={isLoading}
        showStrength={true}
        strength={passwordStrength}
      />

      <PasswordField
        label="Подтвердите пароль"
        id="confirmPassword"
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        disabled={isLoading}
        showStrength={false}
      />

      <SelectField
        label="Основная валюта"
        id="currency"
        name="currency"
        icon="coins"
        value={data.currency}
        onChange={onChange}
        options={CURRENCIES}
        disabled={isLoading}
      />

      <CheckboxField
        name="agreeTerms"
        checked={data.agreeTerms}
        onChange={onChange}
        disabled={isLoading}
        error={errors.agreeTerms}
        label={
          <>
            Я согласен с{" "}
            <a href="#" className={s.termsLink}>
              условиями использования
            </a>
          </>
        }
      />

      <button
        type="submit"
        className={`${s.submitButton} ${isLoading ? s.loading : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Регистрация...
          </>
        ) : (
          "Создать аккаунт"
        )}
      </button>
    </form>
  );
};
