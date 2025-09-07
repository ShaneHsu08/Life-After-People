import React from 'react';
import type { TranslationSet } from '../types';

interface HeroProps {
    translations: TranslationSet;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
    return (
        <section className="text-center py-16 md:py-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                {translations.mainTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                {translations.mainSubtitle}
            </p>
        </section>
    );
};

export default Hero;