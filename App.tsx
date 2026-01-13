
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import PromptOutput from './components/PromptOutput';
import LoginCover from './components/LoginCover';
import AdminPanel from './components/AdminPanel';
import { PromptConfig } from './types';
import { generateFlowPrompt } from './services/geminiService';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Busca a sessão inicial de forma assíncrona
    const initAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setIsAuthLoading(false);
    };

    initAuth();

    // Escuta mudanças na autenticação em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) setIsAdminView(false);
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGenerate = useCallback(async (config: PromptConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const promptResult = await generateFlowPrompt(config);
      setResult(promptResult);
      setTimeout(() => {
        const output = document.getElementById('result-area');
        output?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setResult('');
  };

  // Tela de Splash enquanto verifica a sessão
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#fe2c55] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Sincronizando Flow Engine...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginCover />;
  }

  // Define quem tem acesso ao painel admin
  const isUserAdmin = session.user.email === 'admin@flow.com';

  if (isAdminView && isUserAdmin) {
    return <AdminPanel onExit={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans animate-in fade-in duration-700">
      <Header />
      
      {isUserAdmin && (
        <div 
          onClick={() => setIsAdminView(true)}
          className="bg-gradient-to-r from-[#fe2c55] to-[#ff7a00] text-white py-2 text-center text-[10px] font-black uppercase tracking-widest cursor-pointer hover:opacity-90 transition-opacity"
        >
          PAINEL ADMINISTRATIVO SUPABASE HABILITADO
        </div>
      )}

      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full relative">
        <div className="flex justify-end mb-4">
           <button 
            onClick={handleLogout}
            className="text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-gray-900 rounded-full px-4 py-1 transition-colors flex items-center space-x-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Sair ({session.user.email})</span>
          </button>
        </div>

        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#fe2c55]/10 text-[#fe2c55] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 border border-[#fe2c55]/20">
            Flow Pro Engine: Specialist Mode
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">
            Gerador de Prompts para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]">Flow</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Prompts de <span className="text-white font-bold underline decoration-[#fe2c55]">alta fidelidade</span>, sem bugs de IA, otimizados para conversão pura no TikTok Shop.
          </p>
        </div>

        <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-5 bg-red-900/20 border border-red-900/40 rounded-3xl text-red-400 flex items-center animate-shake">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-bold">{error}</span>
          </div>
        )}

        <div id="result-area">
          {result && <PromptOutput content={result} />}
        </div>

        {!result && !isLoading && (
          <div className="mt-20 flex flex-col items-center space-y-8 opacity-40">
             <div className="h-px w-24 bg-gray-800"></div>
             <div className="grid grid-cols-3 gap-12 text-center max-w-lg">
                <div>
                   <span className="block text-2xl mb-1">☁️</span>
                   <span className="text-[10px] font-bold uppercase text-gray-400">Supabase</span>
                </div>
                <div>
                   <span className="block text-2xl mb-1">🚫</span>
                   <span className="text-[10px] font-bold uppercase text-gray-400">Zero Bugs</span>
                </div>
                <div>
                   <span className="block text-2xl mb-1">🇧🇷</span>
                   <span className="text-[10px] font-bold uppercase text-gray-400">PT-BR Nativo</span>
                </div>
             </div>
          </div>
        )}
      </main>

      <footer className="py-10 border-t border-gray-900 text-center">
        <p className="text-gray-700 text-[10px] font-black uppercase tracking-widest">
          © {new Date().getFullYear()} Flow Prompt Master - Public Sharing Ready
        </p>
      </footer>
    </div>
  );
};

export default App;
