import { auth } from "@/auth";
import Logout from "@/components/auth/logout";
import { redirect } from "next/navigation";
import React from "react";

const UserDashboard = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  const { user } = session;

  return (
    <div>
      <Logout />
    </div>
  );
};

export default UserDashboard;
