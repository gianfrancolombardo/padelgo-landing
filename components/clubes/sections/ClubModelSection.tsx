import React from 'react';
import { Scale, Settings } from 'lucide-react';

const ClubModelSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#020202] relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display text-white tracking-wide mb-6">
            EL <span className="text-volea-green">TRATO</span>
          </h2>
          <p className="text-lg text-[#D1D5DB] font-light">
            Diseñado para que tu club solo tenga que ganar. Sin ataduras, sin cuotas ocultas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          
          {/* Card 1: El Trato Justo */}
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group">
            <div className="w-full h-1 bg-white/10 absolute top-0 left-0 transition-colors group-hover:bg-white/30"></div>
            <Scale className="w-8 h-8 text-volea-green mb-6" />
            <h3 className="text-2xl font-display text-white mb-3">El Trato Justo</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              Cedes tan solo 2m² en pista. VoleaBox pone el hardware, software, seguro y el mantenimiento de forma continua.
            </p>
          </div>

          {/* Card 2: 0€ Inversión */}
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden bg-volea-green/5 border-volea-green/20 group">
            <div className="absolute inset-0 bg-gradient-to-b from-volea-green/5 to-transparent pointer-events-none"></div>
            <div className="w-full h-1 bg-volea-green absolute top-0 left-0 shadow-[0_0_10px_rgba(59,255,118,0.8)]"></div>
            <Settings className="w-8 h-8 text-volea-green mb-6" />
            <h3 className="text-2xl font-display text-white mb-3">0€ Inversión</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              Sin cuotas de entrada ni cuotas mensuales. El riesgo es exclusivamente nuestro: si la máquina no se usa, a tu club no le cuesta un solo euro.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClubModelSection;
