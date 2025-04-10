"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { expenseService } from "@/services/expenses";
import { Expense, PaymentType, Tag } from "@/types";
import { toast } from "react-toastify";

export default function ExpenseDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadExpense = async () => {
      if (!id || isNaN(id)) {
        toast.error("ID de despesa inválido");
        router.push("/expenses");
        return;
      }

      try {
        setLoading(true);
        const data = await expenseService.getExpenseById(id);
        setExpense(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes da despesa:", error);
        toast.error("Erro ao carregar detalhes da despesa");
        router.push("/expenses");
      } finally {
        setLoading(false);
      }
    };

    loadExpense();
  }, [id, router]);

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await expenseService.deleteExpense(id);
      toast.success("Despesa excluída com sucesso");
      router.push("/expenses");
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
      toast.error("Erro ao excluir despesa");
      setIsDeleting(false);
    }
  };

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

  // Obter nome do método de pagamento
  const getPaymentTypeName = (type: PaymentType) => {
    const paymentTypes = {
      [PaymentType.Cash]: "Dinheiro",
      [PaymentType.CreditCard]: "Cartão de Crédito",
      [PaymentType.DebitCard]: "Cartão de Débito",
      [PaymentType.EletronicTransfer]: "Transferência Eletrônica"
    };
    return paymentTypes[type] || "Desconhecido";
  };

  // Obter nome da tag
  const getTagName = (tag: Tag) => {
    const tags = {
      [Tag.Health]: "Saúde",
      [Tag.Essential]: "Essencial",
      [Tag.Variable]: "Variável",
      [Tag.Fixed]: "Fixa",
      [Tag.Personal]: "Pessoal",
      [Tag.Emergency]: "Emergência",
      [Tag.Investment]: "Investimento",
      [Tag.Leisure]: "Lazer",
      [Tag.Education]: "Educação",
      [Tag.Transportation]: "Transporte"
    };
    return tags[tag] || "Desconhecida";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-center">
        <p>Carregando detalhes da despesa...</p>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Despesa não encontrada</h1>
          <p className="mb-6">A despesa que você está procurando não existe ou foi removida.</p>
          <Link 
            href="/expenses" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Voltar para despesas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Detalhes da Despesa</h1>
          <Link 
            href="/expenses" 
            className="text-blue-600 hover:underline"
          >
            Voltar para lista
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{expense.title}</h2>
            {expense.description && (
              <p className="text-gray-600 mb-4">{expense.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-semibold text-lg">{formatCurrency(expense.amount)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p>{formatDate(expense.date)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Método de Pagamento</p>
                <p>{getPaymentTypeName(expense.paymentType)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {expense.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {getTagName(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button 
              onClick={() => router.push(`/expenses/edit/${expense.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Editar
            </button>
            
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 