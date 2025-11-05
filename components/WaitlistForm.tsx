import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface WaitlistFormProps {
  buttonText: React.ReactNode;
  microCopy: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ buttonText, microCopy }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append("from_name", "Padel GO Waitlist");
    formData.append("subject", "New Waitlist Submission from Padel GO");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage('¡Gracias! Estás en la lista. Te avisaremos pronto.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message || 'Hubo un error al enviar. Inténtalo de nuevo.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Hubo un error de conexión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* This is a real key. Replace with your own Access Key from https://web3forms.com if you want */}
        <input type="hidden" name="access_key" value="12a82bde-a423-4b03-8613-8cbd5a777084" />
        
        <input 
          type="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu mejor email" 
          required
          disabled={status === 'submitting' || status === 'success'}
          className="flex-grow w-full px-5 py-3 text-lg bg-[#2a2d2a] text-[#FAFAFA] border border-[#444] rounded-md focus:ring-2 focus:ring-[#3BFF76] focus:border-[#3BFF76] focus:outline-none transition-shadow disabled:opacity-50" 
        />
        
        <button 
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="bg-[#3BFF76] text-[#1A1D1A] font-bold text-lg px-8 py-3 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <span>
            {status === 'submitting' ? 'Enviando...' : buttonText}
          </span>
          {status !== 'submitting' && (
            <div className="transition-transform group-hover:translate-x-1">
              <ArrowRightIcon />
            </div>
          )}
        </button>
      </form>
      
      <div className="text-sm mt-3 h-5"> {/* h-5 to prevent layout shift */}
        {status === 'idle' && <p className="text-[#B0B0B0]">{microCopy}</p>}
        {status === 'success' && <p className="text-[#3BFF76] font-semibold">{message}</p>}
        {status === 'error' && <p className="text-red-500 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default WaitlistForm;
