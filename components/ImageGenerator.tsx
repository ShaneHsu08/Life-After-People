import React, { useState, useCallback } from 'react';
import { generateFutureImage } from '../services/geminiService';
import type { TranslationSet, Language } from '../types';
import MapModal from './MapModal';

interface ImageGeneratorProps {
    translations: TranslationSet;
    language: Language;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ translations, language }) => {
    const [uploadedImageData, setUploadedImageData] = useState<{ type: string; data: string } | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<{ label: string, url: string }[]>([]);
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [generationProgress, setGenerationProgress] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreviewUrl(result);
            const base64String = result.split(',')[1];
            setUploadedImageData({
                type: file.type,
                data: base64String
            });
            setGeneratedImages([]);
            setError(null);
            setGenerationProgress(null);
        };
        reader.readAsDataURL(file);
    };

    const handleMapSelect = (imageUrl: string) => {
        fetch(imageUrl)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "street-view.jpg", { type: "image/jpeg" });
                processFile(file);
            });
        setIsMapOpen(false);
    };

    const handleGenerateClick = useCallback(async () => {
        if (!uploadedImageData) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);
        setGenerationProgress(null);
        
        try {
            const currentPrompts = translations.genPrompts;
            const currentLabels = translations.genTimeLabels;

            const generations = [
                { key: 'one', prompt: currentPrompts.one, label: currentLabels.one },
                { key: 'hundred', prompt: currentPrompts.hundred, label: currentLabels.hundred },
                { key: 'thousand', prompt: currentPrompts.thousand, label: currentLabels.thousand },
                { key: 'tenThousand', prompt: currentPrompts.tenThousand, label: currentLabels.tenThousand },
                { key: 'hundredThousand', prompt: currentPrompts.hundredThousand, label: currentLabels.hundredThousand },
                { key: 'million', prompt: currentPrompts.million, label: currentLabels.million },
            ];
            
            for (const [index, gen] of generations.entries()) {
                setGenerationProgress(`Generating ${index + 1}/${generations.length}: ${gen.label}`);
                const imageUrl = await generateFutureImage(gen.prompt, uploadedImageData);
                setGeneratedImages(prevImages => [...prevImages, { label: gen.label, url: imageUrl }]);
            }

        } catch (err) {
            console.error(err);
            setError(translations.genError);
        } finally {
            setIsLoading(false);
            setGenerationProgress(null);
        }
    }, [uploadedImageData, translations]);

    return (
        <section id="image-generation-section" className="mb-16 bg-gray-50 dark:bg-gray-950 p-6 md:p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-2">{translations.genTitle}</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
                {translations.genSubtitle}
            </p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 italic mb-6 max-w-2xl mx-auto">
                {translations.genDisclaimer}
            </p>
            <div className="flex flex-col items-center space-y-4">
                 <div className="flex items-center space-x-4">
                    <label htmlFor="image-upload" className="cursor-pointer bg-white dark:bg-gray-900 text-accent dark:text-accent-dark font-semibold py-2 px-5 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {translations.genChooseImage}
                    </label>
                    <button onClick={() => setIsMapOpen(true)} className="bg-white dark:bg-gray-900 text-accent dark:text-accent-dark font-semibold py-2 px-5 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {translations.genGoogleMap}
                    </button>
                 </div>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {previewUrl && (
                    <div className="w-full max-w-sm p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                        <img src={previewUrl} alt="Image Preview" className="max-w-full h-auto rounded-lg mx-auto" />
                    </div>
                )}
                <button
                    onClick={handleGenerateClick}
                    disabled={!uploadedImageData || isLoading}
                    className="bg-accent text-white font-bold py-2.5 px-8 rounded-full hover:opacity-90 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-opacity flex items-center justify-center space-x-2 min-w-[180px]"
                >
                    {isLoading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    <span>{isLoading ? translations.genLoading : translations.genButton}</span>
                </button>
            </div>
            <div id="generation-status" className="text-center mt-4 h-10 flex items-center justify-center">
                {generationProgress && <p className="text-gray-600 dark:text-gray-400 transition-opacity">{generationProgress}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div id="results-container" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedImages.map((image, index) => (
                    <div key={index} className="text-center animate-fade-in">
                        <img src={image.url} className="rounded-xl shadow-md mb-2 w-full h-auto object-cover aspect-square" alt={image.label} />
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{image.label}</h4>
                    </div>
                ))}
            </div>
            {isMapOpen && (
                <MapModal
                    onClose={() => setIsMapOpen(false)}
                    onSelect={handleMapSelect}
                    translations={translations}
                />
            )}
        </section>
    );
};

export default ImageGenerator;