// types/auth.types.ts
export type AuthMode = "login" | "register";

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency: string;
  agreeTerms: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  avatar: string;
  years: string;
  rating: number;
}

export interface PasswordStrengthInfo {
  text: string;
  color: string;
  value: number;
}
