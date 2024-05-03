import { AuthResponse } from "../../models/Auth/Auth.model";
import { UserProfile } from "../../models/User/User.model";
import axiosInstance from "./interceptors/axiosInstance";

export const getAuthentication = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getAuthenticatedUser = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<UserProfile>("/auth/profile");
  return response.data;
};
