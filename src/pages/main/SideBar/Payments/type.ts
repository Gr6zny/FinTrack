export interface IRecurringTransaction {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  name: string;
  amount: number;
  type: "expense" | "income";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  start_date: string;
  end_date?: string;
  last_processed?: string;
  is_active: boolean;

  category?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    icon?: string;
    color?: string;
  };

  account?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    currency: string;
  };

  users_permissions_user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export interface paymentState {
  payments: IRecurringTransaction[];
  loading: boolean;
  error: string | null;
}
