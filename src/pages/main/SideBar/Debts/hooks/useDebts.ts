import { useCallback } from "react";
import { fetchDebts } from "../debtThunk";
import { useAppDispatch } from "../../../../../store/useAppDispatch";
import { useAppSelector } from "../../../../../store/services/useAppSelector";

export const useDebts = () => {
  const dispatch = useAppDispatch();

  const { debts, loading, error } = useAppSelector((state) => state.debt);

  const getDebts = useCallback(async () => {
    const result = await dispatch(fetchDebts());
    if (fetchDebts.fulfilled.match(result)) {
      return result.payload.data;
    }
    return null;
  }, [dispatch]);

  return {
    debts,
    loading,
    error,
    getDebts,
    hasDebts: debts.length > 0,
    isLoading: loading,
    isError: !!error,
  };
};
