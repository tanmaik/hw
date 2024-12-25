import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
export default async function LoginPage() {
  const session = await auth();
  console.log(session);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl text-center">
        <h1 className="font-serif text-superblue text-5xl">
          THE
          <br />
          <span className="font-bold ">HOMEWORK</span>
          <br /> MACHINE
        </h1>
        <SignIn>
          <div className="px-2 py-1 mt-4 border">
            Use the machine
          </div>
        </SignIn>
      </div>
    </div>
  );
}
