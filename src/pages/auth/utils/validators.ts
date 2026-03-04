import type {
  FormErrors,
  LoginFormData,
  RegisterFormData,
} from "../types/auth.types";

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email обязателен";
  if (!/\S+@\S+\.\S+/.test(email)) return "Некорректный email";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Пароль обязателен";
  if (password.length < 6) return "Пароль должен содержать минимум 6 символов";
  return null;
};

export const validateStrongPassword = (password: string): string | null => {
  if (!password) return "Пароль обязателен";
  if (password.length < 8) return "Пароль должен содержать минимум 8 символов";
  if (!/[a-z]/.test(password)) return "Пароль должен содержать строчные буквы";
  if (!/[A-Z]/.test(password)) return "Пароль должен содержать заглавные буквы";
  if (!/[0-9]/.test(password)) return "Пароль должен содержать цифры";
  return null;
};

export const validateLoginForm = (data: LoginFormData): FormErrors => {
  const errors: FormErrors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (data: RegisterFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Имя обязательно";
  }

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validateStrongPassword(data.password);
  if (passwordError) errors.password = passwordError;

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  if (!data.agreeTerms) {
    errors.agreeTerms = "Необходимо согласие с условиями";
  }

  return errors;
};
