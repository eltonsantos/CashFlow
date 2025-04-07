import { Expense, ExpenseRequest, ExpensesResponse, RegisteredExpenseResponse } from '../types';
import api from './api';

export const expenseService = {
  async getAllExpenses(): Promise<ExpensesResponse> {
    const response = await api.get<ExpensesResponse>('/Expenses');
    return response.data;
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