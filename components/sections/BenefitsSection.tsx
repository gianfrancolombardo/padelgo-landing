import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const BenefitItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-500 group">
        <div className="text-volea-green group-hover:scale-110 transition-transform duration-300 origin-left">
            <CheckCircle2 size={32} strokeWidth={1.5} />
        </div>
        <div>
            <h3 className="text-2xl font-display uppercase tracking-wider text-white mb-2 group-hover:text-volea-green transition-colors">{title}</h3>
            <p className="text-gray-300 font-light leading-relaxed">{children}</p>
        </div>
    </div>
);

const BenefitsSection: React.FC = () => {
    return (
        <section id="beneficios" className="py-24 bg-[#080808] border-t border-white/5 scroll-mt-20">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center mx-auto">
                    <div>
                        <h2 className="text-4xl sm:text-6xl font-display font-bold leading-none mb-6">
                            EL SECRETO DE <br />
                            LOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-volea-green to-emerald-600">PROFESIONALES</span>.
                        </h2>
                        <p className="text-xl text-gray-300 font-light max-w-md">
                            La diferencia entre un amateur y un pro no es el talento, es la cantidad de bolas que golpean fuera de partido.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <BenefitItem title="MEJORA REAL">
                            Automatiza tus golpes. Repite esa bandeja 100 veces seguidas hasta que salga sola.
                        </BenefitItem>
                        <BenefitItem title="FRICCIÓN CERO">
                            Tu tiempo vale oro. Úsalo para entrenar, no para reservar pistas ni coordinar con nadie.
                        </BenefitItem>
                        <BenefitItem title="A TU RITMO">
                            Entrena solo, en silencio, cuando te va bien. Tu mejor terapia.
                        </BenefitItem>
                        <BenefitItem title="ACCESO PREMIUM">
                            Entrenamiento de élite por una fracción de lo que cuesta un profesor particular.
                        </BenefitItem>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;