import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReportData } from "./reportThunk";
import { ReportState } from "./type";

const initialState: ReportState = {
  loading: false,
  error: null,
  monthlyData: [],
  categoryExpenses: [],
  totalIncome: 0,
  totalExpense: 0,
  netBalance: 0,
  dateRange: {
    start: `${new Date().getFullYear()}-01-01`,
    end: `${new Date().getFullYear()}-12-31`,
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ start: string; end: string }>,
    ) => {
      state.dateRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyData = action.payload.monthlyData;
        state.categoryExpenses = action.payload.categoryExpenses;
        state.totalIncome = action.payload.totalIncome;
        state.totalExpense = action.payload.totalExpense;
        state.netBalance = action.payload.netBalance;
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка загрузки отчёта";
      });
  },
});

export const { clearReportError, setDateRange } = reportSlice.actions;
export default reportSlice.reducer;
