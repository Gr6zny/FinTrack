// hooks/usePasswordStrength.ts
import { useState, useCallback, useMemo } from "react";
import type { PasswordStrengthInfo } from "../types/auth.types";

export const usePasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const checkStrength = useCallback((value: string): number => {
    let calculatedStrength = 0;
    if (value.length >= 8) calculatedStrength += 25;
    if (/[a-z]/.test(value)) calculatedStrength += 25;
    if (/[A-Z]/.test(value)) calculatedStrength += 25;
    if (/[0-9]/.test(value)) calculatedStrength += 25;
    if (/[$@#&!]/.test(value)) calculatedStrength += 25;
    return Math.min(calculatedStrength, 100);
  }, []);

  const updatePassword = useCallback(
    (value: string) => {
      setPassword(value);
      setStrength(checkStrength(value));
    },
    [checkStrength],
  );

  const strengthInfo = useMemo((): PasswordStrengthInfo => {
    if (strength < 30)
      return { text: "Слабый", color: "#f72585", value: strength };
    if (strength < 60)
      return { text: "Средний", color: "#f8961e", value: strength };
    if (strength < 80)
      return { text: "Хороший", color: "#4cc9f0", value: strength };
    return { text: "Надежный", color: "#28a745", value: strength };
  }, [strength]);

  const resetPassword = useCallback(() => {
    setPassword("");
    setStrength(0);
  }, []);

  return {
    password,
    strength,
    strengthInfo,
    updatePassword,
    resetPassword,
  };
};
