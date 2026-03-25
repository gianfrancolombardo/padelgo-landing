import React from 'react';
import { CalendarClock, MapPin, Globe } from 'lucide-react';

const SlingerRoadmapSection: React.FC = () => {
  const roadmap = [
    {
      quarter: "Q1 2026",
      title: "Fase Piloto Activa",
      description: "Despliegue inicial y validación operativa en diversos clubes premium en Barcelona para optimizar la retención y recurrencia de usuarios.",
      icon: <CalendarClock className="w-5 h-5" />,
      status: "active"
    },
    {
      quarter: "Q2 2026",
      title: "Estandarización Exclusiva",
      description: "Renovación unificada de la flota. Integración de la Slinger Bag como núcleo del equipamiento VoleaBox a exclusividad nacional.",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming"
    },
    {
      quarter: "Q3 - Q4 2026",
      title: "Expansión Nacional",
      description: "Despliegue masivo del ecosistema VoleaBox en los 100 mejores clubes de España, convirtiéndose en el showroom físico interactivo más potente del país.",
      icon: <Globe className="w-5 h-5" />,
      status: "future"
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="roadmap">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">ROADMAP DE TRACCIÓN</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            Estandarización 2026
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Un calendario estratégico diseñado para capitalizar la validación actual y escalar hacia el liderazgo absoluto del entrenamiento autónomo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-volea-green/40 via-white/10 to-transparent -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 md:space-y-0">
            {roadmap.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center relative">
                
                {/* Content Side */}
                <div className={`order-2 ${index % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'} glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-white/10 transition-all duration-500 bg-gradient-to-br from-white/[0.01] to-transparent z-10 my-4`}>
                  {item.status === 'active' && (
                     <div className={`absolute top-6 ${index % 2 === 0 ? 'right-6' : 'left-6'} transform flex h-2 w-2`}>
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volea-green opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-volea-green"></span>
                     </div>
                  )}
                  <div className="text-volea-green font-display text-xs mb-4 tracking-[0.3em] font-black uppercase">{item.quarter}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-volea-green transition-colors">{item.title}</h3>
                  <p className="text-[#A1A1AA] font-light leading-relaxed text-base md:text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Center Node */}
                <div className="order-1 md:order-2 flex justify-center z-20">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a0a0a] border-[6px] md:border-[8px] border-[#050505] items-center justify-center flex shadow-2xl">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex flex-col items-center justify-center ${item.status === 'active' ? 'bg-volea-green text-[#050505] shadow-[0_0_20px_rgba(59,255,118,0.4)]' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                      {item.icon}
                    </div>
                  </div>
                </div>

                {/* Empty Side for balance on desktop */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'order-3' : 'order-1'}`}></div>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SlingerRoadmapSection;
