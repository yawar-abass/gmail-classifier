import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { google } from "googleapis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchEmails = async (accessToken: string, maxResults = 15) => {
  const gAuth = new google.auth.OAuth2();
  gAuth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: gAuth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: maxResults,
    });

    const emails = await Promise.all(
      (response.data.messages ?? []).map(async (message) => {
        if (!message.id) {
          throw new Error("Message ID is null or undefined");
        }
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
        return msg.data;
      })
    );

    return emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};
