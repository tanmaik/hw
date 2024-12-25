import { signIn } from "@/auth";

export default function SignIn({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}
