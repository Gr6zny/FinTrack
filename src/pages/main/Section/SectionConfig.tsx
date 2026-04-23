import Budgets from "../DashBoard/Budgets/Budgets";
import { FinOverview } from "../DashBoard/FinOverview/FinOverview";
import LastTransactions from "../DashBoard/LastTransactions/LastTransactions";
import Accounts from "../SideBar/Accounts/Accounts";
import Debts from "../SideBar/Debts/Debts";
import Payments from "../SideBar/Payments/Payments";
import QuickActions from "../SideBar/QuickActions/QuickActions";

export const mainSections = [
  {
    title: "Финансовый обзор",
    component: <FinOverview />,
    withCard: false,
  },
  {
    title: "Последние транзакции",
    component: <LastTransactions />,
    withCard: true,
  },
  {
    title: "Бюджеты по категориям",
    component: <Budgets />,
    withCard: true,
  },
];

export const sideSections = [
  {
    title: "Быстрые действия",
    component: <QuickActions />,
    withCard: false,
  },
  {
    title: "Мои счета",
    component: <Accounts />,
    withCard: true,
  },
  {
    title: "Предстоящие платежи",
    component: <Payments />,
    withCard: true,
  },
  {
    title: "Долги",
    component: <Debts />,
    withCard: true,
  },
];
