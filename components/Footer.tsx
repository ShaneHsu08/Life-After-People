import React from 'react';
import type { TranslationSet } from '../types';
import { GithubIcon, XIcon, YoutubeIcon } from './icons/SocialIcons';

interface FooterProps {
    translations: TranslationSet;
    setPage: (page: 'main' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, setPage }) => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
                        <p>{translations.footerText}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center space-x-6">
                            <a href="https://github.com/ShaneHsu08/Life-After-People" target="_blank" rel="noopener noreferrer" aria-label="Github" className="group">
                                <GithubIcon />
                            </a>
                            <a href="https://x.com/shenyou_x" target="_blank" rel="noopener noreferrer" aria-label="X" className="group">
                                <XIcon />
                            </a>
                            <a href="https://www.youtube.com/@shenyoux" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="group">
                                <YoutubeIcon />
                            </a>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                            <button onClick={() => setPage('privacy')} className="hover:text-gray-900 dark:hover:text-white transition-colors">{translations.footerPrivacy}</button>
                            <button onClick={() => setPage('terms')} className="hover:text-gray-900 dark:hover:text-white transition-colors">{translations.footerTerms}</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
