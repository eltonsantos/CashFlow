import { Expense, ExpenseRequest, ExpensesResponse, RegisteredExpenseResponse } from '../types';
import api from './api';

export const expenseService = {
  async getAllExpenses(): Promise<ExpensesResponse> {
    const response = await api.get<ExpensesResponse>('/Expenses');
    console.log('Dados brutos da API:', response.data);
    
    // Garantir que as datas estejam presentes e corretamente formatadas
    const processedResponse = {
      expenses: response.data.expenses.map(expense => ({
        ...expense,
        // Se a data existir, usar como está, caso contrário definir para hoje
        date: expense.date || new Date().toISOString().split('T')[0]
      }))
    };
    
    console.log('Dados processados:', processedResponse);
    return processedResponse;
  },

  async getExpenseById(id: number): Promise<Expense> {
    const response = await api.get<Expense>(`/Expenses/${id}`);
    return response.data;
  },

  async createExpense(expenseData: ExpenseRequest): Promise<RegisteredExpenseResponse> {
    const response = await api.post<RegisteredExpenseResponse>('/Expenses', expenseData);
    return response.data;
  },

  async updateExpense(id: number, expenseData: ExpenseRequest): Promise<void> {
    await api.put(`/Expenses/${id}`, expenseData);
  },

  async deleteExpense(id: number): Promise<void> {
    await api.delete(`/Expenses/${id}`);
  },
  
  async exportToPdf(month: string): Promise<Blob> {
    const response = await api.get(`/Report/pdf?month=${month}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  async exportToExcel(month: string): Promise<Blob> {
    const response = await api.get(`/Report/excel?month=${month}`, {
      responseType: 'blob'
    });
    return response.data;
  }
}; 