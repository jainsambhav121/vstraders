import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is set in your environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

let chat: Chat | null = null;

const initializeChat = (): Chat => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a friendly and helpful customer support assistant for VSTRADERS, an e-commerce store specializing in home comfort products like pillows, mattresses, and sofas. Be concise and helpful. If you don't know an answer, suggest contacting human support at vstrader418@gmail.com.",
            },
        });
    }
    return chat;
};


export const getChatbotResponse = async (message: string): Promise<string> => {
    if (!API_KEY) {
        return "I am currently offline. Please contact support at vstrader418@gmail.com.";
    }

    try {
        const chatInstance = initializeChat();
        const response = await chatInstance.sendMessage({ message });
        return response.text ?? "Sorry, I couldn't generate a response. Please try again.";
    } catch (error) {
        console.error("Error getting response from Gemini API:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
};

export const analyzeImageForSearch = async (base64Data: string, mimeType: string): Promise<string> => {
    if (!API_KEY) {
        console.warn("No API Key available for image search");
        return "Pillow"; // Fallback
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    },
                    {
                        text: "Analyze this image and identify the main product. Return ONLY a 1-3 word search query to find this product in a furniture store (e.g. 'Grey Sofa', 'Cotton Pillow', 'King Mattress'). Do not add punctuation."
                    }
                ]
            }
        });

        return response.text?.trim() || "";
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw error;
    }
};