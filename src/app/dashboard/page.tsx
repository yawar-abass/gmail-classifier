import { auth } from "@/auth";
import Profile from "@/components/Dashboard/Profile";
import { CustomSession, User } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
import EmailsList from "@/components/Dashboard/EmailsList";
import { fetchEmails } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";

const UserDashboard = async () => {
  const session = (await auth()) as CustomSession;

  let emails: any[] = [];
  if (!session?.user) redirect("/");

  const { user, accessToken, expires, error } = session;

  if (error === "RefreshAccessTokenError") {
    // Force user to log in again if there's an error refreshing the access token
    redirect("/");
  }

  if (Date.now() > new Date(expires ?? Date.now()).getTime()) {
    // Redirect to sign in page if the token is expired
    redirect("/");
  }

  if (!accessToken) {
    return redirect("/");
  }

  try {
    emails = await fetchEmails(accessToken);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }

  return (
    <div>
      <SessionProvider session={session}>
        <Profile user={user} />
        <EmailsList emails={emails} />
      </SessionProvider>
    </div>
  );
};

export default UserDashboard;
