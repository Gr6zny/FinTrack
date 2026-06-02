import { useCallback } from "react";
import {
  fetchTransactions,
  fetchTransactionById,
  createTransaction,
  //   updateTransaction,
  deleteTransaction,
  fetchTransactionStats,
} from "../transactionThunk";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/services/useAppSelector";
import { CreateTransactionData, TransactionFilters } from "../type";
import {
  clearCurrentTransaction,
  clearError,
  resetFilters,
  setFilters,
} from "../transactionSlice";

export const useTransactions = () => {
  const dispatch = useAppDispatch();

  // Селекторы
  const {
    transactions,
    currentTransaction,
    loading,
    error,
    totalCount,
    filters,
  } = useAppSelector((state) => state.transaction);

  // Получение всех транзакций
  const getTransactions = useCallback(
    async (
      page?: number,
      pageSize?: number,
      customFilters?: TransactionFilters,
    ) => {
      const result = await dispatch(
        fetchTransactions({
          page,
          pageSize,
          filters: customFilters || filters,
        }),
      );

      if (fetchTransactions.fulfilled.match(result)) {
        return result.payload.data;
      }
      return null;
    },
    [dispatch, filters],
  );

  // Получение транзакции по ID
  const getTransactionById = useCallback(
    async (id: number) => {
      const result = await dispatch(fetchTransactionById(id));
      if (fetchTransactionById.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  // Создание новой транзакции
  const addTransaction = useCallback(
    async (data: CreateTransactionData) => {
      const result = await dispatch(createTransaction(data));
      if (createTransaction.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  // Обновление транзакции
  //   const editTransaction = useCallback(
  //     async (params: UpdateTransactionParams) => {
  //       const result = await dispatch(updateTransaction(params));
  //       if (updateTransaction.fulfilled.match(result)) {
  //         return result.payload;
  //       }
  //       return null;
  //     },
  //     [dispatch],
  //   );

  // Удаление транзакции
  const removeTransaction = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteTransaction(id));
      if (deleteTransaction.fulfilled.match(result)) {
        return true;
      }
      return false;
    },
    [dispatch],
  );

  // Получение статистики
  const getStats = useCallback(
    async (startDate: string, endDate: string) => {
      const result = await dispatch(
        fetchTransactionStats({ startDate, endDate }),
      );
      if (fetchTransactionStats.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  // Установка фильтров
  const applyFilters = useCallback(
    (newFilters: TransactionFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch],
  );

  // Сброс фильтров
  const clearFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  // Очистка ошибки
  const clearTransactionError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Очистка текущей транзакции
  const resetCurrentTransaction = useCallback(() => {
    dispatch(clearCurrentTransaction());
  }, [dispatch]);

  // Автоматическая загрузка транзакций при монтировании (опционально)
  const loadInitialTransactions = useCallback(
    async (pageSize?: number) => {
      await getTransactions(1, pageSize || 20);
    },
    [getTransactions],
  );

  return {
    // Данные
    transactions,
    currentTransaction,
    loading,
    error,
    totalCount,
    filters,

    // Методы
    getTransactions,
    getTransactionById,
    addTransaction,
    // editTransaction,
    removeTransaction,
    getStats,
    applyFilters,
    clearFilters,
    clearTransactionError,
    resetCurrentTransaction,
    loadInitialTransactions,

    // Вспомогательные методы
    hasTransactions: transactions.length > 0,
    isLoading: loading,
    isError: !!error,
  };
};
