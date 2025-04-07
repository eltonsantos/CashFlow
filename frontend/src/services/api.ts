import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7133/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona um interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(config => {
  // Verifica se está no browser
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('cashflow_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
});

export default api; 