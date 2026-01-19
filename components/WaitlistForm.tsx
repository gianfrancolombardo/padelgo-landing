import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';

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
        setMessage('¡Gracias! Estás dentro. Te avisaremos pronto.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.message || 'Hubo un error al enviar.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Hubo un error. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative">
        <input type="hidden" name="access_key" value="12a82bde-a423-4b03-8613-8cbd5a777084" />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
          required
          disabled={status === 'submitting' || status === 'success'}
          className="flex-grow w-full px-6 py-4 text-base bg-white/5 text-white border border-white/10 rounded-full focus:ring-1 focus:ring-padel-green focus:border-padel-green focus:outline-none transition-all placeholder:text-gray-600 disabled:opacity-50 backdrop-blur-sm peer"
        />

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="bg-padel-green text-padel-dark font-bold tracking-wide text-base px-8 py-4 rounded-full hover:bg-white hover:text-padel-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2 group disabled:bg-gray-800 disabled:text-gray-500 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,255,118,0.2)] hover:shadow-[0_0_30px_rgba(59,255,118,0.4)] whitespace-nowrap"
        >
          <span>
            {status === 'submitting' ? 'Enviando' : buttonText}
          </span>
          {status === 'submitting' ? (
            <Loader2 className="animate-spin" size={20} />
          ) : status === 'success' ? (
            <Check size={20} />
          ) : (
            <div className="transition-transform group-hover:translate-x-1">
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          )}
        </button>
      </form>

      <div className="text-sm mt-4 h-6 font-light flex justify-center items-center">
        {status === 'idle' && <p className="text-gray-500 animate-fade-in">{microCopy}</p>}
        {status === 'success' && <p className="text-padel-green flex items-center gap-2 animate-fade-in"><Check size={16} /> {message}</p>}
        {status === 'error' && <p className="text-red-400 flex items-center gap-2 animate-fade-in"><AlertCircle size={16} /> {message}</p>}
      </div>
    </div>
  );
};

export default WaitlistForm;
