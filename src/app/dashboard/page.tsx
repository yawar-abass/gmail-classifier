import { auth } from "@/auth";
import Profile from "@/components/Dashboard/Profile";
import { Session, User } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
import { google } from "googleapis";
import EmailItem from "@/components/Dashboard/EmailItem";
import EmailsList from "@/components/Dashboard/EmailsList";

const UserDashboard = async () => {
  const session = (await auth()) as Session;

  let emails: any[] = [];
  if (!session?.user) redirect("/");

  const { user, accessToken } = session;

  const gAuth = new google.auth.OAuth2();
  gAuth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: gAuth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    emails = await Promise.all(
      (response.data.messages ?? []).map(async (message) => {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
        return msg.data;
      })
    );
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
  console.log(emails);

  return (
    <div>
      <Profile user={user} />
      <EmailsList emails={emails} />
    </div>
  );
};

export default UserDashboard;
