export interface IBudget {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  name: string;
  period: "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
  start_date: string;
  end_date: string;
  amount: number;
  spent_amount: number;
  notifications: boolean;
  threshold_percent: number;

  categories?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    icon?: string;
    color?: string;
  }[];

  users_permissions_user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export interface CreateBudgetData {
  name: string;
  period: "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
  start_date: string;
  end_date: string;
  amount: number;
  notifications?: boolean;
  threshold_percent?: number;
  categories?: number[];
}

export interface budgetState {
  budgets: IBudget[];
  currentBudget: IBudget | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export const PERIOD_LABELS: Record<string, string> = {
  weekly: "Еженедельно",
  monthly: "Ежемесячно",
  quarterly: "Ежеквартально",
  yearly: "Ежегодно",
  custom: "Произвольно",
};
