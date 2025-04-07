'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { expenseService } from '@/services/expenses';
import { ExpenseShort } from '@/types';
import { FiFileText, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [recentExpenses, setRecentExpenses] = useState<ExpenseShort[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const response = await expenseService.getAllExpenses();
        
        // Ordenar por data (mais recente primeiro) e pegar os 5 primeiros
        const sorted = [...response.expenses].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 5);
        
        setRecentExpenses(sorted);
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchExpenses();
    }
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </MainLayout>
    );
  }

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Olá, {user?.name}!</h1>
        <p className="text-gray-600">Bem-vindo ao seu dashboard financeiro.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <Link href="/expenses/create" className="w-full">
              <Button fullWidth className="flex items-center justify-center">
                <FiPlus className="mr-2" /> Nova Despesa
              </Button>
            </Link>
            <Link href="/reports" className="w-full">
              <Button fullWidth variant="outline" className="flex items-center justify-center">
                <FiFileText className="mr-2" /> Ver Relatórios
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Despesas Recentes</h2>
          
          {isLoading ? (
            <p className="text-center py-8 text-gray-500">Carregando despesas...</p>
          ) : recentExpenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">Você ainda não registrou nenhuma despesa.</p>
              <Link href="/expenses/create">
                <Button>Registrar primeira despesa</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/expenses/${expense.id}`} className="text-blue-600 hover:underline">
                          {expense.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {formatCurrency(expense.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {recentExpenses.length > 0 && (
            <div className="mt-4 text-right">
              <Link href="/expenses" className="text-blue-600 hover:underline text-sm">
                Ver todas as despesas →
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 