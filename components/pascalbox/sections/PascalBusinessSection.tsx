import React from 'react';
import { BadgeCheck, Globe, ShoppingCart } from 'lucide-react';

const PascalBusinessSection: React.FC = () => {
  return (
    <section id="acuerdo" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-display text-white mb-6">EL <span className="text-volea-green">ACUERDO</span> DE VALOR</h2>
          <p className="text-lg text-[#D1D5DB] font-light max-w-2xl mx-auto">
             No solo integramos tecnología; establecemos un nuevo canal de crecimiento masivo para Pascal Box.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group">
             <BadgeCheck className="w-10 h-10 text-volea-green mb-8 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-display text-white mb-4">Branding Exclusivo</h3>
             <p className="text-sm text-gray-400 leading-relaxed font-light">
                Sello <strong className="text-white">"Powered by Pascal Box"</strong> presente en cada locker físico y en la interfaz digital de nuestra App, asociando su marca al entrenamiento de élite autónomo.
             </p>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-white/30 transition-all duration-500 group bg-white/5">
             <Globe className="w-10 h-10 text-white mb-8 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-display text-white mb-4">Exclusividad de Red</h3>
             <p className="text-sm text-gray-400 leading-relaxed font-light">
                Pascal Box será el <strong className="text-white">Único Sistema de Presurización</strong> oficial en toda nuestra red nacional e internacional, bloqueando la entrada a competidores y estandarizando su sistema.
             </p>
          </div>

          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-volea-green/30 transition-all duration-500 group">
             <ShoppingCart className="w-10 h-10 text-volea-green mb-8 group-hover:scale-110 transition-transform" />
             <h3 className="text-2xl font-display text-white mb-4">Canal Directo B2C</h3>
             <p className="text-sm text-gray-400 leading-relaxed font-light">
                Utilizamos el momento de máximo engagement (el entrenamiento) para permitir la <strong className="text-white">Compra Directa</strong> de equipos domésticos Pascal Box a través de nuestra App con un solo clic.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PascalBusinessSection;
