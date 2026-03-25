import React from 'react';
import { Mail, Phone, ArrowRight } from 'lucide-react';

const SlingerCtaSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" id="contacto">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-4xl h-[400px] bg-volea-green/10 rounded-[100%] blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        <div className="glass max-w-5xl mx-auto rounded-[2rem] border border-white/10 p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
          
          <div className="mb-4">
            <span className="inline-block border border-volea-green/30 bg-volea-green/5 text-volea-green px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em]">
              CONTACTO FUNDADORES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-3xl mb-6">
            Definamos juntos el nuevo estándar de entrenamiento.
          </h2>

          <p className="text-[#A1A1AA] text-lg max-w-2xl font-light mb-12">
            Estamos listos para estandarizar nuestra flota operando exclusivamente con la tecnología Slinger. Analicemos los números y escalemos esta propuesta de valor.
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-2xl w-full">
            <a 
              href="mailto:carlos@voleabox.com" 
              className="group flex items-center justify-between w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-full transition-all duration-300 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 text-white font-medium">
                <Mail className="w-5 h-5 text-volea-green" />
                carlos@voleabox.com
              </div>
            </a>

            <a 
              href="tel:+34655720515" 
              className="group flex items-center justify-between w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-5 rounded-full transition-all duration-300 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 text-white font-medium">
                <Phone className="w-5 h-5 text-volea-green" />
                +34 655 720 515
              </div>
            </a>
          </div>

          <div className="mt-12 text-[#A1A1AA] font-light text-sm flex items-center gap-2">
            <span>Carlos Neidl — Co-Founder </span> | <span> Barcelona, España</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SlingerCtaSection;
