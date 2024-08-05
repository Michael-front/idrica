// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "src/postsManager/core/domain/entities/User";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState = (): AuthState => {
  const token = Cookies.get("token");
  if (token) {
    //My token is fake so i use it for get my user
    const dataUserCookie = token.split(":");
    const user = dataUserCookie[1];
    const userId = Number(dataUserCookie[2]);
    return {
      isAuthenticated: true,
      user: { user, email: "", password: "1234", id: userId },
      token: Cookies.get("token") || null,
      loading: false,
      error: null,
    };
  } else {
    return {
      isAuthenticated: false,
      user: null,
      token: Cookies.get("token") || null,
      loading: false,
      error: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      Cookies.set("token", token, { expires: 7 }); //7 days for expire
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
