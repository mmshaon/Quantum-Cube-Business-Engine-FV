
import { GoogleGenAI, Type } from "@google/genai";
import { AIPrediction, BusinessIdea } from "../types";

export async function predictIdeaSuccess(idea: BusinessIdea): Promise<AIPrediction> {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Analyze the following business idea and provide a detailed strategic success prediction:
    Title: ${idea.title}
    Tagline: ${idea.tagline}
    Problem: ${idea.problem}
    Solution: ${idea.solution}
    Target Market: ${idea.market}

    Please return the analysis as a structured JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Overall success score (0-100)" },
            marketFit: { type: Type.NUMBER, description: "Market fit score (0-100)" },
            technicalFeasibility: { type: Type.NUMBER, description: "Technical feasibility (0-100)" },
            financialViability: { type: Type.NUMBER, description: "Financial viability (0-100)" },
            riskLevel: { type: Type.STRING, description: "Low, Medium, or High" },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "marketFit", "technicalFeasibility", "financialViability", "riskLevel", "insights", "recommendations"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}") as AIPrediction;
    return result;
  } catch (error) {
    console.error("AI Prediction Error:", error);
    // Fallback data in case of failure or missing API key
    return {
      score: 65,
      marketFit: 70,
      technicalFeasibility: 60,
      financialViability: 55,
      riskLevel: 'Medium',
      insights: ['Market competition is high in this sector.', 'Technical infrastructure needs scaling plan.'],
      recommendations: ['Conduct more target user interviews.', 'Evaluate cloud cost projections.']
    };
  }
}
