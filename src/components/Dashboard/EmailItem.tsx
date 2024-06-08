"use client";
import { GmailMessage, GmailMessageHeader } from "@/types";
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

  return (
    <li
      className="border-b-2 p-2 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="font-semibold text-sm">{fromName}</div>
        <div className="text-sm text-gray-600">{subject}</div>
        <div className="text-green-400">Important</div>
      </div>
      {isOpen && (
        <div className="mt-2">
          <button className="text-red-500" onClick={onClick}>
            X
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: email?.snippet }}
            className="mt-2"
          />
        </div>
      )}
    </li>
  );
};

export default EmailItem;
