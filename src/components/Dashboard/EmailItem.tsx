"use client";
import { classifyEmail } from "@/lib/emailClassifier";
import { GmailMessage, GmailMessageHeader, GmailMessagePart } from "@/types";
import React from "react";

interface EmailItemProps {
  email: GmailMessage;
  onClick: () => void;
  isOpen: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onClick, isOpen }) => {
  const fromHeader =
    email.payload.headers.find(
      (header: GmailMessageHeader) => header.name === "From"
    )?.value || "Unknown sender";

  // Extract the name from the "From" header
  const fromName = fromHeader.split("<")[0].trim();

  const subject =
    email.payload.headers.find(
      (header: GmailMessageHeader) => header.name === "Subject"
    )?.value || "No subject";

  const getBody = (parts: GmailMessagePart[]): string => {
    if (!parts) return "";
    for (const part of parts) {
      if (part.mimeType === "text/html" && part.body.data) {
        return atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
      }
      if (part.parts) {
        const result = getBody(part.parts);
        if (result) return result;
      }
    }
    return "";
  };

  const body = getBody([email.payload]);

  return (
    <li
      className="border-b-2 p-2 gap-3 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex justify-between w-full">
        <div className="font-semibold text-sm">{fromName}</div>
        <div className="text-sm text-gray-600">{subject}</div>
        <div className="text-green-400">{email?.category ?? "General"}</div>
      </div>
      {isOpen && (
        <div className="mt-2 relative p-3 bg-gray-300 rounded-sm max-h-[500px] overflow-y-scroll">
          <button
            className="text-red-500 sticky top-2 left-2"
            onClick={onClick}
          >
            X
          </button>
          <div dangerouslySetInnerHTML={{ __html: body }} className="mt-2" />
        </div>
      )}
    </li>
  );
};

export default EmailItem;
