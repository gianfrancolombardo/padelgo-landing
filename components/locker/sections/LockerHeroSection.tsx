import React from 'react';
import { Cpu, ChevronDown } from 'lucide-react';

const LockerHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-volea-green/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-volea-green/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-volea-green/20 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-volea-green animate-pulse"></span>
              <span className="text-volea-green text-[10px] font-black tracking-[0.2em] uppercase">Manufacturing Partner Program</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight">
              EL FUTURO DEL <br />
              <span className="text-volea-green">SMART LOCKER</span> <br />
              COMIENZA AQUÍ
            </h1>
            
            <p className="text-xl md:text-2xl text-[#A1A1AA] font-light max-w-xl leading-relaxed">
              VoleaBox busca fabricantes de élite para escalar la mayor infraestructura de almacenamiento inteligente en el mundo del Pádel.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => document.getElementById('mercado')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-volea-green text-black px-10 py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(59,255,118,0.2)] active:scale-95"
              >
                VER PROYECCIÓN 2026
              </button>
              <div className="flex items-center gap-4 px-6 py-5 rounded-2xl glass border border-white/5">
                <Cpu className="w-5 h-5 text-volea-green" />
                <span className="text-xs text-white/60 font-medium tracking-wider">IoT NATIVE OS</span>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 group">
            <div className="absolute -inset-10 bg-volea-green/5 blur-[100px] rounded-full group-hover:bg-volea-green/10 transition-colors duration-1000"></div>
            <div className="relative glass p-4 rounded-[3.5rem] border border-white/10 shadow-2xl animate-float">
               <img 
                src="/assets/locker_hero_industrial.png" 
                alt="Premium Smart Locker Design" 
                className="w-full rounded-[2.5rem] object-cover aspect-square shadow-2xl"
              />
              <div className="absolute top-10 left-10 glass px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">Industrial Design v1.2</span>
                <span className="text-white font-display text-lg tracking-wider">MODULAR CORE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-40 z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-volea-green to-transparent animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default LockerHeroSection;
