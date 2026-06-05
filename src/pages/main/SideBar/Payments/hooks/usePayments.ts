import { useCallback } from "react";
import { fetchPayments } from "../paymentThunk";
import { useAppDispatch } from "../../../../../store/useAppDispatch";
import { useAppSelector } from "../../../../../store/services/useAppSelector";

export const usePayments = () => {
  const dispatch = useAppDispatch();

  const { payments, loading, error } = useAppSelector((state) => state.payment);

  const getPayments = useCallback(async () => {
    const result = await dispatch(fetchPayments());
    if (fetchPayments.fulfilled.match(result)) {
      return result.payload.data;
    }
    return null;
  }, [dispatch]);

  return {
    payments,
    loading,
    error,
    getPayments,
    hasPayments: payments.length > 0,
    isLoading: loading,
    isError: !!error,
  };
};
