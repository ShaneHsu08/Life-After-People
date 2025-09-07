import React from 'react';
import type { TranslationSet } from '../types';

interface HeroProps {
    translations: TranslationSet;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
    // To use your own local image:
    // 1. Create an 'assets' folder in the root of your project.
    // 2. Place your image inside, for example: 'hero-background.jpg'.
    // 3. Then, comment out the line below that starts with `backgroundImage: "url('https://images..."`
    // 4. And uncomment the line below that starts with `// backgroundImage: "url('/assets..."`
    const heroStyle = {
        //backgroundImage: "url('https://images.unsplash.com/photo-1504918737527-366b45a0f5a7?q=80&w=2070&auto=format&fit=crop')",
        backgroundImage: "url('/assets/hero-background.jpg')",
    };

    return (
        <section 
            style={heroStyle}
            className="relative text-center py-24 md:py-40 flex items-center justify-center min-h-[60vh] rounded-2xl overflow-hidden mb-16 bg-cover bg-center"
        >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 p-4">
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