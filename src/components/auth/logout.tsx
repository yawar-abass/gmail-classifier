import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/auth";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
        localStorage.removeItem("apiKey");
      }}
    >
      <Button>Signout</Button>
    </form>
  );
};

export default Logout;
