import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const classes = await prisma.class.findMany({});
  // console.log(classes);
  return (
    <div className="p-2">
      <div className="py-10 bg-black w-full font-mono"></div>
      <div className="flex flex-col max-w-[15rem]">
        <h1 className="mt-4 text-2xl font-bold">Student Simulator</h1>
        <div className="flex items-center justify-between mt-4 mb-1">
          <p className="font-semibold">Your classes</p>
          <Link href="/add-class">
            <button className="font-sans tracking-tight px-0.5  text-black bg-gradient-to-b from-neutral-200 via-neutral-200 to-neutral-400 hover:border-neutral-400 border border-black rounded-sm font-normal text-sm inline-block active:scale-95 active:shadow-inner transition-all">
              add class
            </button>
          </Link>
        </div>
        <hr className="border-gray-500" />
        <div className="mt-1">
          {classes.length > 0 ? (
            classes.map((classItem) => (
              <div key={classItem.id}>{classItem.name}</div>
            ))
          ) : (
            <span>No classes</span>
          )}
        </div>
      </div>
    </div>
  );
}
