import React from 'react';
import { login } from '../lib/auth';
import { Activity, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-eve-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at center, #1a1d21 0%, #000 70%)', 
             }} 
        />

      <div className="relative z-10 max-w-md w-full bg-eve-panel/80 backdrop-blur-md border border-eve-border p-8 rounded-lg shadow-2xl text-center">
        <div className="mb-8 flex justify-center">
            <div className="h-16 w-16 bg-eve-dark-gray rounded-full flex items-center justify-center border border-eve-accent-blue shadow-[0_0_15px_rgba(0,163,224,0.3)]">
                <Activity className="text-eve-accent-blue" size={32} />
            </div>
        </div>

        <h1 className="text-3xl font-bold text-white uppercase tracking-tight mb-2">PI Command Center</h1>
        <p className="text-eve-text-muted mb-8 font-mono text-sm">SECURE INDUSTRIAL MANAGEMENT SUITE</p>

        <button 
            onClick={login}
            className="w-full group relative overflow-hidden bg-[#1f1f1f] hover:bg-white text-white hover:text-black font-bold py-4 px-6 rounded transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 border border-white/10"
        >
            <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
            <span>Authenticate via SSO</span>
            
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </button>

        <p className="mt-6 text-xs text-eve-text-muted">
            By connecting, you authorize read access to planetary infrastructure.
            <br />
            No write permissions requested.
        </p>
      </div>
    </div>
  );
};
