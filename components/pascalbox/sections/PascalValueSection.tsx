import React from 'react';
import { Target, BarChart3, Recycle } from 'lucide-react';

const PascalValueSection: React.FC = () => {
  return (
    <section id="vision" className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-8 tracking-wide">POR QUÉ TIENE SENTIDO PARA <span className="text-volea-green">PASCAL BOX</span></h2>
          <p className="text-lg md:text-xl text-[#D1D5DB] font-light leading-relaxed">
            VoleaBox no es solo una taquilla a pie de pista. Es el motor que hace viable y escalable tu modelo de sostenibilidad donde más importa: en la pista, con el jugador delante.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Item 1 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Target className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">El Problema que conoces bien</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              El modelo de usar y tirar no tiene futuro en clubes con cientos de sesiones semanales. La integración del Pascal Box PRO XL en nuestra red garantiza que cada pelota llegue al jugador en condiciones reglamentarias, sesión tras sesión.
            </p>
          </div>

          {/* Item 2 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <BarChart3 className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">Tu mayor escaparate físico</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              Cada sesión VoleaBox es una demostración activa y pagada de tu tecnología. No un catálogo, no una feria. Un entorno real de uso intensivo, con jugadores reales y datos reales de rendimiento.
            </p>
          </div>

          {/* Item 3 */}
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <Recycle className="w-7 h-7 text-volea-green" />
            </div>
            <h3 className="text-2xl font-display text-white">Impacto sostenible medible</h3>
            <p className="text-[#D1D5DB] font-light text-sm leading-relaxed">
              Eliminamos el desperdicio de caucho de forma estructural. Tus pelotas duran entre 6 y 9 meses presurizadas, frente a los 2 o 3 partidos del modelo tradicional sin presurización. Eso es una historia que podemos contar juntos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PascalValueSection;
