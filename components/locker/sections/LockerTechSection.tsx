import React from 'react';
import { Package, ShieldCheck, Layers, Settings2 } from 'lucide-react';

const LockerTechSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="hardware">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          <div className="flex-1 order-2 lg:order-1 relative">
             <div className="absolute -inset-4 bg-volea-green/5 blur-3xl rounded-[3rem]"></div>
             <div className="relative rounded-[3rem] overflow-hidden glass p-3 border border-white/10 shadow-2xl group">
                <img 
                  src="/assets/locker_modularity_detail.png" 
                  alt="Locker Modularity Detail" 
                  className="w-full h-full object-cover aspect-square rounded-[2.5rem] transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div className="glass p-4 rounded-2xl border border-white/10">
                    <span className="block text-[8px] text-volea-green font-bold uppercase tracking-widest mb-1">Eng. Spec v4</span>
                    <span className="text-white font-display text-xl tracking-wider">RESISTENCIA CLASE C5</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-white/50" />
                  </div>
                </div>
             </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 space-y-12">
            <div>
              <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">ESPECIFICACIONES INDUSTRIALES</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                Construido para la <span className="text-volea-green">Exigencia Real</span>
              </h2>
              <p className="text-[#A1A1AA] text-lg font-light leading-relaxed">
                Nuestros lockers operan en entornos outdoor semi-protegidos. Buscamos una arquitectura que combine la estética "Tech-Premium" con una durabilidad extrema.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volea-green">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-wide">Tratamiento Anticorrosivo</h4>
                <p className="text-gray-500 text-sm font-light">Acabados certificados para resistir humedad y exposición directa sin degradación estética.</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volea-green">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-wide">Modularidad Plug&Play</h4>
                <p className="text-gray-500 text-sm font-light">Estructura escalable que permite ampliar unidades según la demanda del club.</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-wide">Electrónica Invisible</h4>
                <p className="text-gray-500 text-sm font-light">Integración limpia de cerraduras electrónicas y cableado interno para mantenimiento zero.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LockerTechSection;
