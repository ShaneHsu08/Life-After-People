export type Language = 'en' | 'zh' | 'ja';

export interface TimelineEvent {
    time: string;
    description: string;
}

export interface TimelineSectionData {
    id: string;
    title: string;
    intro: string;
    events: TimelineEvent[];
}

export interface TranslationSet {
    headerTitle: string;
    navYear: string;
    navCentury: string;
    navMillennium: string;
    navFuture: string;
    mainTitle: string;
    mainSubtitle: string;
    chartTitle: string;
    chartSubtitle: string;
    footerText: string;
    chartYAxis: string;
    chartLabels: string[];
    chartDatasetWood: string;
    chartDatasetSteel: string;
    chartDatasetStone: string;
    genTitle: string;
    genSubtitle: string;
    genButton: string;
    genChooseImage: string;
    genLoading: string;
    genError: string;
    genDisclaimer: string;
    genGoogleMap: string;
    genConfirmSelection: string;
    genMapInstruction: string;
    genTimeLabels: {
        one: string;
        hundred: string;
        thousand: string;
        tenThousand: string;
        hundredThousand: string;
        million: string;
    };
    genPrompts: {
        one: string;
        hundred: string;
        thousand: string;
        tenThousand: string;
        hundredThousand: string;
        million: string;
    };
    timelineData: {
        year: TimelineSectionData;
        century: TimelineSectionData;
        millennium: TimelineSectionData;
        future: TimelineSectionData;
    };
}

export interface Translations {
    en: TranslationSet;
    zh: TranslationSet;
    ja: TranslationSet;
}