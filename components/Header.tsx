
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-800 py-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-[#fe2c55] p-1.5 rounded-md shadow-[0px_0px_15px_rgba(254,44,85,0.5)]">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-1.26-.93-2.15-2.32-2.43-3.81-.03 2.53-.01 7.64-.01 10.16 0 2.37-.58 4.79-2.14 6.55-1.78 2-4.63 2.76-7.14 2.16-2.51-.59-4.57-2.67-5.12-5.16-.62-2.73.18-5.83 2.22-7.79 1.6-1.53 3.86-2.26 6.04-1.92.01 1.4-.01 2.8.01 4.2-.99-.34-2.13-.19-2.98.43-.8.59-1.22 1.6-1.12 2.59.1 1.15.89 2.13 1.95 2.51 1.05.38 2.29.17 3.12-.58.74-.68 1.09-1.72 1.06-2.71 0-3.32-.01-11.49-.01-14.82z"/>
            </svg>
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter italic">FLOW <span className="text-[#25f4ee]">MASTER</span></h1>
        </div>
        <div className="flex items-center space-x-2">
           <span className="h-2 w-2 bg-[#25f4ee] rounded-full animate-pulse"></span>
           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pro Engine 3.5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
