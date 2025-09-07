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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                {title}
            </h2>
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
                {content.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
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
