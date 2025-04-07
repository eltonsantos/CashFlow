// Enums
export enum PaymentType {
  Cash = 0,
  CreditCard = 1,
  DebitCard = 2,
  EletronicTransfer = 3
}

export enum Tag {
  Health = 0,
  Essential = 1,
  Variable = 2,
  Fixed = 3,
  Personal = 4,
  Emergency = 5,
  Investment = 6,
  Leisure = 7,
  Education = 8,
  Transportation = 9
}

// Models baseados na API
export interface User {
  name: string;
  email: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  token: string;
}

export interface Expense {
  id: number;
  title: string;
  description?: string;
  date: string;
  amount: number;
  paymentType: PaymentType;
  tags: Tag[];
}

export interface ExpenseRequest {
  title: string;
  description?: string;
  date: string;
  amount: number;
  paymentType: PaymentType;
  tags: Tag[];
}

export interface RegisteredExpenseResponse {
  title: string;
}

export interface ExpensesResponse {
  expenses: ExpenseShort[];
}

export interface ExpenseShort {
  id: number;
  title: string;
  date: string;
  amount: number;
}

export interface ErrorResponse {
  errorMessages: string[];
} 