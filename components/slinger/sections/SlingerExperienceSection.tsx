import React from 'react';
import { Smartphone, Unlock, Activity } from 'lucide-react';

const SlingerExperienceSection: React.FC = () => {
  const steps = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      number: "01",
      title: "Reserva (App)",
      description: "El jugador elige su pista y horario. La sesión de Slinger está asegurada en tan solo 3 clics desde su propio smartphone.",
    },
    {
      icon: <Unlock className="w-7 h-7" />,
      number: "02",
      title: "Desbloquea (IoT)",
      description: "Al llegar, escanea el QR a pie de pista. El locker se abre automáticamente. Sin trámites, colas ni intervención humana.",
    },
    {
      icon: <Activity className="w-7 h-7" />,
      number: "03",
      title: "Entrena (Guiado)",
      description: "Su Slinger está lista para usar. Puede seguir sesiones guiadas en la App para maximizar la eficacia de su técnica.",
    }
  ];

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="experiencia">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-volea-green/20 to-transparent"></div>
      
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">MISIÓN ZERO FRICCIÓN</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            De la App a la pista en segundos
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Hemos diseñado un ecosistema automatizado que elimina todas las barreras operativas, permitiendo que el entrenamiento sea tan sencillo como reservar una pista.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line for Desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[70%] w-[60%] h-[1px] bg-gradient-to-r from-volea-green/40 via-volea-green/10 to-transparent z-0"></div>
              )}
              
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 relative z-10 h-full hover:border-volea-green/40 transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-b from-white/[0.03] to-transparent">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-20 h-20 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-white group-hover:text-volea-green group-hover:bg-volea-green/10 group-hover:scale-110 transition-all duration-500 shadow-[20px_20px_40px_rgba(0,0,0,0.3)]">
                    {step.icon}
                  </div>
                  <span className="text-6xl font-display font-bold text-white/[0.03] group-hover:text-volea-green/10 transition-colors duration-500 select-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-volea-green transition-colors">{step.title}</h3>
                <p className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SlingerExperienceSection;
