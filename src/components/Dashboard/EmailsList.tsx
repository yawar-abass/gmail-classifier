"use client";

import React, { useState } from "react";
import EmailItem from "./EmailItem";
import { GmailMessage } from "@/types";

interface EmailsListProps {
  emails: GmailMessage[];
}

const EmailsList: React.FC<EmailsListProps> = ({ emails }) => {
  const [openEmailId, setOpenEmailId] = useState<string | null>(null);

  const handleEmailClick = (id: string) => {
    if (openEmailId === id) {
      setOpenEmailId(null);
    } else {
      setOpenEmailId(id);
    }
  };

  return (
    <ul className="flex flex-col space-y-2">
      {emails.map((email) => (
        <EmailItem
          email={email}
          key={email.id}
          onClick={() => handleEmailClick(email.id)}
          isOpen={openEmailId === email.id}
        />
      ))}
    </ul>
  );
};

export default EmailsList;
