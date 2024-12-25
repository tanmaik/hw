import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div>
      <h1>you are signed in {JSON.stringify(session)}</h1>
      <button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        sign out
      </button>
    </div>
  );
}
