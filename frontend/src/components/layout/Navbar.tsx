'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiDollarSign, FiFileText } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome className="mr-2" /> },
    { path: '/expenses', label: 'Despesas', icon: <FiDollarSign className="mr-2" /> },
    { path: '/reports', label: 'Relatórios', icon: <FiFileText className="mr-2" /> },
    { path: '/profile', label: 'Perfil', icon: <FiUser className="mr-2" /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                CashFlow
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    pathname === link.path
                      ? 'bg-blue-700 text-white'
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-white mr-4">Olá, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FiLogOut className="mr-2" /> Sair
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Registrar
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  pathname === link.path
                    ? 'bg-blue-800 text-white'
                    : 'text-white hover:bg-blue-600'
                }`}
                onClick={closeMobileMenu}
              >
                {link.icon} {link.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600 flex items-center"
              >
                <FiLogOut className="mr-2" /> Sair
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600"
                  onClick={closeMobileMenu}
                >
                  Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 