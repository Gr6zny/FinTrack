import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createAccount,
  deleteAccount,
  fetchAccountById,
  fetchAccounts,
  updateAccount,
} from "./accountThunk";
import { IAccount, accountState } from "./type";

const initialState: accountState = {
  accounts: [],
  currentAccount: null,
  loading: false,
  error: null,
  totalCount: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAccount: (state) => {
      state.currentAccount = null;
    },
    addAccountLocally: (state, action: PayloadAction<IAccount>) => {
      state.accounts.unshift(action.payload);
    },
    updateAccountLocally: (state, action: PayloadAction<IAccount>) => {
      const index = state.accounts.findIndex(
        (a) => a.id === action.payload.id,
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
      if (state.currentAccount?.id === action.payload.id) {
        state.currentAccount = action.payload;
      }
    },
    removeAccountLocally: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(
        (a) => a.id !== action.payload,
      );
      if (state.currentAccount?.id === action.payload) {
        state.currentAccount = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.data;
        state.totalCount = action.payload.meta.pagination.total;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения счетов";
      })

      .addCase(fetchAccountById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAccount = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка получения счета";
      })

      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts.unshift(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка создания счета";
      })

      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.accounts.findIndex(
          (a) => a.id === action.payload.id,
        );
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
        if (state.currentAccount?.id === action.payload.id) {
          state.currentAccount = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка обновления счета";
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = state.accounts.filter(
          (a) => a.id !== action.payload,
        );
        if (state.currentAccount?.id === action.payload) {
          state.currentAccount = null;
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка удаления счета";
      });
  },
});

export const {
  clearError,
  clearCurrentAccount,
  addAccountLocally,
  updateAccountLocally,
  removeAccountLocally,
} = accountSlice.actions;

export default accountSlice.reducer;
