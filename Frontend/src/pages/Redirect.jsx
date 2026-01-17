import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Redirect() {
  const { shortCode } = useParams();

  useEffect(() => {
    
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/${shortCode}`;
  }, [shortCode]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg">Redirecting...</p>
      </div>
    </div>
  );
}