import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./userThunk";
import type { StrapiUser } from "./types/api.types";

interface userState {
  user: StrapiUser | null;
  jwt: string;
  loading: boolean;
  error: string | null;
  formValue: IFormValue;
}

export interface IFormValue {
  username: string;
  email: string;
  password: string;
  [key: string]: string | undefined;
}

function loadUser(): StrapiUser | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadJwt(): string {
  return localStorage.getItem("jwt") || "";
}

const initialState: userState = {
  formValue: {
    username: "",
    password: "",
    email: "",
  },
  user: loadUser(),
  jwt: loadJwt(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.jwt = "";
      state.loading = false;
      state.error = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwt = action.payload.jwt;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная Ошибка";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
