import React, { useEffect, useRef } from 'react';
import type { TranslationSet } from '../types';

interface MapModalProps {
    onClose: () => void;
    onSelect: (imageUrl: string) => void;
    translations: TranslationSet;
}

// This declares the google object on the window, preventing TypeScript errors.
declare const google: any;

const MapModal: React.FC<MapModalProps> = ({ onClose, onSelect, translations }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const panoramaRef = useRef<any>(null);
    const apiKey = 'AIzaSyAT7p0xVIc_vmIPuhAF5ZV8z3zXzc4O-e8';

    useEffect(() => {
        if (!apiKey) {
            console.error("Google Maps API key is missing. Please ensure the GOOGLE_MAPS_API_KEY environment variable is set.");
            alert("Google Maps API key is not configured. This feature is disabled.");
            onClose();
            return;
        }

        const scriptId = 'google-maps-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            (window as any).initMap = initMap;
            document.head.appendChild(script);
        } else if (!(window as any).google) {
            // If script exists but google object not ready, wait a bit
            const timeout = setTimeout(() => (window as any).initMap(), 500);
            return () => clearTimeout(timeout);
        } else {
            initMap();
        }

    }, [apiKey]);

    const initMap = () => {
        if (!mapRef.current || !google) return;
        const fenway = { lat: 42.345573, lng: -71.098326 }; // Default location
        const map = new google.maps.Map(mapRef.current, {
            center: fenway,
            zoom: 14,
            streetViewControl: true,
        });
        panoramaRef.current = map.getStreetView();
        panoramaRef.current.setPosition(fenway);
        panoramaRef.current.setPov({
            heading: 265,
            pitch: 0,
        });
        panoramaRef.current.setVisible(true);
    };

    const handleConfirm = () => {
        if (!panoramaRef.current || !apiKey) return;
        const location = panoramaRef.current.getLocation();
        const lat = location.latLng.lat();
        const lng = location.latLng.lng();
        const heading = panoramaRef.current.getPov().heading;
        const pitch = panoramaRef.current.getPov().pitch;
        
        const staticImageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=90&key=${apiKey}`;

        onSelect(staticImageUrl);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl w-11/12 max-w-4xl h-5/6 flex flex-col p-4 border border-black/20 dark:border-white/20">
                <div className="flex-shrink-0 text-center mb-4">
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">{translations.genMapInstruction}</p>
                </div>
                <div ref={mapRef} className="flex-grow w-full h-full rounded-lg bg-gray-200 dark:bg-gray-800 border border-black/20 dark:border-white/20"></div>
                <div className="flex-shrink-0 flex items-center justify-center space-x-4 mt-4">
                    <button onClick={onClose} className="bg-surface-light dark:bg-surface-dark text-text-secondary-light dark:text-text-secondary-dark font-semibold py-2 px-6 border border-black/20 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className="bg-accent text-white font-bold py-2.5 px-8 rounded-full hover:bg-accent-dark transition-opacity font-heading uppercase tracking-wider">
                        {translations.genConfirmSelection}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;