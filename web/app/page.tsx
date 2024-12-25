import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  let user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: session.user.name,
        email: session.user.email,
      },
    });
    console.log(user);
  }

  const allUsers = await prisma.user.findMany({});
  const numUsers = await prisma.user.count();
  return (
    <div>
      {allUsers.map((user) => (
        <div key={user.id}>
          {user.email} | {user.name}{" "}
        </div>
      ))}
      dsjfaklsdjfs {numUsers}
    </div>
  );
}
