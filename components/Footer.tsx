import React from 'react';
import type { TranslationSet } from '../types';

interface FooterProps {
    translations: TranslationSet;
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
    return (
        <footer className="text-center p-6 mt-12 bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400">
            <p>{translations.footerText}</p>
        </footer>
    );
};

export default Footer;