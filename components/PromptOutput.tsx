
import React, { useState } from 'react';

interface PromptOutputProps {
  content: string;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!content) return null;

  const strategyMatch = content.match(/\[ESTRATÉGIA\]:? (.*)/);
  const strategy = strategyMatch ? strategyMatch[1] : "Estratégia Flow Master";
  
  const cleanContent = content
    .replace(/\[ESTRATÉGIA\]:? .*/, '')
    .trim();

  return (
    <div className="mt-8 bg-black rounded-[3rem] border border-gray-900 overflow-hidden animate-in slide-in-from-bottom-8 duration-700 shadow-[0_40px_80px_rgba(254,44,85,0.15)]">
      <div className="bg-gradient-to-r from-[#111] to-black px-8 py-7 border-b border-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
           <div className="w-12 h-12 bg-gradient-to-br from-[#fe2c55] to-[#ff7a00] rounded-2xl flex items-center justify-center mr-4 shadow-[0px_0px_25px_rgba(254,44,85,0.5)]">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
           </div>
           <div>
             <h2 className="text-white font-black text-lg uppercase tracking-tighter italic">Roteiro de Alta Conversão</h2>
             <span className="text-[#25f4ee] text-[11px] font-black px-0 py-0.5 rounded-full uppercase tracking-[0.3em]">
               {strategy}
             </span>
           </div>
        </div>
        <button
          onClick={handleCopy}
          className={`px-10 py-4 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ${
            copied ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-white text-black hover:bg-[#25f4ee] hover:text-black shadow-xl active:scale-95'
          }`}
        >
          {copied ? 'COPIADO COM SUCESSO' : 'COPIAR MASTER SCRIPT'}
        </button>
      </div>
      
      <div className="p-8 md:p-14">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 whitespace-pre-wrap font-medium leading-relaxed text-xl font-serif selection:bg-[#fe2c55] selection:text-white">
            {cleanContent}
          </div>
        </div>
        
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-900 pt-10">
           <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 group hover:border-[#fe2c55]/30 transition-colors">
             <div className="text-2xl mb-2">📖</div>
             <span className="block text-[#fe2c55] text-[10px] font-black mb-1 uppercase tracking-widest">Ato 1</span>
             <span className="text-white text-sm font-bold">História & Imersão</span>
           </div>
           <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 group hover:border-yellow-500/30 transition-colors">
             <div className="text-2xl mb-2">⏳</div>
             <span className="block text-yellow-500 text-[10px] font-black mb-1 uppercase tracking-widest">Ato 2</span>
             <span className="text-white text-sm font-bold">Escassez Real</span>
           </div>
           <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 group hover:border-[#25f4ee]/30 transition-colors">
             <div className="text-2xl mb-2">💰</div>
             <span className="block text-[#25f4ee] text-[10px] font-black mb-1 uppercase tracking-widest">Ato 3</span>
             <span className="text-white text-sm font-bold">CTA de Venda</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptOutput;
