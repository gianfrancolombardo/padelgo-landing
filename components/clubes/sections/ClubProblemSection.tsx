import React from 'react';
import { Clock, Users, XCircle, Zap } from 'lucide-react';

const ClubProblemSection: React.FC = () => {
  return (
    <section id="problema" className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF4444]/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-volea-green/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4 tracking-wide">EL <span className="text-[#EF4444]">DESAFÍO</span> DE LOS CLUBES ACTUAL</h2>
          <p className="text-[#D1D5DB] max-w-2xl mx-auto text-lg font-light">
            Los deportes de raqueta están evolucionando. La forma de rentabilizar tu club, también.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          
          {/* Card 1: La Realidad del Club */}
          <div className="glass-card p-8 rounded-3xl border-t border-[#EF4444]/20 hover:border-[#EF4444]/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-[#EF4444]" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">La Realidad del Club</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                Las mañanas y mediodías son estructuralmente problemáticos.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 mt-auto">
              <XCircle className="w-6 h-6 text-[#EF4444] shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">Horas Valle:</strong> Mantener la infraestructura abierta con <strong>0€ de retorno</strong> mientras los costes fijos operan al 100%.
              </p>
            </div>
          </div>

          {/* Card 2: El Límite del Jugador */}
          <div className="glass-card p-8 rounded-3xl border-t border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">El Límite del Jugador</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                La fricción social para organizar un partido o entreno existe.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 mt-auto">
              <XCircle className="w-6 h-6 text-gray-500 shrink-0 mt-1" />
              <p className="text-sm text-gray-400">
                <strong className="text-gray-200">El Jugador Individual:</strong> Es difícil coordinar a 4 personas en pleno horario laboral.
              </p>
            </div>
          </div>

          {/* Card 3: La Competencia No Para */}
          <div className="glass-card p-8 rounded-3xl border-t border-volea-green/20 hover:border-volea-green/40 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-volea-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-volea-green" />
              </div>
              <h3 className="text-2xl font-display text-white mb-3">LA COMPETENCIA NO PARA</h3>
              <p className="text-[#D1D5DB] font-light leading-relaxed mb-6">
                Los clubes que se modernicen ahora van a captar a ese jugador. Los que esperen, lo van a perder.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-volea-green/5 border border-volea-green/10 mt-auto">
              <Zap className="w-6 h-6 text-volea-green shrink-0 mt-1 animate-pulse-slow" />
              <p className="text-sm text-gray-400">
                <strong className="text-volea-green">Lidera el cambio:</strong> Ofrece la primera experiencia autónoma de Barcelona.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClubProblemSection;
