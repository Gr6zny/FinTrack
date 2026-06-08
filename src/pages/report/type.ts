export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface CategoryExpense {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export interface ReportState {
  loading: boolean;
  error: string | null;
  monthlyData: MonthlyData[];
  categoryExpenses: CategoryExpense[];
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  dateRange: {
    start: string;
    end: string;
  };
}
