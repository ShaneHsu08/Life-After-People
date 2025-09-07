import React from 'react';
import type { TranslationSet, TimelineSectionData } from '../types';

interface TimelineSectionProps {
    sectionData: TimelineSectionData;
}

const TimelineItem: React.FC<{ time: string; description: string; index: number }> = ({ time, description, index }) => (
    <div className="mb-10 ml-10">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-accent-light dark:bg-accent/20 rounded-full -left-4 ring-8 ring-white dark:ring-black">
            <span className="text-accent dark:text-accent-dark text-sm font-bold">{index + 1}</span>
        </span>
        <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl">
            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{time}</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);

const TimelineSection: React.FC<TimelineSectionProps> = ({ sectionData }) => {
    return (
        <section id={sectionData.id} className="mb-16 scroll-mt-24">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{sectionData.title}</h3>
                <p className="mt-2 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">{sectionData.intro}</p>
            </div>
            <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-6 md:ml-0 md:mx-auto md:max-w-3xl">
                {sectionData.events.map((event, index) => (
                    <TimelineItem key={index} time={event.time} description={event.description} index={index} />
                ))}
            </div>
        </section>
    );
};

const Timeline: React.FC<{ translations: TranslationSet }> = ({ translations }) => {
    return (
        <div id="timeline-content">
            {Object.values(translations.timelineData).map(section => (
                <TimelineSection key={section.id} sectionData={section} />
            ))}
        </div>
    );
};

export default Timeline;