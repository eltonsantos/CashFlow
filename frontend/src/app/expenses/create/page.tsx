"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormEvent } from "react";
import { ExpenseRequest, PaymentType, Tag } from "@/types";
import { expenseService } from "@/services/expenses";
import { toast } from "react-toastify";

export default function CreateExpensePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ExpenseRequest>({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0], // Data atual formatada como YYYY-MM-DD
    amount: 0,
    paymentType: PaymentType.Cash,
    tags: [Tag.Variable]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else if (name === "paymentType") {
      setFormData({
        ...formData,
        [name]: parseInt(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const toggleTag = (tag: Tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tag)
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
    }
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await expenseService.createExpense(formData);
      toast.success("Despesa criada com sucesso!");
      router.push("/expenses");
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      toast.error("Erro ao criar despesa. Tente novamente mais tarde.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Despesa</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Valor
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Data
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo de Pagamento
              </label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value={PaymentType.Cash}>Dinheiro</option>
                <option value={PaymentType.CreditCard}>Cartão de Crédito</option>
                <option value={PaymentType.DebitCard}>Cartão de Débito</option>
                <option value={PaymentType.EletronicTransfer}>Transferência Eletrônica</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tags
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-health"
                    checked={formData.tags.includes(Tag.Health)}
                    onChange={() => toggleTag(Tag.Health)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-health">Saúde</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-essential"
                    checked={formData.tags.includes(Tag.Essential)}
                    onChange={() => toggleTag(Tag.Essential)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-essential">Essencial</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-variable"
                    checked={formData.tags.includes(Tag.Variable)}
                    onChange={() => toggleTag(Tag.Variable)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-variable">Variável</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-fixed"
                    checked={formData.tags.includes(Tag.Fixed)}
                    onChange={() => toggleTag(Tag.Fixed)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-fixed">Fixa</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-personal"
                    checked={formData.tags.includes(Tag.Personal)}
                    onChange={() => toggleTag(Tag.Personal)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-personal">Pessoal</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-emergency"
                    checked={formData.tags.includes(Tag.Emergency)}
                    onChange={() => toggleTag(Tag.Emergency)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-emergency">Emergência</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-investment"
                    checked={formData.tags.includes(Tag.Investment)}
                    onChange={() => toggleTag(Tag.Investment)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-investment">Investimento</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-leisure"
                    checked={formData.tags.includes(Tag.Leisure)}
                    onChange={() => toggleTag(Tag.Leisure)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-leisure">Lazer</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-education"
                    checked={formData.tags.includes(Tag.Education)}
                    onChange={() => toggleTag(Tag.Education)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-education">Educação</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tag-transportation"
                    checked={formData.tags.includes(Tag.Transportation)}
                    onChange={() => toggleTag(Tag.Transportation)}
                    className="mr-2"
                  />
                  <label htmlFor="tag-transportation">Transporte</label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Link 
                href="/expenses" 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 