import React from 'react';
import { Clock, Users, XCircle } from 'lucide-react';

const ClubProblemSection: React.FC = () => {
  return (
    <section id="problema" className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wide">EL <span className="text-[#EF4444]">DESAFÍO</span> DEL PÁDEL ACTUAL</h2>
          <p className="text-[#D1D5DB] max-w-2xl mx-auto text-lg font-light">
            Los deportes de raqueta están evolucionando. La forma de rentabilizar su club, también.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
          
          <div className="glass-card p-8 rounded-3xl border-t border-[#EF4444]/20 hover:border-[#EF4444]/40 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-7 h-7 text-[#EF4444]" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">La Realidad del Club</h3>
            <p className="text-[#D1D5DB] font-light leading-relaxed mb-4">
              Las mañanas y mediodías son estructuralmente problemáticos.
            </p>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
              <XCircle className="w-6 h-6 text-[#EF4444] shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">Horas Valle:</strong> Mantener infraestructura abierta con <strong>0€ de retorno</strong> mientras los costes fijos operan al 100%.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border-t border-white/10 hover:border-white/20 transition-colors group relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-display text-white mb-3">El Límite del Jugador</h3>
            <p className="text-[#D1D5DB] font-light leading-relaxed mb-4">
              La fricción social para organizar un partido es cada vez mayor.
            </p>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
              <XCircle className="w-6 h-6 text-gray-500 shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">El Jugador Individual:</strong> Es casi imposible coordinar a 4 personas expertas en pleno horario laboral.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClubProblemSection;
