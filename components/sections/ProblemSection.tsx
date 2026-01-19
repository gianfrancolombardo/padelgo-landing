import React from 'react';
import { Clock, Ban, TrendingDown } from 'lucide-react';

const PainPoint: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: string }> = ({ icon, title, children, delay }) => (
  <div className="glass-card p-8 rounded-2xl flex flex-col items-start hover:bg-white/5 transition-all duration-500 transform hover:-translate-y-2 group border border-white/5 hover:border-white/10" style={{ animationDelay: delay }}>
    <div className="mb-6 flex items-center justify-center h-14 w-14 text-white/50 bg-white/5 rounded-xl border border-white/10 group-hover:text-padel-green group-hover:border-padel-green/30 group-hover:bg-padel-green/10 transition-all duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-display tracking-wider mb-3 text-white group-hover:text-padel-green transition-colors duration-300">{title}</h3>
    <p className="text-gray-300 font-light leading-relaxed group-hover:text-gray-200 transition-colors">{children}</p>
  </div>
);

const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="relative py-24 md:py-32 bg-[#050505] scroll-mt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none mix-blend-screen">
        <img
          src="/assets/action-shot.png"
          alt="Ball Machine Action"
          className="w-full h-full object-cover object-left mask-image-gradient grayscale"
          style={{ maskImage: 'linear-gradient(to right, transparent, black)' }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 leading-none">
            <span className="text-white/30">Deja de Jugar</span> Partidos.<br />
            Empieza a <span className="text-padel-green">Entrenar</span>.
          </h2>
          <p className="text-lg text-gray-300 font-light max-w-xl border-l-2 border-padel-green pl-6 py-2">
            El 90% de los jugadores amateur se estancan porque compiten más de lo que practican.
            <br /><span className="text-white/60 text-sm mt-2 block">La realidad es frustrante:</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl">
          <PainPoint icon={<Clock size={28} strokeWidth={1.5} />} title="LOGÍSTICA INVIABLE" delay="0s">
            ¿Comprar una máquina? 2.000€, cargarla en el coche, buscar enchufes... Demasiada fricción para entrenar una hora.
          </PainPoint>
          <PainPoint icon={<Ban size={28} strokeWidth={1.5} />} title="CLASES CARÍSIMAS" delay="0.1s">
            Pagar 40-50€/hora para que un profesor te tire bolas a la mano. Quieres volumen de repetición, no correcciones constantes.
          </PainPoint>
          <PainPoint icon={<TrendingDown size={28} strokeWidth={1.5} />} title="ESTANCAMIENTO" delay="0.2s">
            Juegas 3 veces por semana pero tu víbora sigue saliendo al cristal. Sin repetición aislada, no hay memoria muscular.
          </PainPoint>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;