import React from 'react';
import { Smartphone, Database, Lock, Wifi } from 'lucide-react';

const LockerSoftwareSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="software">
      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <div className="text-volea-green text-sm font-bold tracking-[0.4em] mb-6 uppercase">LA INTELIGENCIA DEL SISTEMA</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            Usted pone el Acero. <br />
            Nosotros el <span className="text-volea-green">Cerebro</span>.
          </h2>
          <p className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Eliminamos la complejidad del software. Nuestro OS se integra nativamente con sus cerraduras electrónicas, proporcionando una experiencia de usuario 100% digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Control vía App</h4>
            <p className="text-gray-500 text-sm font-light">Apertura instantánea mediante BLE o QR. Sin teclados físicos ni llaves.</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Analytics en Vivo</h4>
            <p className="text-gray-500 text-sm font-light">Datos reales de uso, apertura y ocupación para optimizar la operativa.</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Seguridad Encriptada</h4>
            <p className="text-gray-500 text-sm font-light">Protocolos bancarios de comunicación entre el servidor y el locker.</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 hover:border-volea-green/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-volea-green/5 border border-volea-green/10 flex items-center justify-center text-volea-green mb-8 group-hover:bg-volea-green group-hover:text-black transition-all">
              <Wifi className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Soporte Remoto</h4>
            <p className="text-gray-500 text-sm font-light">Actualizaciones OTA (Over-the-Air) para mejorar el firmware sin visitas.</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LockerSoftwareSection;
