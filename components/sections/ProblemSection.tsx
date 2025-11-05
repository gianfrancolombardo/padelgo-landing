import React from 'react';
import { TruckIcon } from '../icons/ClockIcon';
import { WalletIcon } from '../icons/WalletIcon';
import { TrendingDownIcon } from '../icons/ChartDownIcon';

const PainPoint: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-[#2a2d2a] p-8 rounded-lg border border-[#444] text-center flex flex-col items-center transition-transform transform hover:-translate-y-2">
    <div className="mb-5 flex items-center justify-center h-16 w-16 text-[#3BFF76] bg-[#3BFF76]/10 rounded-full">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-2 text-white tracking-wider">{title}</h3>
    <p className="text-[#B0B0B0] font-light">{children}</p>
  </div>
);

const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-16 sm:py-24 bg-[#222522] scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">Sabemos lo que se siente.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PainPoint icon={<TruckIcon />} title="LOGÍSTICA INVIABLE">
            Pierdes medio día buscando en Wallapop, contactando, recogiendo y devolviendo una máquina. "No compensa".
          </PainPoint>
          <PainPoint icon={<WalletIcon />} title="CLASES PRIVADAS PROHIBITIVAS">
            Quieres mejorar, pero pagar 89€/mes por una sola clase semanal es un lujo que no te puedes permitir.
          </PainPoint>
          <PainPoint icon={<TrendingDownIcon />} title="ESTANCAMIENTO TOTAL">
            Juegas 3 veces por semana, pero sigues fallando los mismos golpes. Sientes que no avanzas.
          </PainPoint>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;