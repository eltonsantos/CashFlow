import { 
  AuthResponse, 
  LoginRequest, 
  RegisterUserRequest, 
  UpdateUserRequest,
  ChangePasswordRequest,
  UserProfile
} from '../types';
import api from './api';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/Login', data);
    return response.data;
  },

  async register(data: RegisterUserRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/User', data);
    return response.data;
  },

  async getUserProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/User');
    return response.data;
  },

  async updateUserProfile(data: UpdateUserRequest): Promise<void> {
    await api.put('/User', data);
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.put('/User/change-password', data);
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/User');
  },

  setAuthToken(token: string): void {
    localStorage.setItem('cashflow_token', token);
  },

  getAuthToken(): string | null {
    return localStorage.getItem('cashflow_token');
  },

  removeAuthToken(): void {
    localStorage.removeItem('cashflow_token');
  },

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}; 