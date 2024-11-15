import { db } from "@/lib/db";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const course = await db.course.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (course?.userId !== userId) {
    return (
      <div>
        <nav>
          <p>
            <Link href="/">BELCH</Link>
          </p>
        </nav>

        <p className="mt-10">sorry, you weren&apos;t supposed to see this</p>
      </div>
    );
  }
  return (
    <div>
      <nav>
        <p>
          <Link href="/">BELCH</Link>
        </p>
      </nav>

      <div className="mt-10">
        <p>{course.name}</p>
        <p>
          {course.season} {course.year}
        </p>
        <h1 className="mt-4">upload class information documents</h1>
        
      </div>
    </div>
  );
}
