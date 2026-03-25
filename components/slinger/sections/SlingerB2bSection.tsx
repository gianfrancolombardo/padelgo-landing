import React from 'react';
import { LineChart, SmartphoneNfc, Wallet } from 'lucide-react';

const SlingerB2bSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="b2b">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">MÁS QUE UN ALQUILER</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            Inteligencia de Mercado y Ventas
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            VoleaBox no solo muestra el producto Slinger a miles de jugadores diarios, lo vende dinámicamente y analiza su rendimiento con datos exactos de uso real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 */}
          <div className="glass p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-volea-green/30 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="absolute top-0 right-0 w-40 h-40 bg-volea-green/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-volea-green/20 transition-all duration-700"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:bg-volea-green group-hover:text-black transition-all duration-500 shadow-2xl">
                <SmartphoneNfc className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-volea-green transition-colors">Venta en Caliente</h3>
                <p className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                  El momento de mayor intención de compra es tras un gran entreno. Activamos <strong className="text-white font-normal">Push Notifications</strong> tácticas con ofertas exclusivas justo al terminar la sesión.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-volea-green/30 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="absolute top-0 right-0 w-40 h-40 bg-volea-green/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-volea-green/20 transition-all duration-700"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:bg-volea-green group-hover:text-black transition-all duration-500 shadow-2xl">
                <Wallet className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-volea-green transition-colors">Efecto Cashback</h3>
                <p className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                  Derribamos la barrera del precio. Descontamos el total de alquileres acumulados del PVP final de la Slinger Bag. Un modelo de <strong className="text-white font-normal">"Try-and-Buy"</strong> sin fricción para el usuario.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-volea-green/30 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="absolute top-0 right-0 w-40 h-40 bg-volea-green/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-volea-green/20 transition-all duration-700"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:bg-volea-green group-hover:text-black transition-all duration-500 shadow-2xl">
                <LineChart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-volea-green transition-colors">Activos de Data</h3>
                <p className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                  Proporcionamos a Slinger <strong className="text-white font-normal">Dashboard de métricas exactas</strong>: horas de uso, perfiles sociodemográficos del jugador y feedback directo de funcionamiento.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SlingerB2bSection;
