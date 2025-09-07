import React, { useState, useCallback, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { generateFutureImage, generateVideoScript, analyzeImage } from '../services/geminiService';
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
    const [videoScript, setVideoScript] = useState<string | null>(null);
    const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [imageDescription, setImageDescription] = useState<string | null>(null);
    const [isZipping, setIsZipping] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entries[0].target);
                }
            },
            { threshold: 0.1 }
        );
    
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
    
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const analyzeUploadedImage = async (imageData: { type: string; data: string }) => {
        try {
            const description = await analyzeImage(imageData);
            setImageDescription(description);
        } catch (error) {
            console.error("Image analysis failed:", error);
            setImageDescription(""); // Set to empty string on failure so it doesn't block
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreviewUrl(result);
            const base64String = result.split(',')[1];
            const newImageData = {
                type: file.type,
                data: base64String
            };
            setUploadedImageData(newImageData);
            setGeneratedImages([]);
            setError(null);
            setGenerationProgress(null);
            setVideoScript(null);
            setIsGeneratingScript(false);
            setIsCopied(false);
            setImageDescription(null); // Reset description on new image

            analyzeUploadedImage(newImageData); // Trigger analysis
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
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

    const handleCopyScript = useCallback(() => {
        if (videoScript) {
            navigator.clipboard.writeText(videoScript).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    }, [videoScript]);

    const handleGenerateClick = useCallback(async () => {
        if (!uploadedImageData) return;

        setIsLoading(true);
        setIsGeneratingScript(false);
        setError(null);
        setGeneratedImages([]);
        setVideoScript(null);
        setGenerationProgress(null);
        setIsCopied(false);

        let allImagesGenerated = false;

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
            
            const newImages = [];
            for (const [index, gen] of generations.entries()) {
                setGenerationProgress(`Generating ${index + 1}/${generations.length}: ${gen.label}`);
                const imageUrl = await generateFutureImage(gen.prompt, uploadedImageData);
                newImages.push({ label: gen.label, url: imageUrl });
                setGeneratedImages([...newImages]);
            }
            allImagesGenerated = true;

        } catch (err) {
            console.error(err);
            setError(translations.genError);
        } finally {
            setIsLoading(false);
            setGenerationProgress(null);
        }

        if (allImagesGenerated) {
            try {
                setIsGeneratingScript(true);
                const script = await generateVideoScript(language, imageDescription);
                setVideoScript(script);
            } catch (err) {
                console.error(err);
                setError('Failed to generate video script, but your images are ready!');
            } finally {
                setIsGeneratingScript(false);
            }
        }
    }, [uploadedImageData, translations, language, imageDescription]);
    
    const handleDownloadAll = async () => {
        if (generatedImages.length === 0 || !videoScript || !uploadedImageData) return;

        setIsZipping(true);
        setError(null);

        try {
            const zip = new JSZip();

            // Add script file
            zip.file("script.txt", videoScript);

            // Add original image file
            const extension = uploadedImageData.type.split('/')[1] || 'png';
            const originalFileName = `original_image.${extension}`;
            zip.file(originalFileName, uploadedImageData.data, { base64: true });

            // Add image files
            for (let i = 0; i < generatedImages.length; i++) {
                const image = generatedImages[i];
                const fileName = `image_${i + 1}_${image.label.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
                const base64Data = image.url.split(',')[1];
                zip.file(fileName, base64Data, { base64: true });
            }

            const content = await zip.generateAsync({ type: "blob" });
            
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = "life-after-people.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (err) {
            console.error("Failed to create zip file", err);
            setError("Could not create the zip file. Please try again.");
        } finally {
            setIsZipping(false);
        }
    };

    const ActionButton: React.FC<{ onClick?: () => void; children: React.ReactNode; as?: 'label'; htmlFor?: string; }> = ({ onClick, children, as, htmlFor }) => {
        const commonClasses = "cursor-pointer bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark font-semibold py-2 px-6 border border-black/20 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 transition-all duration-300 transform hover:scale-105 text-center";
        if (as === 'label') {
            return <label htmlFor={htmlFor} className={commonClasses}>{children}</label>;
        }
        return <button onClick={onClick} className={commonClasses}>{children}</button>;
    };

    return (
        <section
            ref={sectionRef}
            id="image-generation-section"
            className={`mb-16 p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg bg-gradient-to-br from-surface-light to-gray-100 dark:from-surface-dark dark:to-gray-800 bg-[length:200%_200%] animate-gradient-shift transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <h3 className="text-3xl font-bold text-center mb-2 font-heading uppercase tracking-wider">{translations.genTitle}</h3>
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-4 max-w-2xl mx-auto">
                {translations.genSubtitle}
            </p>
            <p className="text-center text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70 italic mb-6 max-w-2xl mx-auto">
                {translations.genDisclaimer}
            </p>
            <div className="flex flex-col items-center space-y-6">
                 <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <ActionButton as="label" htmlFor="image-upload">
                        {translations.genChooseImage}
                    </ActionButton>
                    <ActionButton onClick={() => setIsMapOpen(true)}>
                        {translations.genGoogleMap}
                    </ActionButton>
                 </div>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {previewUrl && (
                    <div className="w-full max-w-sm p-2 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl">
                        <img src={previewUrl} alt="Image Preview" className="max-w-full h-auto rounded-lg mx-auto" />
                    </div>
                )}
                <button
                    onClick={handleGenerateClick}
                    disabled={!uploadedImageData || isLoading || isGeneratingScript}
                    className={`bg-accent text-white font-bold py-3 px-10 rounded-full hover:bg-accent-dark disabled:bg-gray-500 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 min-w-[200px] text-lg uppercase tracking-wider font-heading ${uploadedImageData && !isLoading && !isGeneratingScript ? 'animate-pulse-subtle' : ''}`}
                >
                    {(isLoading || isGeneratingScript) && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                    <span>{isLoading ? translations.genLoading : translations.genButton}</span>
                </button>
            </div>
            <div id="generation-status" className="text-center mt-4 h-10 flex items-center justify-center">
                {generationProgress && <p className="text-text-secondary-light dark:text-text-secondary-dark transition-opacity">{generationProgress}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div id="results-container" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedImages.map((image, index) => (
                    <div key={index} className="text-center animate-fade-in group">
                        <img src={image.url} className="rounded-xl shadow-md mb-2 w-full h-auto object-cover aspect-square border-2 border-black/10 dark:border-white/10 group-hover:border-accent transition-all duration-300" alt={image.label} />
                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark font-heading tracking-wide">{image.label}</h4>
                    </div>
                ))}
            </div>
            {(isGeneratingScript || videoScript) && (
                <div className="mt-12 animate-fade-in">
                    <h4 className="text-2xl font-bold text-center mb-4 font-heading uppercase tracking-wider">{translations.genVideoScriptTitle}</h4>
                    {isGeneratingScript ? (
                        <div className="flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                             <svg className="animate-spin h-5 w-5 mr-3 text-text-secondary-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             <span>{translations.genVideoScriptLoading}</span>
                        </div>
                    ) : videoScript && (
                         <div className="max-w-3xl mx-auto flex flex-col items-center">
                            <div className="relative w-full">
                                <textarea
                                    readOnly
                                    value={videoScript}
                                    className="w-full h-72 p-4 pr-24 bg-base-light dark:bg-base-dark border border-black/20 dark:border-white/20 rounded-xl text-text-secondary-light dark:text-text-secondary-dark font-sans text-sm leading-relaxed focus:ring-2 focus:ring-accent focus:outline-none resize-none"
                                    aria-label="Video Script"
                                />
                                <button
                                    onClick={handleCopyScript}
                                    disabled={isCopied}
                                    className="absolute top-6 right-6 bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/10 border border-black/20 dark:border-white/20 font-semibold py-1 px-3 text-xs rounded-full transition-colors disabled:opacity-50"
                                >
                                    {isCopied ? translations.genVideoScriptCopied : translations.genVideoScriptCopy}
                                </button>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleDownloadAll}
                                    disabled={isZipping}
                                    className="bg-accent text-white font-bold py-3 px-10 rounded-full hover:bg-accent-dark disabled:bg-gray-500 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 min-w-[200px] text-lg uppercase tracking-wider font-heading"
                                >
                                    {isZipping && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    <span>{isZipping ? translations.genZipping : translations.genDownloadAll}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
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