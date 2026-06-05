import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBudget,
  deleteBudget,
  fetchBudgetById,
  fetchBudgets,
  updateBudget,
} from "./budgetThunk";
import { IBudget, budgetState } from "./type";

const initialState: budgetState = {
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null,
  totalCount: 0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBudget: (state) => {
      state.currentBudget = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = action.payload.data;
        state.totalCount = action.payload.meta.pagination.total;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения бюджетов";
      })

      .addCase(fetchBudgetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudgetById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBudget = action.payload;
      })
      .addCase(fetchBudgetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения бюджета";
      })

      .addCase(createBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка создания бюджета";
      })

      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.budgets.findIndex(
          (b) => b.id === action.payload.id,
        );
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
        if (state.currentBudget?.id === action.payload.id) {
          state.currentBudget = action.payload;
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка обновления бюджета";
      })

      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = state.budgets.filter(
          (b) => b.id !== action.payload,
        );
        if (state.currentBudget?.id === action.payload) {
          state.currentBudget = null;
        }
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка удаления бюджета";
      });
  },
});

export const { clearError, clearCurrentBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
