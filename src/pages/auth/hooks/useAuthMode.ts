// hooks/useAuthMode.ts
import { useState, useCallback } from "react";
import type { AuthMode } from "../types/auth.types";

export const useAuthMode = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMode = useCallback((callback?: () => void) => {
    setIsAnimating(true);

    setTimeout(() => {
      setMode((prev) => (prev === "login" ? "register" : "login"));
      setIsAnimating(false);
      callback?.();
    }, 300);
  }, []);

  const setLoginMode = useCallback(
    (callback?: () => void) => {
      if (mode === "login") return;

      setIsAnimating(true);

      setTimeout(() => {
        setMode("login");
        setIsAnimating(false);
        callback?.();
      }, 300);
    },
    [mode],
  );

  const setRegisterMode = useCallback(
    (callback?: () => void) => {
      if (mode === "register") return;

      setIsAnimating(true);

      setTimeout(() => {
        setMode("register");
        setIsAnimating(false);
        callback?.();
      }, 300);
    },
    [mode],
  );

  return {
    mode,
    isAnimating,
    toggleMode,
    setLoginMode,
    setRegisterMode,
  };
};
