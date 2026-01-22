import React from 'react';
import WaitlistForm from '../WaitlistForm';

const CtaSection: React.FC = () => {
  return (
    <section className="relative py-32 text-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-volea-green/10 to-[#050505] z-0"></div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-display font-bold leading-none mb-8">
            EL PÁDEL ESTÁ EVOLUCIONANDO. <br />
            <span className="text-volea-green">¿Y TÚ?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            Estamos cerrando acuerdos con los primeros clubes en Barcelona. <br />
            Sé el primero en probar la experiencia VoleaBox.
          </p>

          <WaitlistForm
            buttonText="QUIERO MEJORAR YA"
            microCopy="Acceso prioritario y descuento para los primeros 500 inscritos."
          />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;