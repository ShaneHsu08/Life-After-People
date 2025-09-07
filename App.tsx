import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { translations } from './constants';
import type { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageGenerator from './components/ImageGenerator';
import DecayChart from './components/DecayChart';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<Language>('en');
    const [activeSection, setActiveSection] = useState<string>('year');
    const [page, setPage] = useState<'main' | 'privacy' | 'terms'>('main');

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const handleScroll = useCallback(() => {
        if (page !== 'main') return;

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
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const currentTranslations = useMemo(() => translations[language], [language]);
    
    const renderContent = () => {
        switch(page) {
            case 'privacy':
                return <PrivacyPolicy translations={currentTranslations} onBack={() => setPage('main')} />;
            case 'terms':
                return <TermsOfUse translations={currentTranslations} onBack={() => setPage('main')} />;
            case 'main':
            default:
                return (
                    <>
                        <Hero translations={currentTranslations} />
                        <ImageGenerator translations={currentTranslations} language={language} />
                        <DecayChart translations={currentTranslations} theme={theme} activeSection={activeSection} />
                        <Timeline translations={currentTranslations} />
                    </>
                );
        }
    };

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
                {renderContent()}
            </main>
            <Footer translations={currentTranslations} setPage={setPage} />
        </div>
    );
};

export default App;
