// components/AuthForm/LoginForm.tsx
import React from "react";
import { InputField } from "../common/InputField";
import { CheckboxField } from "../common/CheckboxField";
import s from "./AuthForm.module.css";

interface LoginFormProps {
  data: {
    email: string;
    password: string;
    remember: boolean;
  };
  errors: Record<string, string>;
  isLoading: boolean;
  showPassword: boolean;
  onShowPasswordToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  data,
  errors,
  isLoading,
  showPassword,
  onShowPasswordToggle,
  onChange,
  onSubmit,
  onForgotPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className={s.form}>
      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        icon="envelope"
        value={data.email}
        onChange={onChange}
        error={errors.email}
        disabled={isLoading}
        placeholder="example@mail.com"
      />

      <div className={s.formGroup}>
        <label htmlFor="password" className={s.label}>
          Пароль
        </label>
        <div className={s.inputWrapper}>
          <i className={`fas fa-lock ${s.inputIcon}`}></i>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            onChange={onChange}
            className={`${s.input} ${errors.password ? s.error : ""}`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            className={s.passwordToggle}
            onClick={onShowPasswordToggle}
          >
            <i className={`fas fa-${showPassword ? "eye-slash" : "eye"}`}></i>
          </button>
        </div>
        {errors.password && (
          <span className={s.errorMessage}>{errors.password}</span>
        )}
      </div>

      <div className={s.formRow}>
        <CheckboxField
          name="remember"
          checked={data.remember}
          onChange={onChange}
          disabled={isLoading}
          label="Запомнить меня"
        />

        <button
          type="button"
          className={s.forgotLink}
          onClick={onForgotPassword}
        >
          Забыли пароль?
        </button>
      </div>

      <button
        type="submit"
        className={`${s.submitButton} ${isLoading ? s.loading : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Вход...
          </>
        ) : (
          "Войти"
        )}
      </button>
    </form>
  );
};
