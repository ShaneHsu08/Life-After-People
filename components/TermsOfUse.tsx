import React from 'react';
import type { TranslationSet } from '../types';
import LegalPageLayout from './LegalPageLayout';

interface TermsOfUseProps {
    translations: TranslationSet;
    onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ translations, onBack }) => {
    return (
        <LegalPageLayout 
            title={translations.termsTitle}
            content={translations.termsContent}
            onBack={onBack}
            backText={translations.backToHome}
        />
    );
};

export default TermsOfUse;
