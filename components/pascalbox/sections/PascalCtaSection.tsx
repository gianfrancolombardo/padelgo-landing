import React from 'react';
import { Mail, Phone, ChevronRight } from 'lucide-react';

const PascalCtaSection: React.FC = () => {
  return (
    <section id="contacto" className="py-32 relative overflow-hidden bg-[#020202]">
       <div className="absolute inset-0 bg-gradient-to-t from-volea-green/5 to-transparent"></div>
       
       <div className="max-w-[1440px] mx-auto px-6 relative z-10">
         <div className="max-w-4xl mx-auto text-center border border-white/10 p-16 rounded-[3rem] bg-[#0A0A0A]/40 backdrop-blur-md">
           
           <h2 className="text-4xl md:text-7xl font-display text-white mb-8 tracking-wider">
             DEFINAMOS EL <br /> <span className="text-volea-green underline decoration-volea-green/20 underline-offset-8">ESTÁNDAR</span> JUNTOS
           </h2>
           
           <p className="text-lg md:text-xl text-[#D1D5DB] font-light max-w-2xl mx-auto mb-14">
             Lideremos la transición hacia un deporte de raqueta sostenible y de alta tecnología. Estamos listos para integrar Pascal Box como el estándar de calidad VoleaBox en nuestro despliegue 2026.
           </p>

           <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
             <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                <Mail className="w-5 h-5 text-volea-green" />
                <a href="mailto:carlos@voleabox.com?subject=Strategic%20Partnership%20-%20Pascal%20Box" className="text-white font-medium hover:text-volea-green transition-colors">carlos@voleabox.com</a>
             </div>
             <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                <Phone className="w-5 h-5 text-volea-green" />
                <a href="tel:+34655720515" className="text-white font-medium hover:text-volea-green transition-colors">+34 655 720 515</a>
             </div>
           </div>

           <a 
             href="mailto:carlos@voleabox.com?subject=Pascal%20Box%20Strategic%20Meeting" 
             className="group relative inline-flex items-center justify-center bg-volea-green text-black px-12 py-5 rounded-full text-lg font-bold tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(59,255,118,0.3)]"
           >
             AGENDAR REUNIÓN ESTRATÉGICA
             <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
           </a>

         </div>
       </div>

       <div className="text-center py-10 opacity-20">
          <p className="text-[10px] tracking-[0.5em] font-bold uppercase text-white">VoleaBox x Pascal Box | Alliance Draft Q1 2026</p>
       </div>
    </section>
  );
};

export default PascalCtaSection;
