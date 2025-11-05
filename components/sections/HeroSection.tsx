import React from 'react';
import WaitlistForm from '../WaitlistForm';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-28 md:pt-32 md:pb-40 text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Tu técnica no mejora solo jugando partidos.
          </h1>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto mb-12 font-light">
            La primera red de máquinas lanza pelotas 100% automatizadas. Reserva en 2 minutos desde tu móvil y entrena al instante en tu club.
          </p>
          <WaitlistForm 
            buttonText={<>ÚNETE A LA REVOLUCIÓN<br/>(WAITLIST)</>}
            microCopy="Sin spam. Te avisaremos cuando lleguemos a tu club."
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;