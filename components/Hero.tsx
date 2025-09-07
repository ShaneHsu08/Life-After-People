import React from 'react';
import type { TranslationSet } from '../types';

interface HeroProps {
    translations: TranslationSet;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
    return (
        <section 
            className="relative text-center py-24 md:py-40 flex items-center justify-center min-h-[60vh] rounded-2xl overflow-hidden mb-16"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center animate-kenburns"
                style={{ backgroundImage: "url('/assets/hero-background.jpg')" }}
                aria-hidden="true"
            ></div>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 p-4 animate-fade-in">
                <h2 className="text-4xl md:text-7xl font-bold tracking-widest text-white mb-4 uppercase font-heading">
                    {translations.mainTitle}
                </h2>
                <p className="max-w-4xl mx-auto text-lg text-white/80 font-medium">
                    {translations.mainSubtitle}
                </p>
            </div>
        </section>
    );
};

export default Hero;