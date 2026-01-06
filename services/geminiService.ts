import { GoogleGenAI } from "@google/genai";
import { ResumeData, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-3-flash-preview';

export const enhanceBulletPoint = async (text: string): Promise<string> => {
  if (!text || text.length < 5) return text;

  try {
    const prompt = `
      Act as an expert resume writer. Rewrite the following resume bullet point using the 'XYZ Formula': 
      "Accomplished [X] as measured by [Y], by doing [Z]".
      
      Rules:
      1. Translate any international/non-standard terminology into standard US professional English.
      2. Use strong action verbs.
      3. Quantify results where possible (if numbers aren't present, phrase it to imply impact).
      4. Return ONLY the rewritten sentence. No explanations.
      
      Input text: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      }
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const suggestSkills = async (role: string): Promise<string[]> => {
  try {
    const prompt = `
      List 10 relevant hard and soft skills for a "${role}". 
      Return them as a JSON array of strings. 
      Example output: ["React", "Project Management"].
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const analyzeResume = async (data: ResumeData): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Analyze the following resume data for an international student targeting US tech jobs.
      
      1. Identify 3 critical specific improvements (focus on formatting, clarity, action verbs, or missing sections).
      2. Identify 5 missing technical or soft skill keywords based on the context of the experience provided (that are not already listed).
      3. Rewrite the experience bullet points to strictly follow the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
      
      Resume Data:
      ${JSON.stringify(data)}
      
      Return ONLY a valid JSON object with this exact structure:
      {
        "feedback": ["string", "string", "string"],
        "missingKeywords": ["string", "string", ...],
        "improvedExperience": [
          {
            "id": "exact_id_from_input_data",
            "points": ["rewritten point 1", "rewritten point 2", ...]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
        throw new Error("Empty response from AI");
    }
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
