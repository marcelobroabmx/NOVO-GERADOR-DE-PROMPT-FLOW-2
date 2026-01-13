
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { userService } from '../services/userService';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');

  useEffect(() => {
    setUsers(userService.getUsers());
  }, []);

  const refresh = () => setUsers(userService.getUsers());

  const handleToggleAdmin = (id: string, current: boolean) => {
    userService.updateUser(id, { isAdmin: !current });
    refresh();
  };

  const handleToggleActive = (id: string, current: boolean) => {
    userService.updateUser(id, { isActive: !current });
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      userService.deleteUser(id);
      refresh();
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserEmail && newUserPass) {
      userService.addUser(newUserEmail, newUserPass, false, true);
      setNewUserEmail('');
      setNewUserPass('');
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white">ADMIN <span className="text-[#fe2c55]">PANEL</span></h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Controle de Acesso Flow Shop</p>
          </div>
          <button 
            onClick={onExit}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold text-xs transition-all"
          >
            VOLTAR PARA O APP
          </button>
        </div>

        {/* Adicionar Usuário */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest mb-4">Adicionar Novo Usuário</h2>
          <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4">
            <input 
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#fe2c55]"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <input 
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#fe2c55]"
              placeholder="Senha"
              value={newUserPass}
              onChange={(e) => setNewUserPass(e.target.value)}
            />
            <button className="bg-[#fe2c55] px-8 py-3 rounded-xl font-black text-xs uppercase hover:bg-[#ff4d70] transition-all">
              SALVAR USUÁRIO
            </button>
          </form>
        </div>

        {/* Lista de Usuários */}
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">ID</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Email</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest">Senha</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Admin</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-500 tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-[10px] font-mono text-gray-600">#{user.id}</td>
                    <td className="p-4 text-sm font-bold">{user.email}</td>
                    <td className="p-4 text-sm text-gray-400">{user.password}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${user.isAdmin ? 'bg-[#fe2c55] text-white' : 'bg-gray-800 text-gray-400'}`}
                      >
                        {user.isAdmin ? 'SIM' : 'NÃO'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleActive(user.id, user.isActive)}
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${user.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                      >
                        {user.isActive ? 'ATIVO' : 'LIMITADO'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
