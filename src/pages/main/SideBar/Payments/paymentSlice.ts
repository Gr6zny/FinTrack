import { createSlice } from "@reduxjs/toolkit";
import { fetchPayments } from "./paymentThunk";
import { paymentState } from "./type";

const initialState: paymentState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения платежей";
      });
  },
});

export default paymentSlice.reducer;
