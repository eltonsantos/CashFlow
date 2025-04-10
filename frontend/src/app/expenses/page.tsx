"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { expenseService } from "@/services/expenses";
import { ExpenseShort } from "@/types";
import { toast } from "react-toastify";

export default function ExpensesPage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<ExpenseShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const response = await expenseService.getAllExpenses();
        console.log('Despesas recebidas da API:', response.expenses);
        
        // Inspecionar detalhadamente os objetos de despesa
        if (response.expenses && response.expenses.length > 0) {
          response.expenses.forEach((expense, index) => {
            console.log(`Despesa ${index + 1}:`, {
              id: expense.id,
              title: expense.title,
              date: expense.date,
              dateType: typeof expense.date,
              amount: expense.amount
            });
          });
        }
        
        setExpenses(response.expenses || []);
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);
        toast.error("Erro ao carregar despesas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return '';
      
      // Verificar se a data está no formato ISO (2023-05-15T00:00:00)
      if (dateString.includes('T')) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
      }
      
      // Se não estiver no formato ISO, tentar dividir por traços (2023-05-15)
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return date.toLocaleDateString('pt-BR');
      }
      
      return dateString;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Despesas</h1>
        
        <div className="mb-4 flex justify-between items-center">
          <div>
            <Link 
              href="/expenses/create" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Nova Despesa
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            {expenses.length === 0 ? (
              <p className="text-gray-500">Nenhuma despesa encontrada</p>
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {expense.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(expense.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {formatCurrency(expense.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => router.push(`/expenses/${expense.id}`)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Detalhes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 