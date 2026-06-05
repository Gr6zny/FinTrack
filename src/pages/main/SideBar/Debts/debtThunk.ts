import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../store/services/api";
import { IDebt } from "./type";

export const fetchDebts = createAsyncThunk<
  { data: IDebt[]; meta: { pagination: { total: number } } },
  void,
  { rejectValue: string }
>("debt/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await apiClient<{
      data: IDebt[];
      meta: { pagination: { total: number } };
    }>(`debts?filters[is_paid][$eq]=false`, "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения долгов",
    );
  }
});
