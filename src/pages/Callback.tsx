import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleCallback } from '../lib/auth';
import { useAuthStore } from '../store/authStore';
import { Loader2, AlertTriangle } from 'lucide-react';

export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addCharacter } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const character = await handleCallback(searchParams);
        addCharacter(character);
        navigate('/'); // Success! Go to dashboard.
      } catch (err: any) {
        console.error("SSO Error:", err);
        setError(err.message || "Failed to complete secure handshake.");
      }
    };

    processCallback();
  }, [searchParams, navigate, addCharacter]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eve-black text-white p-4">
        <div className="max-w-md w-full bg-eve-panel border border-eve-alert-red p-6 rounded text-center">
            <AlertTriangle className="mx-auto text-eve-alert-red mb-4" size={48} />
            <h2 className="text-xl font-bold mb-2">Authentication Failed</h2>
            <p className="text-eve-text-muted mb-6">{error}</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-eve-dark-gray hover:bg-white/10 px-4 py-2 rounded text-sm uppercase tracking-wider transition-colors"
            >
                Return to Base
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-eve-black text-white">
        <Loader2 className="animate-spin text-eve-accent-blue mb-4" size={48} />
        <h2 className="text-xl font-mono tracking-widest uppercase">Establishing Secure Link...</h2>
        <p className="text-sm text-eve-text-muted mt-2">Verifying Capsuleer Credentials</p>
    </div>
  );
};
