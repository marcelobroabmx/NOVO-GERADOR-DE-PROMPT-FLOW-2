
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

  return (
    <div className="mt-8 bg-[#121212] rounded-3xl border border-gray-800 overflow-hidden animate-in slide-in-from-bottom-8 duration-700 shadow-2xl">
      <div className="bg-[#1a1a1a] px-6 py-5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
           <div className="w-8 h-8 bg-[#ff7a00] rounded-lg flex items-center justify-center mr-3 shadow-[0px_0px_10px_rgba(255,122,0,0.4)]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
           </div>
           <div>
             <h2 className="text-white font-black text-sm uppercase tracking-tighter">Roteiro Otimizado Flow</h2>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">3 Cenas • 24s Total</p>
           </div>
        </div>
        <button
          onClick={handleCopy}
          className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
            copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {copied ? 'COPIADO!' : 'COPIAR ROTEIRO'}
        </button>
      </div>
      <div className="p-8">
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 whitespace-pre-wrap font-medium leading-relaxed italic border-l-4 border-[#fe2c55] pl-6 py-2">
            {content}
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-800 pt-6">
           <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 text-center">
             <span className="block text-white text-[10px] font-black mb-1">CENA 1</span>
             <span className="text-[#fe2c55] text-[10px] font-bold uppercase tracking-tighter">Hook/Story</span>
           </div>
           <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 text-center">
             <span className="block text-white text-[10px] font-black mb-1">CENA 2</span>
             <span className="text-[#fe2c55] text-[10px] font-bold uppercase tracking-tighter">Escassez</span>
           </div>
           <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 text-center">
             <span className="block text-white text-[10px] font-black mb-1">CENA 3</span>
             <span className="text-[#ff7a00] text-[10px] font-bold uppercase tracking-tighter">CTA Cart</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptOutput;
