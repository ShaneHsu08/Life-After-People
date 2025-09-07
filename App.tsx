import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { translations } from './constants';
import type { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageGenerator from './components/ImageGenerator';
import DecayChart from './components/DecayChart';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<Language>('en');
    const [activeSection, setActiveSection] = useState<string>('year');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleScroll = useCallback(() => {
        const sections = ['year', 'century', 'millennium', 'future'];
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let currentSection = '';
        for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element && scrollPosition >= element.offsetTop) {
                currentSection = sectionId;
            }
        }
        setActiveSection(currentSection);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const currentTranslations = useMemo(() => translations[language], [language]);

    return (
        <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                toggleTheme={toggleTheme}
                translations={currentTranslations}
                activeSection={activeSection}
            />
            <main className="container mx-auto p-4 md:p-8">
                <Hero translations={currentTranslations} />
                <ImageGenerator translations={currentTranslations} language={language} />
                <DecayChart translations={currentTranslations} theme={theme} activeSection={activeSection} />
                <Timeline translations={currentTranslations} />
            </main>
            <Footer translations={currentTranslations} />
        </div>
    );
};

export default App;