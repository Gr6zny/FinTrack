// hooks/useAuthSubmit.ts
import { useState, useCallback } from "react";
import type { LoginFormData, RegisterFormData } from "../types/auth.types";

interface UseAuthSubmitProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

export const useAuthSubmit = (props: UseAuthSubmitProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const submitLogin = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      setError("");

      try {
        // Имитация API запроса
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Здесь будет реальный API запрос
        console.log("Login data:", data);

        const message = "Успешный вход! Перенаправление...";
        setSuccessMessage(message);
        props.onSuccess?.(message);
        props.onLoginSuccess?.();

        // Редирект через 2 секунды
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } catch (err) {
        const errorMessage = `Неверный email или пароль ${err}`;
        setError(errorMessage);
        props.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [props],
  );

  const submitRegister = useCallback(
    async (data: RegisterFormData) => {
      setIsLoading(true);
      setError("");

      try {
        // Имитация API запроса
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Здесь будет реальный API запрос
        console.log("Register data:", data);

        const message =
          "Регистрация успешна! Проверьте email для подтверждения.";
        setSuccessMessage(message);
        props.onSuccess?.(message);
        props.onRegisterSuccess?.();
      } catch (err) {
        const errorMessage = `Ошибка при регистрации. Попробуйте позже. ${err}`;
        setError(errorMessage);
        props.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [props],
  );

  const resetMessages = useCallback(() => {
    setSuccessMessage("");
    setError("");
  }, []);

  return {
    isLoading,
    successMessage,
    error,
    submitLogin,
    submitRegister,
    resetMessages,
  };
};
