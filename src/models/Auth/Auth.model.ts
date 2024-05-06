import { UserProfile } from "../User/User.model";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userProfile: UserProfile | null;
  isLoggedIn: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
