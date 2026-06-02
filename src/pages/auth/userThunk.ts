import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "./types/api.types";

// Вспомогательная функция для сохранения данных авторизации
const saveAuthData = (jwt: string, user: AuthResponse["user"]) => {
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("user", JSON.stringify(user));
};

// Очистка данных авторизации (на случай ошибки)
const clearAuthData = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: string }
>("user/register", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<AuthResponse, RegisterRequest>(
      "auth/local/register",
      "POST",
      data,
    );

    // Сохраняем токен и пользователя в localStorage
    saveAuthData(res.jwt, res.user);

    return res;
  } catch (error) {
    // В случае ошибки очищаем localStorage на всякий случай
    clearAuthData();

    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginRequest,
  { rejectValue: string }
>("user/login", async (data, { rejectWithValue }) => {
  try {
    const res = await apiClient<AuthResponse, LoginRequest>(
      "auth/local",
      "POST",
      data,
    );

    // Сохраняем токен и пользователя в localStorage
    saveAuthData(res.jwt, res.user);

    return res;
  } catch (error) {
    // В случае ошибки очищаем localStorage
    clearAuthData();

    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
