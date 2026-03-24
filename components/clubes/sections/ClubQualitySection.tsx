import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const ClubQualitySection: React.FC = () => {
  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          
          <div className="flex-1 relative order-2 lg:order-1">
             <div className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src="/assets/pascal-detail.png" 
                  alt="Detalle de Presurización Pascal Box" 
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
             </div>
             {/* Float label */}
             <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl border border-volea-green/20 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-volea-green/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-volea-green" />
                   </div>
                   <div>
                      <span className="block text-[10px] text-gray-400 font-bold tracking-widest uppercase">Estándar Oro</span>
                      <span className="text-white font-display text-lg">EXPERIENCIA PREMIUM</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div className="inline-block border border-volea-green/30 bg-volea-green/5 text-volea-green px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em]">
              VALOR DIFERENCIAL
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">
              MÁS QUE UN <span className="text-volea-green">ALQUILER</span>, UN SERVICIO DE ÉLITE
            </h2>
            <p className="text-[#D1D5DB] text-lg font-light leading-relaxed mb-8">
               Al integrar <strong className="text-white">Pascal Box PRO</strong> en cada punto de entrenamiento, su club no solo alquila una pista; ofrece una garantía de juego que hasta ahora era exclusiva de los mejores centros de alto rendimiento.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-volea-green shrink-0 mt-1" />
                  <p className="text-sm text-gray-400"><strong className="text-white font-normal">Health & Performance:</strong> Proteja las articulaciones de sus socios asegurando siempre la presión óptima de la bola.</p>
               </div>
               <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-volea-green shrink-0 mt-1" />
                  <p className="text-sm text-gray-400"><strong className="text-white font-normal">Fidelización:</strong> Elimine la frustración de las bolas muertas o gastadas, elevando el estándar de satisfacción de su club.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClubQualitySection;
