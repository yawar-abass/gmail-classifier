import React from "react";
import Logout from "../auth/logout";
import { User } from "@/types";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { name, email, image } = user;
  return (
    <div className="flex justify-between w-full shadow-lg border-1 rounded-full items-center px-4 py-2 my-2">
      <div className="flex gap-2">
        <img src={image} alt="user" className="h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-gray-800">{email}</p>
        </div>
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
