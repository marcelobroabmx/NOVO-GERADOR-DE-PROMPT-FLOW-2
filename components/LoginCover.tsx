
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

const LoginCover: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Garante que o usuário retorne para o app após clicar no link
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) throw signUpError;
        setSuccessMsg('SUCESSO! Verifique sua caixa de entrada para confirmar o e-mail.');
        setEmail('');
        setPassword('');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (err: any) {
      // Tradução de erros comuns do Supabase para o usuário final
      let msg = err.message;
      if (msg.includes('Invalid login credentials')) msg = 'E-mail ou senha incorretos.';
      if (msg.includes('Email not confirmed')) msg = 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Background Decorativo */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#fe2c55]/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#25f4ee]/5 rounded-full blur-[140px]"></div>

      <div className="max-w-md w-full z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-[#fe2c55] rounded-3xl shadow-[0_0_30px_rgba(254,44,85,0.3)] mb-6 transform hover:scale-105 transition-transform cursor-default">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-1.26-.93-2.15-2.32-2.43-3.81-.03 2.53-.01 7.64-.01 10.16 0 2.37-.58 4.79-2.14 6.55-1.78 2-4.63 2.76-7.14 2.16-2.51-.59-4.57-2.67-5.12-5.16-.62-2.73.18-5.83 2.22-7.79 1.6-1.53 3.86-2.26 6.04-1.92.01 1.4-.01 2.8.01 4.2-.99-.34-2.13-.19-2.98.43-.8.59-1.22 1.6-1.12 2.59.1 1.15.89 2.13 1.95 2.51 1.05.38 2.29.17 3.12-.58.74-.68 1.09-1.72 1.06-2.71 0-3.32-.01-11.49-.01-14.82z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">FLOW SHOP</h1>
          <p className="text-gray-400 mt-2 font-medium tracking-wide uppercase text-xs">
            {isSignUp ? 'Cadastre-se para começar a criar' : 'Entre no seu ambiente de criação'}
          </p>
        </div>

        <div className={`bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl transition-all ${error ? 'animate-shake border-red-500/30' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 text-white px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#fe2c55] focus:border-transparent outline-none transition-all placeholder-gray-700"
                placeholder="exemplo@flow.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2 ml-1">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 text-white px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#fe2c55] focus:border-transparent outline-none transition-all placeholder-gray-700"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                 <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                <p className="text-green-500 text-[10px] font-black uppercase text-center">{successMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#fe2c55] hover:bg-[#ff4d70] text-white font-black py-5 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center space-x-2 uppercase text-sm tracking-widest ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{isSignUp ? 'Criar minha conta' : 'Acessar agora'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center mx-auto space-x-2"
            >
              <span>{isSignUp ? 'Já possui conta? Faça login' : 'Ainda não tem conta? Clique aqui'}</span>
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-700 text-[10px] font-black uppercase tracking-widest">
          Public Access v3.5 • Supabase Secured
        </p>
      </div>
    </div>
  );
};

export default LoginCover;
