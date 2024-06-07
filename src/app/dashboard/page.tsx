import { auth } from "@/auth";
import Profile from "@/components/Dashboard/Profile";
import { Session, User } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

const UserDashboard = async () => {
  const session = (await auth()) as Session;

  if (!session?.user) redirect("/");
  const { user } = session;

  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default UserDashboard;
