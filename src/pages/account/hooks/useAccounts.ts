import { useCallback } from "react";
import {
  fetchAccounts,
  fetchAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../accountThunk";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/services/useAppSelector";
import { CreateAccountData } from "../type";
import {
  clearCurrentAccount,
  clearError,
} from "../accountSlice";

export const useAccounts = () => {
  const dispatch = useAppDispatch();

  const {
    accounts,
    currentAccount,
    loading,
    error,
    totalCount,
  } = useAppSelector((state) => state.account);

  const getAccounts = useCallback(async () => {
    const result = await dispatch(fetchAccounts());
    if (fetchAccounts.fulfilled.match(result)) {
      return result.payload.data;
    }
    return null;
  }, [dispatch]);

  const getAccountById = useCallback(
    async (id: number) => {
      const result = await dispatch(fetchAccountById(id));
      if (fetchAccountById.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const addAccount = useCallback(
    async (data: CreateAccountData) => {
      const result = await dispatch(createAccount(data));
      if (createAccount.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const editAccount = useCallback(
    async (id: number, data: Partial<CreateAccountData>) => {
      const result = await dispatch(updateAccount({ id, data }));
      if (updateAccount.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const removeAccount = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteAccount(id));
      if (deleteAccount.fulfilled.match(result)) {
        return true;
      }
      return false;
    },
    [dispatch],
  );

  const clearAccountError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetCurrentAccount = useCallback(() => {
    dispatch(clearCurrentAccount());
  }, [dispatch]);

  return {
    accounts,
    currentAccount,
    loading,
    error,
    totalCount,

    getAccounts,
    getAccountById,
    addAccount,
    editAccount,
    removeAccount,
    clearAccountError,
    resetCurrentAccount,

    hasAccounts: accounts.length > 0,
    isLoading: loading,
    isError: !!error,
  };
};
