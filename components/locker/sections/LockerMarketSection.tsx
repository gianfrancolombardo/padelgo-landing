import React from 'react';
import { TrendingUp, Users, MapPin } from 'lucide-react';

const LockerMarketSection: React.FC = () => {
  const stats = [
    {
      icon: <MapPin className="w-6 h-6" />,
      value: "20.000+",
      label: "Pistas en España",
      desc: "El mercado con mayor densidad de pistas de pádel del mundo."
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "4M+",
      label: "Jugadores Activos",
      desc: "Una masa crítica que demanda soluciones de almacenamiento diarias."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "35%",
      label: "Crecimiento de Alquiler",
      desc: "Incremento anual en el uso de servicios autónomos en clubes."
    }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="mercado">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div>
            <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">EL MERCADO DE LA OPORTUNIDAD</div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              El Pádel: El mayor banco de pruebas para su <span className="text-volea-green">Hardware</span>
            </h2>
            <p className="text-[#A1A1AA] text-lg font-light leading-relaxed mb-10">
              VoleaBox ha identificado un cuello de botella logístico en los clubes más prestigiosos. Los jugadores necesitan un lugar seguro, inteligente y tecnificado donde interactuar con su equipamiento de élite.
            </p>
            <div className="glass p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-volea-green/5 to-transparent">
              <p className="text-white italic font-light text-lg">
                "No buscamos un proveedor de metal, buscamos un socio de ingeniería que entienda el valor de la modularidad y la durabilidad en exterior."
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-volea-green/20 transition-all duration-500 group flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-volea-green group-hover:bg-volea-green group-hover:text-black transition-all duration-300 shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-volea-green text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-light mt-1">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LockerMarketSection;
