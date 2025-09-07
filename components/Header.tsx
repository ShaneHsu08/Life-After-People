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
            className={`text-sm transition-colors ${isActive ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white'}`}
        >
            {children}
        </a>
    );
};

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, toggleTheme, translations, activeSection }) => {
    return (
        <header className="bg-white/80 dark:bg-black/50 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {translations.headerTitle}
                    </h1>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="hidden md:flex items-center space-x-6">
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
                                className="bg-white/0 dark:bg-black/0 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full py-1.5 pl-3 pr-8 text-gray-700 dark:text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="en">EN</option>
                                <option value="zh">ZH</option>
                                <option value="ja">JA</option>
                            </select>
                        </div>
                        <button
                            onClick={toggleTheme}
                            type="button"
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent rounded-full text-sm p-2"
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