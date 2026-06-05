import React from 'react';
import { BadgeCheck, Globe, ShoppingCart, Database } from 'lucide-react';

const PascalBusinessSection: React.FC = () => {
  return (
    <section id="acuerdo" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-6">LO QUE GANA <span className="text-volea-green">PASCAL BOX</span></h2>
          <p className="text-lg text-[#D1D5DB] font-light max-w-2xl mx-auto">
             No solo integramos tecnología; establecemos un nuevo canal de crecimiento masivo para Pascal Box.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <BadgeCheck className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">Presencia de marca exclusiva</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   El sello <strong className="text-white font-normal">"Con tecnología Pascal Box"</strong> en cada taquilla física, en la app de VoleaBox y en nuestras redes sociales. Tu marca a pie de pista en los clubes más activos de Barcelona y España.
                </p>
             </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <Globe className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">Exclusividad de red</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   Pascal Box será el único sistema de presurización oficial de toda la red VoleaBox en España. Sin competidores, sin comparaciones.
                </p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <ShoppingCart className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">Canal de venta directa</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   Activamos la compra de equipos Pascal Box domésticos directamente desde la app de VoleaBox, en el momento en que el jugador acaba de entrenar con tus pelotas y está en el punto más alto de satisfacción.
                </p>
             </div>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group flex flex-col justify-between">
             <div>
                <Database className="w-10 h-10 text-volea-green mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">Datos reales de campo</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                   Te proporcionamos métricas exactas de uso: número de ciclos de presurización, duración media de las pelotas, incidencias y perfil del jugador. Información que ningún distribuidor ni club puede darte hoy.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PascalBusinessSection;
