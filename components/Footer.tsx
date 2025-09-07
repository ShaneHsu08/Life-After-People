import React from 'react';
import type { TranslationSet } from '../types';
import { GithubIcon, XIcon, YoutubeIcon } from './icons/SocialIcons';

interface FooterProps {
    translations: TranslationSet;
    setPage: (page: 'main' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, setPage }) => {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-black/10 dark:border-white/10">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="text-center md:text-left text-sm text-text-secondary-light dark:text-text-secondary-dark">
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
                        <div className="flex items-center space-x-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            <button onClick={() => setPage('privacy')} className="hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">{translations.footerPrivacy}</button>
                            <button onClick={() => setPage('terms')} className="hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors">{translations.footerTerms}</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;