import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface WaitlistFormProps {
  buttonText: React.ReactNode;
  microCopy: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ buttonText, microCopy }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-lg mx-auto">
      <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col sm:flex-row gap-3">
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
        <input 
          type="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu mejor email" 
          required
          className="flex-grow w-full px-5 py-3 text-lg bg-[#2a2d2a] text-[#FAFAFA] border border-[#444] rounded-md focus:ring-2 focus:ring-[#3BFF76] focus:border-[#3BFF76] focus:outline-none transition-shadow" 
        />
        <button 
          type="submit"
          className="bg-[#3BFF76] text-[#1A1D1A] font-bold text-lg px-8 py-3 rounded-md hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
        >
          <span>{buttonText}</span>
          <div className="transition-transform group-hover:translate-x-1">
            <ArrowRightIcon />
          </div>
        </button>
      </form>
      <p className="text-sm text-[#B0B0B0] mt-3">{microCopy}</p>
    </div>
  );
};

export default WaitlistForm;