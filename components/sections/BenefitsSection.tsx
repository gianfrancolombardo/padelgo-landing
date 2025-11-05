import React from 'react';
import { CheckCircleIcon } from '../icons/CheckIcon';

const BenefitItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1 text-[#3BFF76]">
            <CheckCircleIcon />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white tracking-wider">{title}</h3>
            <p className="text-[#B0B0B0] font-light">{children}</p>
        </div>
    </div>
);

const BenefitsSection: React.FC = () => {
    return (
        <section id="beneficios" className="py-16 sm:py-24 bg-[#222522] scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-bold leading-tight">Deja de jugar. <br />Empieza a competir.</h2>
                    </div>
                    <div className="flex flex-col gap-8">
                        <BenefitItem title="MEJORA REAL">
                            Automatiza tus golpes. Repite esa bandeja 100 veces seguidas. Gana la confianza que te falta en los partidos.
                        </BenefitItem>
                        <BenefitItem title="FRICCIÓN CERO">
                            Tu tiempo vale oro. Úsalo para entrenar, no para hacer logística.
                        </BenefitItem>
                        <BenefitItem title="A TU RITMO">
                            Entrena solo, cuando te va bien. Aprovecha esas horas valle (mañanas, mediodía) sin depender de nadie.
                        </BenefitItem>
                        <BenefitItem title="ACCESO PREMIUM">
                            El poder de un entrenamiento técnico de élite, por una fracción del coste de un entrenador privado.
                        </BenefitItem>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;