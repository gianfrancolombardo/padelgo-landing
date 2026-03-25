import React from 'react';
import { Mail, ArrowRight, Shield } from 'lucide-react';

const LockerCtaSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="contacto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-volea-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10 text-center">
        
        <div className="max-w-4xl mx-auto glass p-16 md:p-24 rounded-[4rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-volea-green/40 to-transparent"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="w-20 h-20 rounded-3xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-10 h-10 text-volea-green" />
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-[0.9]">
              ¿CONSTRUIMOS LA <br />
              <span className="text-volea-green">PRÓXIMA ESCALA?</span>
            </h2>

            <p className="text-xl text-[#A1A1AA] font-light max-w-2xl mx-auto leading-relaxed">
              Estamos abiertos a propuestas de fabricantes capaces de igualar nuestra ambición tecnológica e industrial. Agenda una sesión técnica con nuestro equipo de infraestructura.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button 
                className="bg-volea-green text-black px-12 py-6 rounded-2xl font-bold text-sm tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-[0_15px_50px_rgba(59,255,118,0.25)] flex items-center justify-center gap-4 group/btn"
              >
                SOLICITAR BRIEFING TÉCNICO
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="pt-12 text-gray-500 text-xs font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-white/10"></span>
              Strategic Partnership Inquiry
              <span className="w-8 h-[1px] bg-white/10"></span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LockerCtaSection;
