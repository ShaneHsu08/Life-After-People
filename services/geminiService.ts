import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateFutureImage = async (
    prompt: string,
    imageData: { type: string; data: string }
): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageData.data,
                            mimeType: imageData.type,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }

        throw new Error("No image data found in the API response.");

    } catch (error) {
        console.error("Gemini API request failed:", error);
        throw new Error("Failed to generate image. Please check the console for more details.");
    }
};

export const analyzeImage = async (
    imageData: { type: string; data: string }
): Promise<string> => {
    try {
        const prompt = "Analyze this image and provide a brief, descriptive caption of its content. Focus on the main subject (e.g., 'a brick building', 'a bridge', 'a park with a fountain'), the setting (e.g., 'in a dense urban city', 'in a quiet suburban neighborhood', 'in a rural landscape'), and the overall atmosphere. Keep it to one sentence.";
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageData.data,
                            mimeType: imageData.type,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini API request for image analysis failed:", error);
        return ""; // Return empty string on failure
    }
};

export const generateVideoScript = async (language: string, imageDescription: string | null): Promise<string> => {
    const languageMap: { [key: string]: string } = {
        en: 'English',
        zh: 'Chinese',
        ja: 'Japanese'
    };
    const targetLanguage = languageMap[language] || 'English';

    const descriptionContext = imageDescription
        ? `The scene is specifically: "${imageDescription}". The script should be tailored to this specific location.`
        : "The script should be general enough to fit any kind of location.";

    try {
        const prompt = `You are a documentary scriptwriter for a short social media video. The video is a fixed-shot timelapse showing a single location as it decays over a million years. It consists of six static images (keyframes): 1 year, 100 years, 1,000 years, 10,000 years, 100,000 years, and 1 million years after humans vanish. Write a compelling, dramatic voice-over script for this video. ${descriptionContext} Structure the script with a simple heading for each keyframe (e.g., "[1 YEAR LATER]") followed by the corresponding narration. Do not add visual descriptions, as the images are already provided. The narration for each scene must be very brief, designed to be read aloud in approximately 8 seconds (around 20-25 words). The tone should be awe-inspiring, slightly melancholic, and educational, in the style of the 'Life After People' documentary series. The script must be written in ${targetLanguage}.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return 'This video is a time-lapse video showing the decay of various man-made objects and the changes in the environment at a single location. Below is the voice-over script:\n' + response.text;
    } catch (error) {
        console.error("Gemini API request for script failed:", error);
        throw new Error("Failed to generate video script.");
    }
};