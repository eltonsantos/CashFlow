"use client";

import { useState } from "react";
import { expenseService } from "@/services/expenses";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ReportsPage() {
  const [month, setMonth] = useState(new Date().toISOString().split('T')[0].substring(0, 7)); // Formato YYYY-MM
  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const downloadReport = async (type: 'pdf' | 'excel') => {
    if (!month) {
      toast.error("Por favor, selecione um mês para o relatório");
      return;
    }

    setIsLoading(true);

    try {
      // Formato para a API: "YYYY-MM-01"
      const formattedMonth = `${month}-01`;
      
      let blob;
      let fileName;
      
      if (type === 'pdf') {
        blob = await expenseService.exportToPdf(formattedMonth);
        fileName = `relatorio-despesas-${month}.pdf`;
      } else {
        blob = await expenseService.exportToExcel(formattedMonth);
        fileName = `relatorio-despesas-${month}.xlsx`;
      }
      
      // Criar URL do blob para download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      // Limpar após o download
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Relatório ${type.toUpperCase()} baixado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao baixar relatório ${type}:`, error);
      toast.error(`Não foi possível baixar o relatório. Verifique se você tem permissões ou tente novamente mais tarde.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <Link 
            href="/dashboard" 
            className="text-blue-600 hover:underline"
          >
            Voltar para o Dashboard
          </Link>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Gerar Relatório de Despesas</h2>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Selecione o Mês
            </label>
            <input
              type="month"
              value={month}
              onChange={handleMonthChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              O relatório incluirá todas as despesas do mês selecionado.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <button
              onClick={() => downloadReport('pdf')}
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
            >
              {isLoading ? "Gerando..." : "Baixar PDF"}
            </button>
            
            <button
              onClick={() => downloadReport('excel')}
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? "Gerando..." : "Baixar Excel"}
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Informações Sobre Relatórios</h2>
          <p className="text-gray-600 mb-4">
            Os relatórios incluem todas as despesas do mês selecionado com detalhes como:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Título e descrição das despesas</li>
            <li>Data de cada despesa</li>
            <li>Valor das despesas</li>
            <li>Método de pagamento</li>
            <li>Total gasto no mês</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
            <p className="text-sm">
              <strong>Nota:</strong> Apenas usuários administradores podem gerar e baixar relatórios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 