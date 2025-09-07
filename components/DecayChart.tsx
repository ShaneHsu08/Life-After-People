import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import type { TranslationSet } from '../types';

interface DecayChartProps {
    translations: TranslationSet;
    theme: 'light' | 'dark';
    activeSection: string;
}

const chartData = [
    { wood: 100, steel: 100, stone: 100 }, // Start
    { wood: 95, steel: 99, stone: 100 }, // 1 Year
    { wood: 20, steel: 80, stone: 100 }, // 100 Years
    { wood: 0, steel: 25, stone: 99 },  // 1k Years
    { wood: 0, steel: 5, stone: 95 },   // 10k Years
    { wood: 0, steel: 1, stone: 85 },    // 100k Years
    { wood: 0, steel: 0, stone: 60 },    // 1M Years
    { wood: 0, steel: 0, stone: 20 },     // 10M Years
    { wood: 0, steel: 0, stone: 5 },     // 100M Years
];

const sectionToIndex: { [key: string]: number } = {
    'year': 1,
    'century': 2,
    'millennium': 3,
    'future': 4,
};

const COLORS = {
    wood: '#d97706', // Rust Orange (Accent)
    steel: '#a3a3a3', // Neutral Gray
    stone: '#22c55e', // Mossy Green
};

const DecayChart: React.FC<DecayChartProps> = ({ translations, theme, activeSection }) => {
    const textColor = theme === 'dark' ? '#a3a3a3' : '#525252';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const activeIndex = sectionToIndex[activeSection] ?? -1;

    const fullChartData = chartData.map((d, i) => ({
        ...d,
        name: translations.chartLabels[i]
    }));

    return (
        <section id="chart-section" className="mb-16 bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg">
            <h3 className="text-3xl font-bold text-center mb-2 font-heading uppercase tracking-wider">{translations.chartTitle}</h3>
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-2xl mx-auto">
                {translations.chartSubtitle}
            </p>
            <div className="w-full md:w-4/5 mx-auto h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fullChartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid stroke={gridColor} strokeDasharray="1 4" />
                        <XAxis dataKey="name" stroke={textColor} tick={{ fontSize: 12, fill: textColor }} axisLine={{stroke: gridColor}} tickLine={{stroke: gridColor}} />
                        <YAxis stroke={textColor} tick={{ fontSize: 12, fill: textColor }} label={{ value: translations.chartYAxis, angle: -90, position: 'insideLeft', fill: textColor, dy: 40, style:{textAnchor: 'middle'} }} axisLine={{stroke: gridColor}} tickLine={{stroke: gridColor}}/>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#262626' : '#ffffff',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          }}
                          labelStyle={{ color: theme === 'dark' ? '#e5e5e5' : '#1a1a1a', fontWeight: 'bold' }}
                        />
                        <Legend wrapperStyle={{ color: textColor, fontSize: '0.875rem' }} />
                        <Line type="monotone" dataKey="wood" name={translations.chartDatasetWood} stroke={COLORS.wood} strokeWidth={3} dot={{r: 0}} activeDot={{r: 7}}/>
                        <Line type="monotone" dataKey="steel" name={translations.chartDatasetSteel} stroke={COLORS.steel} strokeWidth={3} dot={{r: 0}} activeDot={{r: 7}}/>
                        <Line type="monotone" dataKey="stone" name={translations.chartDatasetStone} stroke={COLORS.stone} strokeWidth={3} dot={{r: 0}} activeDot={{r: 7}}/>
                        
                        {activeIndex !== -1 && <ReferenceDot x={translations.chartLabels[activeIndex]} y={fullChartData[activeIndex]?.wood} r={8} fill={COLORS.wood} stroke={theme === 'dark' ? '#1a1a1a' : '#f5f5f3'} strokeWidth={2} />}
                        {activeIndex !== -1 && <ReferenceDot x={translations.chartLabels[activeIndex]} y={fullChartData[activeIndex]?.steel} r={8} fill={COLORS.steel} stroke={theme === 'dark' ? '#1a1a1a' : '#f5f5f3'} strokeWidth={2} />}
                        {activeIndex !== -1 && <ReferenceDot x={translations.chartLabels[activeIndex]} y={fullChartData[activeIndex]?.stone} r={8} fill={COLORS.stone} stroke={theme === 'dark' ? '#1a1a1a' : '#f5f5f3'} strokeWidth={2} />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default DecayChart;