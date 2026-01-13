
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import PromptOutput from './components/PromptOutput';
import LoginCover from './components/LoginCover';
import { PromptConfig } from './types';
import { generateFlowPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  if (!isLoggedIn) {
    return <LoginCover onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans animate-in fade-in duration-700">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full relative">
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-gray-900 rounded-full px-4 py-1"
        >
          Sair
        </button>

        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-block bg-[#fe2c55]/10 text-[#fe2c55] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 border border-[#fe2c55]/20">
            Flow Pro Engine: Specialist Mode
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">
            Gerador de Prompts para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe2c55] to-[#25f4ee]">Flow</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            Prompts de alta fidelidade, sem bugs de IA, otimizados para 24 segundos de conversão pura no TikTok Shop.
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
                   <span className="block text-2xl mb-1">💎</span>
                   <span className="text-[10px] font-bold uppercase text-gray-400">Ultra HD</span>
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
          © {new Date().getFullYear()} Flow Prompt Master - Secure Access Edition
        </p>
      </footer>
    </div>
  );
};

export default App;
