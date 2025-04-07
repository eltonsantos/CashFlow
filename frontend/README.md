# CashFlow Frontend

Frontend da aplicação CashFlow desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React com renderização do lado do servidor
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [React Hook Form](https://react-hook-form.com/) - Gerenciamento de formulários
- [Zod](https://github.com/colinhacks/zod) - Validação de esquemas
- [Axios](https://axios-http.com/) - Cliente HTTP baseado em promessas
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notificações toast

## Requisitos

- Node.js 18.0+
- npm 9.0+
- API CashFlow rodando no backend (http://localhost:5000/api por padrão)

## Instalação

```bash
# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Rodar a versão de produção
npm start
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Estrutura do Projeto

- `/src` - Código fonte da aplicação
  - `/app` - Rotas da aplicação (Next.js App Router)
  - `/components` - Componentes reutilizáveis
  - `/contexts` - Contextos React (AuthContext)
  - `/services` - Serviços para comunicação com API
  - `/types` - Tipos TypeScript
  - `/utils` - Utilitários

## Funcionalidades

- Autenticação (Login/Registro)
- Dashboard com visão geral
- Gerenciamento de despesas (CRUD)
- Geração de relatórios
- Perfil de usuário

## Licença

Este projeto está licenciado sob a licença MIT.
