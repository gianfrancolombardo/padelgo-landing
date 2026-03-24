import React from 'react';
import { Settings, Zap, Shield } from 'lucide-react';

const PascalIntegrationSection: React.FC = () => {
  return (
    <section id="integracion" className="py-24 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-20 max-w-7xl mx-auto">
          
          <div className="flex-1 space-y-12 animate-fade-in">
             <div>
                <div className="text-volea-green text-xs font-bold tracking-[0.3em] uppercase mb-4">Ingeniería Compartida</div>
                <h2 className="text-4xl md:text-6xl font-display text-white mb-6">INTEGRACIÓN <br /> <span className="text-volea-green">NATIVA PRO</span></h2>
                <p className="text-[#D1D5DB] text-lg font-light leading-relaxed">
                   Diseñamos el hardware de VoleaBox en torno a la precisión de Pascal Box. No es un accesorio; es el corazón de nuestra experiencia premium de entrenamiento.
                </p>
             </div>

             <div className="space-y-8">
                <div className="flex gap-6 items-start">
                   <div className="w-10 h-10 rounded-full bg-volea-green/10 flex items-center justify-center border border-volea-green/20 shrink-0 mt-1">
                      <Settings className="w-5 h-5 text-volea-green" />
                   </div>
                   <div>
                      <h4 className="text-xl font-display text-white mb-2">Monitorización IoT</h4>
                      <p className="text-sm text-gray-400 font-light">Control remoto de presión y estado del sistema Pascal Box PRO directamente desde nuestro dashboard de flota.</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 mt-1">
                      <Zap className="w-5 h-5 text-white" />
                   </div>
                   <div>
                      <h4 className="text-xl font-display text-white mb-2">Automatización de Ciclos</h4>
                      <p className="text-sm text-gray-400 font-light">Ciclos de presurización automáticos entre alquileres para garantizar que el siguiente jugador reciba siempre el "Bote Perfecto".</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex-1 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
             <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,255,118,0.1)] group">
                <img 
                  src="/assets/pascal-integration.png" 
                  alt="VoleaBox x Pascal Box Integration" 
                  className="w-full h-full object-cover aspect-square transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                   <div className="glass p-4 rounded-2xl border border-white/10">
                      <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Standard de Calidad</span>
                      <span className="text-white font-display text-xl tracking-wider">CERTIFICADO PASCAL BOX</span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-volea-green flex items-center justify-center shadow-[0_0_20px_rgba(59,255,118,0.5)]">
                      <Shield className="w-6 h-6 text-black" />
                   </div>
                </div>
             </div>
             
             {/* Decorative labels */}
             <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl border border-white/10 animate-float">
                <img src="/assets/pascal-detail.png" className="w-24 h-24 object-cover rounded-lg mb-2" />
                <span className="text-[8px] text-volea-green font-bold uppercase tracking-widest">Detalle: Pascal Box PRO</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PascalIntegrationSection;
