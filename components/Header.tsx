import React from 'react';
import type { Language, TranslationSet } from '../types';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    translations: TranslationSet;
    activeSection: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode; isActive: boolean }> = ({ href, children, isActive }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={`relative text-sm font-semibold transition-colors uppercase tracking-wider ${isActive ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'}`}
        >
            {children}
            {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"></span>}
        </a>
    );
};

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, toggleTheme, translations, activeSection }) => {
    return (
        <header className="bg-base-light/80 dark:bg-base-dark/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-text-primary-light dark:text-text-primary-dark font-heading uppercase tracking-widest">
                        {translations.headerTitle}
                    </h1>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex items-center space-x-8">
                            <NavLink href="#year" isActive={activeSection === 'year'}>{translations.navYear}</NavLink>
                            <NavLink href="#century" isActive={activeSection === 'century'}>{translations.navCentury}</NavLink>
                            <NavLink href="#millennium" isActive={activeSection === 'millennium'}>{translations.navMillennium}</NavLink>
                            <NavLink href="#future" isActive={activeSection === 'future'}>{translations.navFuture}</NavLink>
                        </div>
                        <div className="relative">
                            <select
                                id="language-selector"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="bg-transparent text-sm font-medium border border-text-secondary-light/50 dark:border-text-secondary-dark/50 rounded-full py-1.5 pl-3 pr-8 text-text-secondary-light dark:text-text-secondary-dark appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="en">EN</option>
                                <option value="zh">ZH</option>
                                <option value="ja">JA</option>
                            </select>
                        </div>
                        <button
                            onClick={toggleTheme}
                            type="button"
                            className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent rounded-full text-sm p-2"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;