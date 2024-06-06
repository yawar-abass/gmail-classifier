import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button>Signout</Button>
    </form>
  );
};

export default Logout;
