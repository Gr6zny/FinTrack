export interface StrapiUser {
  id: number;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: Record<string, any>;
}

export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

export interface RefreshTokenResponse {
  jwt: string;
  refreshToken?: string;
}
