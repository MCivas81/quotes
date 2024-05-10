import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/User";
import { AuthState } from "../../types/Auth";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userProfile: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },
    setUserProfile(state, action: PayloadAction<UserProfile>) {
      state.userProfile = action.payload;
      state.isLoggedIn = true;
    },
    logout() {
      return { ...initialState };
    },
  },
});

export const { setAccessToken, setRefreshToken, setUserProfile, logout } = authSlice.actions;

export const selectUserProfile = (state: RootState) => state.auth.userProfile;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
