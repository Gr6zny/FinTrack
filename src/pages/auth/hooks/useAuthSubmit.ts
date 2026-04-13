// hooks/useAuthSubmit.ts
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const submitLogin = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const message = "Успешный вход! Перенаправление...";
      setSuccessMessage(message);
      props.onSuccess?.(message);
      props.onLoginSuccess?.();

      // Редирект через 2 секунды
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (err) {
      const errorMessage = `Неверный email или пароль ${err}`;
      setError(errorMessage);
      props.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [props, navigate]);

  const submitRegister = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const message = "Регистрация успешна! Проверьте email для подтверждения.";
      setSuccessMessage(message);
      props.onSuccess?.(message);
      props.onRegisterSuccess?.();
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (err) {
      const errorMessage = `Ошибка при регистрации. Попробуйте позже. ${err}`;
      setError(errorMessage);
      props.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [props, navigate]);

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
