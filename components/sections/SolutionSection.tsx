import React from 'react';
import { SmartphoneIcon } from '../icons/SmartphoneIcon';
import { QrCodeIcon } from '../icons/QrCodeIcon';
import { PadelBallIcon } from '../icons/PadelBallIcon';

const Step: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-6">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 text-[#3BFF76] bg-[#3BFF76]/10 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-bold mb-1 text-white tracking-wider">{title}</h3>
            <p className="text-[#B0B0B0] font-light">{children}</p>
        </div>
    </div>
);


const SolutionSection: React.FC = () => {
  return (
    <section id="solucion" className="py-16 sm:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">Entrenar nunca fue tan fácil.</h2>
          <p className="text-lg text-[#B0B0B0] mt-4 font-light">Simplicidad absoluta, cero fricción.</p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <Step icon={<SmartphoneIcon />} title="RESERVA (APP)">
            Abre la app Padel GO. Elige tu club y hora. Tan fácil como reservar una pista.
          </Step>
          <Step icon={<QrCodeIcon />} title="DESBLOQUEA (LOCKER)">
            Escanea el código QR en nuestro locker inteligente. Se abre. La máquina está lista y cargada.
          </Step>
          <Step icon={<PadelBallIcon />} title="ENTRENA (PISTA)">
            Llévatela a la pista y enfócate 100% en mejorar tu técnica. Sin perder un segundo.
          </Step>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;