import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../pages/auth/userSlice";
import transactionSlice from "../pages/transaction/transactionSlice";
import accountSlice from "../pages/account/accountSlice";
import budgetSlice from "../pages/budget/budgetSlice";
import debtSlice from "../pages/main/SideBar/Debts/debtSlice";
import paymentSlice from "../pages/main/SideBar/Payments/paymentSlice";
import reportSlice from "../pages/report/reportSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transactionSlice,
    account: accountSlice,
    budget: budgetSlice,
    debt: debtSlice,
    payment: paymentSlice,
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
