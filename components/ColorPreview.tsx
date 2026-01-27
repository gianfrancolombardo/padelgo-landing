import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, Menu, X } from 'lucide-react';

// Simplified version of the Hero for preview
const ThemedHero: React.FC<{
    name: string;
    primary: string;
    bg: string;
    secondary: string;
    text: string;
    muted: string;
}> = ({ name, primary, bg, secondary, text, muted }) => {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/10"
            style={{ backgroundColor: bg, color: text }}
        >
            {/* Label for the theme */}
            <div className="absolute top-8 left-8 z-50 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest">
                THEME: {name.toUpperCase()}
            </div>

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero-court.png"
                    alt="Futuristic Padel Court"
                    className="w-full h-full object-cover opacity-60 grayscale"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to top, ${bg} 0%, ${bg}70 70%, transparent 100%)`
                    }}
                ></div>
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, ${bg}80 0%, transparent 100%)`
                    }}
                ></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1
                        className="text-5xl md:text-7xl font-bold leading-none mb-8"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        TU TÉCNICA <br />
                        <span style={{ color: primary }}>NO MEJORA</span> JUGANDO
                    </h1>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide" style={{ color: muted }}>
                        La primera red de máquinas de bolas 100% automatizadas.
                        <br className="hidden md:block" />Reserva en tu club y entrena como un pro.
                    </p>

                    <div className="max-w-lg mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                className="flex-grow w-full px-6 py-4 text-base bg-white/5 border rounded-full focus:outline-none transition-all placeholder:text-gray-600 backdrop-blur-sm"
                                style={{ borderColor: `${text}20`, color: text }}
                            />

                            <button
                                className="font-bold tracking-wide text-base px-8 py-4 rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: primary,
                                    color: bg,
                                    boxShadow: `0 0 20px ${primary}40`
                                }}
                            >
                                <span>ÚNETE A LA REVOLUCIÓN</span>
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                        <p className="text-xs mt-4 font-light opacity-50 uppercase tracking-widest">
                            Acceso exclusivo para early adopters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ColorPreview: React.FC = () => {
    const themes = [
        {
            name: "Midnight & Champagne",
            primary: "#E6C9A2",
            bg: "#0A0D14",
            secondary: "#161B26",
            text: "#F8FAFC",
            muted: "#94A3B8"
        },
        {
            name: "Electric Indigo & Obsidian",
            primary: "#818CF8",
            bg: "#050505",
            secondary: "#121212",
            text: "#FAFAFA",
            muted: "#D1D5DB"
        },
        {
            name: "Emerald & Copper",
            primary: "#FB923C",
            bg: "#061C14",
            secondary: "#0B261D",
            text: "#E2E8F0",
            muted: "#94A3B8"
        }
    ];

    return (
        <div className="w-full">
            <div className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl p-4 flex justify-between items-center border-b border-white/10">
                <h2 className="font-display text-xl tracking-widest text-white">VOLEABOX <span className="text-gray-500">COLOR LAB</span></h2>
                <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">VOLVER A LA LANDING</a>
            </div>

            {themes.map((theme, index) => (
                <ThemedHero key={index} {...theme} />
            ))}

            <div className="bg-black text-white p-20 text-center">
                <h3 className="text-3xl font-display mb-6">¿CUÁL PREFIERES?</h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-12">
                    Estas combinaciones han sido diseñadas para elevar la percepción de marca y ser atractivas para todos los jugadores de pádel, manteniendo el espíritu tecnológico.
                </p>
                <div className="flex justify-center gap-4">
                    {themes.map((theme, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full border border-white/20" style={{ backgroundColor: theme.primary }}></div>
                            <span className="text-xs text-gray-500">{theme.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPreview;
