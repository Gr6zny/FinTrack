export interface IAccount {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  name: string;
  type: "cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment";
  balance: number;
  currency: string;
  icon: string;
  color: string;
  is_active: boolean;

  users_permissions_user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
}

export interface CreateAccountData {
  name: string;
  type: "cash" | "bank_card" | "credit_card" | "digital" | "savings" | "investment";
  balance: number;
  currency: string;
  icon: string;
  color: string;
  is_active?: boolean;
}

export interface accountState {
  accounts: IAccount[];
  currentAccount: IAccount | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export const ACCOUNT_TYPES: Record<string, string> = {
  cash: "Наличные",
  bank_card: "Банковская карта",
  credit_card: "Кредитная карта",
  digital: "Электронный кошелёк",
  savings: "Сбережения",
  investment: "Инвестиции",
};

export const ACCOUNT_ICONS: Record<string, string> = {
  cash: "fa-money-bill-wave",
  bank_card: "fa-credit-card",
  credit_card: "fa-id-card",
  digital: "fa-mobile-alt",
  savings: "fa-piggy-bank",
  investment: "fa-chart-line",
};

export const ACCOUNT_CURRENCIES = ["RUB", "USD", "EUR", "GBY"];
