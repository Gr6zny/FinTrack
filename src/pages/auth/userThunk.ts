import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "./types/api.types";

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
    return res;
  } catch (error) {
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
    return res;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    return rejectWithValue(message);
  }
});
