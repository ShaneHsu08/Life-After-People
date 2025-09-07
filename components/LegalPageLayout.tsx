import React from 'react';
import type { LegalContentSection } from '../types';

interface LegalPageLayoutProps {
    title: string;
    content: LegalContentSection[];
    onBack: () => void;
    backText: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, content, onBack, backText }) => {
    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-in">
            <button
                onClick={onBack}
                className="mb-8 text-sm font-semibold text-accent dark:text-accent-dark hover:underline flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {backText}
            </button>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-8 border-b border-black/20 dark:border-white/20 pb-4 font-heading uppercase tracking-wider">
                {title}
            </h2>
            <div className="space-y-6 text-text-secondary-light dark:text-text-secondary-dark">
                {content.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2 font-heading tracking-wide">
                            {section.heading}
                        </h3>
                        <p className="leading-relaxed">
                            {section.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegalPageLayout;