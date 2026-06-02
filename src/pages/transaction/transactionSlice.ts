import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  fetchTransactionById,
  fetchTransactions,
  updateTransaction,
} from "./transactionThunk";
import { ITransaction, TransactionFilters, transactionState } from "./type";

const initialState: transactionState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    type: "all",
  },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTransaction: (state) => {
      state.currentTransaction = null;
    },
    setFilters: (state, action: PayloadAction<TransactionFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { type: "all" };
    },
    addTransactionLocally: (state, action: PayloadAction<ITransaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransactionLocally: (state, action: PayloadAction<ITransaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      if (state.currentTransaction?.id === action.payload.id) {
        state.currentTransaction = action.payload;
      }
    },
    removeTransactionLocally: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
      if (state.currentTransaction?.id === action.payload) {
        state.currentTransaction = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
        state.totalCount = action.payload.meta.pagination.total;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения транзакций";
      })

      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения транзакции";
      })

      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка создания транзакции";
      })

      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id,
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        if (state.currentTransaction?.id === action.payload.id) {
          state.currentTransaction = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка обновления транзакции";
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload,
        );
        if (state.currentTransaction?.id === action.payload) {
          state.currentTransaction = null;
        }
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка удаления транзакции";
      });
  },
});

export const {
  clearError,
  clearCurrentTransaction,
  setFilters,
  resetFilters,
  addTransactionLocally,
  updateTransactionLocally,
  removeTransactionLocally,
} = transactionSlice.actions;

export default transactionSlice.reducer;
