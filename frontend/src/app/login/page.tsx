'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoginRequest } from '@/types';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };
      await login(loginData);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Entrar no CashFlow</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="Seu e-mail"
            fullWidth
            {...register('email')}
            error={errors.email?.message}
          />
          
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            fullWidth
            {...register('password')}
            error={errors.password?.message}
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 