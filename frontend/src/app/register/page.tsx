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
import { RegisterUserRequest } from '@/types';

const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const registerData: RegisterUserRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      await registerUser(registerData);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Criar uma Conta</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            fullWidth
            {...register('name')}
            error={errors.name?.message}
          />
          
          <Input
            label="E-mail"
            type="email"
            placeholder="Seu melhor e-mail"
            fullWidth
            {...register('email')}
            error={errors.email?.message}
          />
          
          <Input
            label="Senha"
            type="password"
            placeholder="Crie uma senha forte"
            fullWidth
            {...register('password')}
            error={errors.password?.message}
          />
          
          <Input
            label="Confirmar Senha"
            type="password"
            placeholder="Confirme sua senha"
            fullWidth
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Registrar
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
} 