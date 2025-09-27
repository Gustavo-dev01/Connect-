import React from 'react';
import { Screen } from '../../types';
import AuthHeader from '../AuthHeader';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {

  const handleSendLink = () => {
    // Em um aplicativo real, você faria uma chamada de API aqui.
    alert('Se uma conta com este e-mail existir, um link de redefinição de senha foi enviado.');
    onNavigate(Screen.SignIn);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <AuthHeader title="Redefinir Senha" subtitle="Digite seu e-mail para receber um link de redefinição" />
        
        <div className="p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSendLink(); }}>
            <div>
              <label htmlFor="email-reset" className="block text-sm font-medium text-gray-700">Endereço de E-mail</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email-reset"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="voce@exemplo.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:scale-105"
              >
                Enviar Link de Redefinição
              </button>
            </div>
          </form>
        </div>
      </div>
        
      <p className="mt-8 text-center text-sm text-gray-500">
        Lembrou sua senha?{' '}
        <button type="button" onClick={() => onNavigate(Screen.SignIn)} className="font-medium text-orange-600 hover:text-orange-500">
          Faça login
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordScreen;