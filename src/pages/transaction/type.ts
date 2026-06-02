// type.ts - для Strapi 5
export interface ITransaction {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  // Поля транзакции (без attributes!)
  amount: number;
  type: "expense" | "income" | "transfer";
  date: string;
  description?: string;
  is_recurring: boolean;
  recurring_rule?: Record<string, any>;
  location?: string;

  // Связи (без вложенного data)
  users_permissions_user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };

  category?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    icon?: string;
    color?: string;
  };

  account_from?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
  };

  account_to?: {
    id: number;
    documentId: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
  };
}

export interface CreateTransactionData {
  amount: number;
  type: "expense" | "income" | "transfer";
  date: string;
  description?: string;
  category?: number;
  account_from?: number;
  account_to?: number;
  is_recurring?: boolean;
  location?: string;
}

export interface UpdateTransactionData {
  id: number;
  data: Partial<CreateTransactionData>;
}

export interface transactionState {
  transactions: ITransaction[];
  currentTransaction: ITransaction | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  filters: TransactionFilters;
}

export interface TransactionFilters {
  type?: "expense" | "income" | "transfer" | "all";
  category?: number;
  account?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
}
