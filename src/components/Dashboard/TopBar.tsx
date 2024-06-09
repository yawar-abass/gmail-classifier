"use client";

import { classifyEmail } from "@/lib/emailClassifier";
import { GmailMessage } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TopBarProps {
  onClassify: (option: GmailMessage[]) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onClassify }) => {
  const [selectedOption, setSelectedOption] = useState(15);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const { accessToken } = session;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (error.length > 0) {
      timeout = setTimeout(() => setError(""), 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleClassify = async () => {
    try {
      const response = await fetch("api/emails", {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          maxResults: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching emails: ${response.statusText}`);
      }

      const emails = await response.json();
      onClassify(emails);

      console.log("emails" + emails);

      if (!emails) {
        setError("No emails found");
        return;
      }

      const classifiedEmails = await Promise.all(
        emails.map(async (email: GmailMessage) => {
          const emailBody = email.snippet;
          const category = await classifyEmail(emailBody);
          return { ...email, category };
        })
      );
      onClassify(classifiedEmails);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="my-4 flex justify-between px-10">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(parseInt(e.target.value, 10))}
          className="px-3 py-2 border border-slate-400 rounded-lg bg-white text-slate-700 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
        >
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          {/* Add more options as needed */}
        </select>
        <button
          onClick={handleClassify}
          disabled={error.length > 0}
          className="bg-slate-700 text-white px-3 py-2 rounded-lg hover:bg-slate-600"
        >
          Classify
        </button>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </>
  );
};

export default TopBar;
