import React from 'react';
import { Smartphone, QrCode, Activity } from 'lucide-react';

const SolutionStep: React.FC<{ icon: React.ReactNode; title: string; desc: string; image: string; delay: string }> = ({ icon, title, desc, image, delay }) => (
  <div className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-volea-green/30 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,255,118,0.05)]" style={{ animationDelay: delay }}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>

    {/* Image Background with zoom effect */}
    <div className="h-48 md:h-64 overflow-hidden relative z-0">
      <div className="absolute inset-0 bg-volea-green/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
    </div>

    {/* Content */}
    <div className="relative z-20 p-6 flex flex-col flex-grow bg-[#0A0A0A]">
      <div className="absolute -top-10 left-6 w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-volea-green shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:border-volea-green/30 group-hover:bg-volea-green/5">
        {icon}
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-volea-green transition-colors">{title}</h3>
        <p className="text-gray-400 font-light text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const SolutionSection: React.FC = () => {
  return (
    <section id="solucion" className="py-24 bg-[#050505] scroll-mt-20 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            EL PROCESO <span className="text-volea-green">VOLEABOX</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">
            Lo hemos simplificado en 3 pasos para que no pierdas ni un minuto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <SolutionStep
            icon={<Smartphone size={32} strokeWidth={1.5} />}
            title="1. RESERVA"
            desc="Abre la app, elige tu hora y tu pista. En 3 clics tienes la sesión asegurada. Además, accede a los vídeos de los drills antes de llegar a la pista para que cuando llegues, ya sepas exactamente qué hacer."
            image="/assets/app-reservation.png"
            delay="0s"
          />
          <SolutionStep
            icon={<QrCode size={32} strokeWidth={1.5} />}
            title="2. DESBLOQUEA"
            desc="Escanea el código QR en la taquilla a pie de pista. Se abre sola y la máquina junto con todo el equipo de entrenamiento están listos para ti."
            image="/assets/locker-system.png"
            delay="0.1s"
          />
          <SolutionStep
            icon={<Activity size={32} strokeWidth={1.5} />}
            title="3. ENTRENA"
            desc="Configura tu sesión y mejora tu técnica sin distracciones ni esperas. Cientos de repeticiones en una sola hora."
            image="/assets/hero-court.png" // Reusing hero court for 'Train' generic visual if action shot is used elsewhere
            delay="0.2s"
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;