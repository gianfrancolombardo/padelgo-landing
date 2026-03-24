import React from 'react';
import { Target, BarChart3, Recycle } from 'lucide-react';

const PascalValueSection: React.FC = () => {
  return (
    <section id="vision" className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-8 tracking-wide">LA <span className="text-volea-green">SINERGIA</span> PERFECTA</h2>
          <p className="text-lg md:text-xl text-[#D1D5DB] font-light leading-relaxed">
            VoleaBox no es solo un locker; es el motor que hace viable y escalable el modelo de sostenibilidad de Pascal Box en el centro neurálgico del deporte: la pista.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Item 1 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Target className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">El Reto del Volumen</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              El modelo "usar y tirar" no escala en clubes con miles de impactos diarios. La integración de Pascal Box PRO en nuestra flota garantiza la durabilidad del material y la rentabilidad del club.
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <BarChart3 className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">Escaparate y Banco de Pruebas</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              VoleaBox se convierte en el mayor escaparate físico para sus máquinas PRO y un laboratorio de datos en tiempo real sobre el uso y rendimiento del sistema en entornos de alta exigencia.
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Recycle className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">Impacto Ecológico</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              Eliminamos el desperdicio de caucho de manera estructural, posicionando a ambas marcas como líderes indiscutibles en la transición sostenible del deporte de raqueta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PascalValueSection;
