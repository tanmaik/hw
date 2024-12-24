import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <div>
        you are not signed in. please <SignIn />
      </div>
    );
  return <div>you are signed in {JSON.stringify(session)}</div>;
}
