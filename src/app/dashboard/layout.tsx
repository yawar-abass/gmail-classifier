import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return <>{children}</>;
};

export default DashboardLayout;
