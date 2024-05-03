import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setAccessToken, setRefreshToken, setUserProfile } from "./reducers/authSlice";
import { getAuthenticatedUser, getAuthentication } from "../apis/auth/authService";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const tokens = await getAuthentication(email, password);
    dispatch(setAccessToken(tokens.access_token));
    dispatch(setRefreshToken(tokens.refresh_token));
    const profile = await getAuthenticatedUser();
    dispatch(setUserProfile(profile));
  };
};
