import React from 'react';
import type { TranslationSet, TimelineSectionData } from '../types';

interface TimelineSectionProps {
    sectionData: TimelineSectionData;
}

const TimelineItem: React.FC<{ time: string; description: string; index: number }> = ({ time, description, index }) => (
    <div className="mb-10 ml-12">
        <span className="absolute flex items-center justify-center w-10 h-10 bg-accent/20 rounded-md -left-5 ring-8 ring-base-light dark:ring-base-dark">
            <span className="text-accent-dark font-bold font-heading text-lg">{index + 1}</span>
        </span>
        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-md">
            <h4 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark font-heading tracking-wide">{time}</h4>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">{description}</p>
        </div>
    </div>
);

const TimelineSection: React.FC<TimelineSectionProps> = ({ sectionData }) => {
    return (
        <section id={sectionData.id} className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark font-heading uppercase tracking-wider">{sectionData.title}</h3>
                <p className="mt-2 max-w-3xl mx-auto text-text-secondary-light dark:text-text-secondary-dark">{sectionData.intro}</p>
            </div>
            <div className="relative border-l-2 border-dashed border-black/20 dark:border-white/20 ml-6 md:ml-0 md:mx-auto md:max-w-3xl">
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