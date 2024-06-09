import { GmailMessage } from "@/types";
import OpenAI from "openai";

// Function to get API key from local storage
const getApiKey = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("apiKey");
  }
  throw new Error("Api key is not available.");
};

// Initialize OpenAI API with the API key from local storage
const initializeOpenAI = (): OpenAI | null => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("API key is missing.");
    throw new Error("API key is missing.");
  }
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};

// Function to classify a single email
export const classifyEmail = async (
  emailContent: string | null
): Promise<string> => {
  const openai = initializeOpenAI();
  if (!openai || !emailContent) {
    return "General";
  }

  const prompt = `
    Classify the following email into one of the categories: Important, Promotions, Social, Marketing, Spam, or General.

    Email Content: ${emailContent}

    Classification: 
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 10,
    });

    const classification = response.choices[0].message?.content?.trim();
    return classification ?? "General";
  } catch (error: any) {
    console.error("Error classifying email:", error);
    throw new Error("Error classifying emails" + error.message);
  }
};
