'use client';

import React from 'react';
import Link from 'next/link';
import { FiCreditCard, FiPieChart, FiShield, FiSmartphone } from 'react-icons/fi';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Home() {
  const features = [
    {
      icon: <FiCreditCard className="h-10 w-10 text-blue-600" />,
      title: 'Controle de Despesas',
      description: 'Registre e categorize todas as suas despesas em um só lugar de forma simples e rápida.'
    },
    {
      icon: <FiPieChart className="h-10 w-10 text-blue-600" />,
      title: 'Relatórios Detalhados',
      description: 'Visualize gráficos e relatórios para entender melhor seus padrões de gastos.'
    },
    {
      icon: <FiShield className="h-10 w-10 text-blue-600" />,
      title: 'Segurança em Primeiro Lugar',
      description: 'Seus dados financeiros são protegidos com as mais modernas técnicas de segurança.'
    },
    {
      icon: <FiSmartphone className="h-10 w-10 text-blue-600" />,
      title: 'Acesse de Qualquer Lugar',
      description: 'Interface responsiva que se adapta a qualquer dispositivo, desktop ou mobile.'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Controle suas finanças com facilidade
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            O CashFlow é a ferramenta ideal para você acompanhar e gerenciar suas despesas
            de forma simples e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md shadow-md"
            >
              Começar Agora
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-md border border-gray-300 shadow-sm"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recursos Principais</h2>
            <p className="mt-4 text-xl text-gray-600">
              Tudo o que você precisa para manter suas finanças sob controle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 mt-12 bg-blue-600 rounded-lg text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para organizar suas finanças?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de pessoas que já estão economizando e controlando melhor seu dinheiro com o CashFlow.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md shadow-md text-lg"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
