import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../pages/auth/userSlice";
import transactionSlice from "../pages/transaction/transactionSlice";

const store = configureStore({
  reducer: { user: userSlice, transaction: transactionSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
