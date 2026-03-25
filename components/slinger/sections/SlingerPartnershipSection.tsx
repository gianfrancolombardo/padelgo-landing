import React from 'react';
import { Eye, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

const SlingerPartnershipSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" id="showroom">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-[40%] w-[600px] h-[600px] bg-volea-green/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative group">
            {/* Main Image Container */}
            <div className="absolute -inset-4 bg-volea-green/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden glass p-3 border border-white/10 shadow-2xl">
              <img 
                src="/assets/slinger_locker_court.png" 
                alt="SlingerBag Locker in Padel Court" 
                className="w-full aspect-[4/5] object-cover rounded-[2rem] transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              
              {/* Internal Overlay elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="glass p-5 rounded-2xl border border-white/10 backdrop-blur-md animate-slide-up">
                  <span className="block text-[9px] text-volea-green font-black uppercase tracking-[0.2em] mb-1">Standard de Red</span>
                  <span className="text-white font-display text-xl tracking-wider">HUB AUTÓNOMO VOLEABOX</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-volea-green flex items-center justify-center shadow-[0_0_30px_rgba(59,255,118,0.4)] animate-pulse-slow">
                  <Zap className="w-7 h-7 text-black" />
                </div>
              </div>
            </div>

            {/* Floating Elements (Pascal Style) */}
            <div className="absolute -top-10 -right-10 hidden md:block glass p-5 rounded-[2rem] border border-white/10 animate-float shadow-2xl z-20 transition-transform group-hover:scale-110 duration-500">
               <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-volea-green/10 border border-volea-green/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-volea-green" />
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 font-bold uppercase tracking-widest">Status: Online</span>
                    <span className="text-white font-bold text-xs uppercase tracking-tight">Slinger IoT Node</span>
                  </div>
               </div>
               <div className="flex gap-1 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-volea-green transition-all duration-1000"></div>
               </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden md:block glass-card py-3 px-5 rounded-full border border-volea-green/20 animate-float shadow-xl z-20" style={{ animationDelay: '1s' }}>
                <span className="text-[9px] text-volea-green font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-volea-green animate-pulse"></span>
                  Ready for Session
                </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-volea-green text-sm font-bold tracking-[0.3em] mb-4 uppercase">EL SHOWROOM DEFINITIVO</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              SlingerBag: De E-commerce a <span className="text-volea-green">Experiencia Ubicua</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg md:text-xl mb-12 font-light leading-relaxed">
              Transformamos cada alquiler en una demostración de producto activa. Slinger deja de ser un objeto estático en una caja para convertirse en la herramienta de mejora diaria en los clubes más prestigiosos.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-volea-green/5 border border-volea-green/20 flex items-center justify-center text-volea-green group-hover:bg-volea-green group-hover:text-black transition-all duration-300">
                  <Eye className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Visibilidad de Élite</h4>
                  <p className="text-[#A1A1AA] font-light leading-relaxed">Lockers de diseño industrial situados a pie de las pistas centrales. Máxima exposición visual ante el target más cualificado.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-volea-green/5 border border-volea-green/20 flex items-center justify-center text-volea-green group-hover:bg-volea-green group-hover:text-black transition-all duration-300">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Prueba Social Pagada</h4>
                  <p className="text-[#A1A1AA] font-light leading-relaxed">El usuario paga por probar su tecnología. Cero coste de adquisición para Slinger; puro retorno en validación y confianza de marca.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-volea-green/5 border border-volea-green/20 flex items-center justify-center text-volea-green group-hover:bg-volea-green group-hover:text-black transition-all duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Simbiosis Tecnológica</h4>
                  <p className="text-[#A1A1AA] font-light leading-relaxed">Integración con Pascal Box para garantizar que cada bola lanzada por la Slinger tenga la presión reglamentaria, protegiendo su mecánica.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SlingerPartnershipSection;
