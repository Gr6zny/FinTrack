import { useCallback } from "react";
import { fetchReportData } from "../reportThunk";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/services/useAppSelector";

export const useReports = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    error,
    monthlyData,
    categoryExpenses,
    totalIncome,
    totalExpense,
    netBalance,
  } = useAppSelector((state) => state.report);

  const loadReport = useCallback(
    async (year: number) => {
      const result = await dispatch(fetchReportData({ year }));
      if (fetchReportData.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  return {
    loading,
    error,
    monthlyData,
    categoryExpenses,
    totalIncome,
    totalExpense,
    netBalance,
    loadReport,
    isLoading: loading,
    isError: !!error,
  };
};
