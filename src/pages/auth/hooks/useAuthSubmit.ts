// hooks/useAuthSubmit.ts
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../store/services/useAppSelector";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { loginUser, registerUser } from "../userThunk";

interface UseAuthSubmitProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

export const useAuthSubmit = (props: UseAuthSubmitProps = {}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const { error, loading } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitLogin = useCallback(
    async (credentials: { identifier: string; password: string }) => {
      const result = await dispatch(loginUser(credentials));

      if (loginUser.fulfilled.match(result)) {
        const message = "Успешный вход! Перенаправление...";
        setSuccessMessage(message);
        props.onSuccess?.(message);
        props.onLoginSuccess?.();

        // Редирект через 2 секунды
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      }
    },
    [dispatch, navigate, props],
  );

  const submitRegister = useCallback(
    async (credentials: {
      username: string;
      email: string;
      password: string;
      confirmPassword?: string;
    }) => {
      const result = await dispatch(registerUser(credentials));

      if (registerUser.fulfilled.match(result)) {
        const message =
          "Регистрация успешна! Проверьте email для подтверждения.";
        setSuccessMessage(message);
        props.onSuccess?.(message);
        props.onRegisterSuccess?.();
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      }
    },
    [dispatch, navigate, props],
  );

  const resetMessages = useCallback(() => {
    setSuccessMessage("");
  }, []);

  return {
    loading,
    successMessage,
    error,
    submitLogin,
    submitRegister,
    resetMessages,
  };
};
