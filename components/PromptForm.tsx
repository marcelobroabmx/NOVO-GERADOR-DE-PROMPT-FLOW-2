
import React, { useState, useRef } from 'react';
import { PromptConfig } from '../types';

interface PromptFormProps {
  onSubmit: (config: PromptConfig) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [media, setMedia] = useState<{data: string, mimeType: string} | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setMedia({ data: base64String, mimeType: file.type });
        setPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      idea,
      language: 'pt-BR',
      media: media || undefined
    });
  };

  return (
    <div className="bg-[#121212] rounded-3xl shadow-2xl border border-gray-800 p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Mídia Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center overflow-hidden ${
            preview ? 'border-transparent h-64' : 'border-gray-700 h-48 hover:border-[#fe2c55] bg-[#1a1a1a]'
          }`}
        >
          {preview ? (
            <>
              {media?.mimeType.startsWith('video') ? (
                <video src={preview} className="w-full h-full object-cover" controls />
              ) : (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white font-bold bg-[#fe2c55] px-4 py-2 rounded-full text-sm">Trocar Mídia</span>
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#fe2c55] transition-colors">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">Anexe um Print ou Vídeo do TikTok Shop</p>
              <p className="text-gray-600 text-xs mt-1">Análise visual automática</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,video/*"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Contexto Adicional (Opcional)</label>
          <textarea
            className="w-full bg-[#1a1a1a] text-white px-4 py-4 rounded-2xl border border-gray-800 focus:ring-2 focus:ring-[#fe2c55] focus:border-transparent outline-none transition-all resize-none placeholder-gray-600"
            placeholder="Ex: É um massageador de pescoço bivolt, foco em relaxamento no trabalho..."
            rows={3}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || (!idea && !media)}
          className={`w-full py-4 rounded-full font-black text-white text-lg transition-all flex items-center justify-center space-x-2 shadow-lg ${
            isLoading 
              ? 'bg-gray-800 cursor-wait' 
              : 'bg-[#fe2c55] hover:bg-[#ff4d70] active:scale-95 hover:shadow-[#fe2c55]/20'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>ANALISANDO...</span>
            </>
          ) : (
            <>
              <span>GERAR ROTEIRO VIRAL</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PromptForm;
