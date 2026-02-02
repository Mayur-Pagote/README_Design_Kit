// src/components/Editor/Sidebar.tsx
import React from 'react';

// Export props to fix "Cannot find name 'SidebarProps'" error
export interface SidebarProps {
  variables: { NAME: string; GITHUB_USER: string };
  onVariableChange: (key: string, value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ variables, onVariableChange }) => {
  return (
    <aside className="w-80 border-r border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-6">
      <h2 className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Global Variables</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-zinc-400">Your Name</label>
          <input 
            type="text"
            value={variables.NAME}
            placeholder="e.g. Pritha Pal"
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded text-sm text-white focus:border-purple-500 outline-none"
            onChange={(e) => onVariableChange('NAME', e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-zinc-400">GitHub Username</label>
          <input 
            type="text"
            value={variables.GITHUB_USER}
            placeholder="e.g. prithapal"
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded text-sm text-white focus:border-purple-500 outline-none"
            onChange={(e) => onVariableChange('GITHUB_USER', e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
};