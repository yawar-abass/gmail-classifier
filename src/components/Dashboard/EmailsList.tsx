"use client";

import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import { GmailMessage } from "@/types";
import TopBar from "./TopBar";
import { classifyEmail } from "@/lib/emailClassifier";

interface EmailsListProps {
  emails: GmailMessage[];
}

const EmailsList: React.FC<EmailsListProps> = ({ emails }) => {
  const [openEmailId, setOpenEmailId] = useState<string | null>(null);
  const [classifiedEmails, setClassifiedEmails] =
    useState<GmailMessage[]>(emails);

  const handleEmailClick = (id: string) => {
    if (openEmailId === id) {
      setOpenEmailId(null);
    } else {
      setOpenEmailId(id);
    }
  };

  // classify emails on first render
  useEffect(() => {
    async () => {
      try {
        const classifiedEmails = await Promise.all(
          emails.map(async (email) => {
            const emailBody = email.snippet; // Use the snippet as the body for simplicity
            const category = await classifyEmail(emailBody);
            return { ...email, category };
          })
        );
        setClassifiedEmails(classifiedEmails);
      } catch (error: any) {
        console.error("Error classifying emails:", error);
      }
    };
  }, [emails]);

  const handleClassifiedEmails = (emails: GmailMessage[]) => {
    setClassifiedEmails(emails);
  };

  return (
    <>
      <TopBar onClassify={handleClassifiedEmails} />

      <ul className="flex flex-col space-y-2 my-3">
        {classifiedEmails.map((email) => (
          <EmailItem
            email={email}
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            isOpen={openEmailId === email.id}
          />
        ))}
      </ul>
    </>
  );
};

export default EmailsList;
