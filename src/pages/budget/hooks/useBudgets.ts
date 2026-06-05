import { useCallback } from "react";
import {
  fetchBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../budgetThunk";
import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/services/useAppSelector";
import { CreateBudgetData } from "../type";

export const useBudgets = () => {
  const dispatch = useAppDispatch();

  const { budgets, loading, error, totalCount } = useAppSelector(
    (state) => state.budget,
  );

  const getBudgets = useCallback(async () => {
    const result = await dispatch(fetchBudgets());
    if (fetchBudgets.fulfilled.match(result)) {
      return result.payload.data;
    }
    return null;
  }, [dispatch]);

  const addBudget = useCallback(
    async (data: CreateBudgetData) => {
      const result = await dispatch(createBudget(data));
      if (createBudget.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const editBudget = useCallback(
    async (id: number, data: Partial<CreateBudgetData>) => {
      const result = await dispatch(updateBudget({ id, data }));
      if (updateBudget.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch],
  );

  const removeBudget = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteBudget(id));
      if (deleteBudget.fulfilled.match(result)) {
        return true;
      }
      return false;
    },
    [dispatch],
  );

  return {
    budgets,
    loading,
    error,
    totalCount,
    getBudgets,
    addBudget,
    editBudget,
    removeBudget,
    hasBudgets: budgets.length > 0,
    isLoading: loading,
    isError: !!error,
  };
};
