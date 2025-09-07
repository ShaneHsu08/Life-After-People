import React from 'react';
import type { TranslationSet } from '../types';
import LegalPageLayout from './LegalPageLayout';

interface PrivacyPolicyProps {
    translations: TranslationSet;
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ translations, onBack }) => {
    return (
        <LegalPageLayout 
            title={translations.privacyTitle}
            content={translations.privacyContent}
            onBack={onBack}
            backText={translations.backToHome}
        />
    );
};

export default PrivacyPolicy;
