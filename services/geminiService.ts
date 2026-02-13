import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Injected by environment

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey });

interface TacticalAdviceRequest {
  leadBio: string;
  leadRecentPost: string;
  campaignGoal: string;
}

/**
 * "The Oráculo" - Analyzes a lead and suggests the best tactical approach.
 * Uses Gemini 1.5 Pro for complex reasoning.
 */
export const getTacticalAdvice = async (request: TacticalAdviceRequest): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key missing. Returning mock advice.");
    return "MOCK ADVICE: Approach with Script B (Value First).";
  }

  try {
    const systemPrompt = `
      Eres el Oráculo de imanhibrido2.0. Tienes acceso a los metadatos de las campañas. 
      Tu tono es directo, táctico y profesional. Tu objetivo es maximizar la tasa de conversión. 
      Analiza el lead y sugiere la mejor 'jugada' (Script A, B o C) basándote en la biografía y últimos posts del prospecto.
    `;

    const userPrompt = `
      Lead Bio: ${request.leadBio}
      Recent Post Content: ${request.leadRecentPost}
      Campaign Goal: ${request.campaignGoal}
      
      Output format: JSON with fields 'strategy', 'confidence', 'suggested_opener'.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using the latest recommended model for reasoning
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n---\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text || "No advice generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

/**
 * Uses Gemini 1.5 Flash for high-speed sentiment analysis on incoming DMs.
 */
export const analyzeSentimentFlash = async (messageText: string): Promise<string> => {
   if (!apiKey) return "neutral";
   
   try {
     const response = await ai.models.generateContent({
       model: 'gemini-3-flash-preview',
       contents: `Analyze sentiment of this DM: "${messageText}". Return only one word: positive, negative, or neutral.`,
     });
     return response.text?.trim() || "neutral";
   } catch (e) {
     return "neutral";
   }
}