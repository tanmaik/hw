import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const classes = await prisma.class.findMany({});
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl text-center">
        <h1 className="mt-4 text-5xl tracking-tighter">
          The
          <br />
          Homework Machine
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-2">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="aspect-square flex items-center justify-center bg-neutral-100 text-neutral-500 font-sans rounded-md"
            >
              {classItem.name}
            </div>
          ))}
          <div className="aspect-square flex items-center justify-center bg-neutral-100 text-neutral-500 font-sans rounded-md">
            New class
          </div>
        </div>
      </div>
    </div>
  );
}
