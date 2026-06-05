import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../store/services/api";
import { IRecurringTransaction } from "./type";

export const fetchPayments = createAsyncThunk<
  { data: IRecurringTransaction[]; meta: { pagination: { total: number } } },
  void,
  { rejectValue: string }
>("payment/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await apiClient<{
      data: IRecurringTransaction[];
      meta: { pagination: { total: number } };
    }>(`recurring-transactions?filters[is_active][$eq]=true&populate=*`, "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });

    return response;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Ошибка получения платежей",
    );
  }
});
