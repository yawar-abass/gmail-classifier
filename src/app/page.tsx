import ApiInput from "@/components/auth/ApiInput";
import { SignIn } from "@/components/auth/SignIn";

export default function Home() {
  return (
    <main className="flex items-center  flex-col space-y-2 h-[80vh] justify-center container">
      <ApiInput />
      <p className="text-gray-600 text-sm">Please insert your API key before Sign in</p>
      <SignIn />
    </main>
  );
}
