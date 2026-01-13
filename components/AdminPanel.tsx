
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nota: Listar todos os usuários do Auth exige uma API segura/Edge Function
    // Aqui simularemos a visualização de perfis ou logs de acesso se houvesse uma tabela 'profiles'
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Como o SDK anon não permite listar auth.users, recomendamos criar uma tabela 'profiles'
    // Para este exemplo, mostramos uma interface placeholder de alta qualidade.
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white">ADMIN <span className="text-[#fe2c55]">PANEL</span></h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Gerenciamento Supabase Flow</p>
          </div>
          <button 
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold text-xs transition-all border border-white/5"
          >
            VOLTAR PARA O APP
          </button>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-10 text-center">
          <div className="w-20 h-20 bg-[#fe2c55]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#fe2c55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter mb-4">CONTROLE DE ACESSO CENTRALIZADO</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">
            Para gerenciar usuários, deletar contas ou verificar e-mails, utilize o Painel do Supabase diretamente em seu projeto para segurança total.
          </p>
          <a 
            href="https://supabase.com/dashboard/project/qwtblctmidzxstxpuzxu/auth/users" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase hover:bg-gray-200 transition-all shadow-xl"
          >
            ABRIR CONSOLE SUPABASE
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Projeto ID</span>
            <p className="text-sm font-mono mt-1">qwtblctmidzxstxpuzxu</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Auth Status</span>
            <p className="text-sm font-bold text-green-500 mt-1 uppercase">Cloud Sync Active</p>
          </div>
          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">E-mail Confirmation</span>
            <p className="text-sm font-bold text-[#fe2c55] mt-1 uppercase">Enabled via SMTP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
