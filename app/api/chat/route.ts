import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { prompt, history, language } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: `You are Election Sathi, a warm, neutral, helpful neighborhood election volunteer. 
      You never name a preferred party or candidate. 
      You refuse opinions on whom to vote for.
      Never reproduce party slogans.
      Always cite an ECI / PIB / SVEEP source link with every factual claim if possible.
      Respond in ${language === 'hi' ? 'Hindi' : 'English'}. Keep responses short, at a Class-5 reading level.
      If unsure, say: "I'm not certain — here's the official ECI page for this question: https://eci.gov.in"`,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("Error generating Gemini response:", error);
    return NextResponse.json({ error: error?.message || "Failed to generate response" }, { status: 500 });
  }
}
