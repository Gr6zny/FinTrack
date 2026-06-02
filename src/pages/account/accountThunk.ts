import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../store/services/api";
import { CreateAccountData, IAccount } from "./type";

export const fetchAccounts = createAsyncThunk<
  { data: IAccount[]; meta: { pagination: { total: number } } },
  void,
  { rejectValue: string }
>("account/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const userId = currentUser?.id;

    if (!userId) {
      return rejectWithValue("Пользователь не авторизован");
    }

    const url = `accounts?filters[users_permissions_user][id][$eq]=${userId}`;

    const response = await apiClient<{
      data: IAccount[];
      meta: { pagination: { total: number } };
    }>(url, "GET", undefined, { Authorization: `Bearer ${token}` });

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения счетов",
    );
  }
});

export const fetchAccountById = createAsyncThunk<
  IAccount,
  number,
  { rejectValue: string }
>("account/fetchById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<{ data: IAccount }>(
      `accounts/${id}`,
      "GET",
      undefined,
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения счета",
    );
  }
});

export const createAccount = createAsyncThunk<
  IAccount,
  CreateAccountData,
  { rejectValue: string }
>("account/create", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<{ data: IAccount }, { data: CreateAccountData }>(
      "accounts",
      "POST",
      { data },
      { Authorization: `Bearer ${token}` },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка создания счета",
    );
  }
});

export const updateAccount = createAsyncThunk<
  IAccount,
  { id: number; data: Partial<CreateAccountData> },
  { rejectValue: string }
>("account/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient<
      { data: IAccount },
      { data: Partial<CreateAccountData> }
    >(`accounts/${id}`, "PUT", { data }, {
      Authorization: `Bearer ${token}`,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка обновления счета",
    );
  }
});

export const deleteAccount = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("account/delete", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");
    await apiClient(`accounts/${id}`, "DELETE", undefined, {
      Authorization: `Bearer ${token}`,
    });
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка удаления счета",
    );
  }
});
