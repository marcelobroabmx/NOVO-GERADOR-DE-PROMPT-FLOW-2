
import React, { useState } from 'react';

interface LoginCoverProps {
  onLogin: () => void;
}

const LoginCover: React.FC<LoginCoverProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Revertendo para login simplificado
    if (username.trim() && password.trim()) {
      onLogin();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Background Decorativo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fe2c55]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#25f4ee]/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-md w-full z-10">
        <div className="text-center mb-10 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center justify-center p-3 bg-[#fe2c55] rounded-2xl shadow-[0_0_20px_rgba(254,44,85,0.4)] mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-1.26-.93-2.15-2.32-2.43-3.81-.03 2.53-.01 7.64-.01 10.16 0 2.37-.58 4.79-2.14 6.55-1.78 2-4.63 2.76-7.14 2.16-2.51-.59-4.57-2.67-5.12-5.16-.62-2.73.18-5.83 2.22-7.79 1.6-1.53 3.86-2.26 6.04-1.92.01 1.4-.01 2.8.01 4.2-.99-.34-2.13-.19-2.98.43-.8.59-1.22 1.6-1.12 2.59.1 1.15.89 2.13 1.95 2.51 1.05.38 2.29.17 3.12-.58.74-.68 1.09-1.72 1.06-2.71 0-3.32-.01-11.49-.01-14.82z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">FLOW SHOP</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide">AMBIENTE DE CRIAÇÃO EXCLUSIVO</p>
        </div>

        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl transition-all ${isError ? 'animate-shake border-red-500/50' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#fe2c55] outline-none transition-all placeholder-gray-600"
                placeholder="Seu nome de usuário"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#fe2c55] outline-none transition-all placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#fe2c55] hover:bg-[#ff4d70] text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>ACESSAR AMBIENTE</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Acesso restrito a parceiros Flow
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-700 text-[10px] font-black uppercase tracking-widest">
          Gerador de Prompts v2.0 • Ultra HD Engine
        </p>
      </div>
    </div>
  );
};

export default LoginCover;
