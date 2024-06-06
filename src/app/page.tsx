import { SignIn } from "@/components/auth/signIn";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center h-[80vh] justify-center container">
      <SignIn />
    </main>
  );
}
