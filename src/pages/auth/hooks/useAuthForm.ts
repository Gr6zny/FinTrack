// hooks/useAuthForm.ts
import { useState, useCallback } from "react";
import { validateLoginForm, validateRegisterForm } from "../utils/validators";
import type { FormErrors, LoginFormData } from "../types/auth.types";
import { RegisterRequest } from "../types/api.types";

const initialLoginData: LoginFormData = {
  email: "",
  password: "",
  remember: false,
};

const initialRegisterData: RegisterRequest = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useAuthForm = () => {
  const [loginData, setLoginData] = useState<LoginFormData>(initialLoginData);
  const [registerData, setRegisterData] =
    useState<RegisterRequest>(initialRegisterData);
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({});

  const handleLoginChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setLoginData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      if (loginErrors[name]) {
        setLoginErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [loginErrors],
  );

  const handleRegisterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : undefined;

      setRegisterData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      if (registerErrors[name]) {
        setRegisterErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [registerErrors],
  );

  const validateLogin = useCallback((): boolean => {
    const errors = validateLoginForm(loginData);
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  }, [loginData]);

  const validateRegister = useCallback((): boolean => {
    const errors = validateRegisterForm(registerData);
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  }, [registerData]);

  const resetForms = useCallback(() => {
    setLoginData(initialLoginData);
    setRegisterData(initialRegisterData);
    setLoginErrors({});
    setRegisterErrors({});
  }, []);

  return {
    loginData,
    registerData,
    loginErrors,
    registerErrors,
    handleLoginChange,
    handleRegisterChange,
    validateLogin,
    validateRegister,
    resetForms,
    setRegisterData,
  };
};
