export interface IDebt {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  title: string;
  amount: number;
  type: "i_owe" | "owe_me";
  person: string;
  due_date: string;
  is_paid: boolean;
  description?: string;
  currency: string;

  users_permissions_user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export interface debtState {
  debts: IDebt[];
  loading: boolean;
  error: string | null;
}
