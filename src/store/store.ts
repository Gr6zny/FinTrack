import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../pages/auth/userSlice";
import transactionSlice from "../pages/transaction/transactionSlice";
import accountSlice from "../pages/account/accountSlice";

const store = configureStore({
  reducer: { user: userSlice, transaction: transactionSlice, account: accountSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
