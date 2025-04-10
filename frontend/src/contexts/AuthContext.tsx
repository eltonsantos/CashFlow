'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth';
import { AuthResponse, LoginRequest, RegisterUserRequest, UserProfile, ErrorResponse } from '@/types';
import { setCookie, deleteCookie } from '@/utils/cookies';
import { AxiosError } from 'axios';

interface AuthContextData {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterUserRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromToken() {
      try {
        const token = authService.getAuthToken();
        
        if (token) {
          try {
            const userData = await authService.getUserProfile();
            setUser(userData);
          } catch (error) {
            console.error('Erro ao carregar perfil do usuário:', error);
            authService.removeAuthToken();
            deleteCookie('cashflow_token');
          }
        }
      } finally {
        setLoading(false);
      }
    }
    
    loadUserFromToken();
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      setLoading(true);
      const response = await authService.login(data);
      handleAuthSuccess(response);
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.errorMessages?.[0] || 'Falha ao fazer login';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterUserRequest) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      handleAuthSuccess(response);
      toast.success('Registro realizado com sucesso!');
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.errorMessages?.[0] || 'Falha ao registrar usuário';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.removeAuthToken();
    deleteCookie('cashflow_token');
    setUser(null);
    toast.info('Logout realizado com sucesso!');
    router.push('/login');
  };

  const handleAuthSuccess = async (response: AuthResponse) => {
    authService.setAuthToken(response.token);
    setCookie('cashflow_token', response.token);
    
    try {
      const userData = await authService.getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar perfil do usuário:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 