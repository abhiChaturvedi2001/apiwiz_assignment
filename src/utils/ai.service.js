import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBAa2lqzHtY8LYd4v0oeNdCUNfxnfaZKFI");

export const generateAISummary = async (inputJson) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Ask Anything About my ${inputJson}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error:", error);
    }
}
