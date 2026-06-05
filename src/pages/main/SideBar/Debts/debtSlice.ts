import { createSlice } from "@reduxjs/toolkit";
import { fetchDebts } from "./debtThunk";
import { debtState } from "./type";

const initialState: debtState = {
  debts: [],
  loading: false,
  error: null,
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDebts.fulfilled, (state, action) => {
        state.loading = false;
        state.debts = action.payload.data;
      })
      .addCase(fetchDebts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения долгов";
      });
  },
});

export default debtSlice.reducer;
