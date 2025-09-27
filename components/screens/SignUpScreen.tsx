import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../../types';
import AuthHeader from '../AuthHeader';

interface SignUpScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <AuthHeader title="Criar Conta" subtitle="Junte-se à nossa comunidade hoje!" />

        <div className="p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Endereço de E-mail</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email-signup"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="voce@exemplo.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="username-signup" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username-signup"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="seu_usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password-signup"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate(Screen.Home)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                PRÓXIMO
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Já tem uma conta?{' '}
        <button onClick={() => onNavigate(Screen.SignIn)} className="font-medium text-orange-600 hover:text-orange-500">
          Faça login
        </button>
      </p>
    </div>
  );
};

export default SignUpScreen;