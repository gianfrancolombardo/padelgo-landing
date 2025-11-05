import React from 'react';
import WaitlistForm from '../WaitlistForm';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 text-center bg-gradient-to-t from-[#222522] to-[#1A1D1A]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            El pádel está evolucionando. <span className="text-[#3BFF76]">¿Y tú?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto mb-8 font-light">
            Estamos cerrando acuerdos con los primeros clubes en Barcelona. Introduce tu email y sé el primero en saber cuándo Padel GO llega a tu club (y accede a un descuento de lanzamiento).
          </p>
          <WaitlistForm 
            buttonText="QUIERO MEJORAR YA"
            microCopy="Acceso prioritario y descuento para los primeros."
          />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;