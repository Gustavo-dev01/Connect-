import React from 'react';
// FIX: Changed import path to be relative.
import { Screen } from '../../types';
import AuthHeader from '../AuthHeader';

interface SignInScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <AuthHeader title="Bem-vindo(a) de volta!" subtitle="Faça login para continuar sua jornada" />
        
        <div className="p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Endereço de E-mail</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="voce@exemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembrar de mim</label>
              </div>

              <div className="text-sm">
                <button onClick={() => onNavigate(Screen.ForgotPassword)} className="font-medium text-orange-600 hover:text-orange-500">Esqueceu a senha?</button>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate(Screen.Home)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
        
      <p className="mt-8 text-center text-sm text-gray-500">
        Não é um membro?{' '}
        <button onClick={() => onNavigate(Screen.SignUp)} className="font-medium text-orange-600 hover:text-orange-500">
          Cadastre-se aqui
        </button>
      </p>
    </div>
  );
};

export default SignInScreen;