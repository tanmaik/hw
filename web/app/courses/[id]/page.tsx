import { db } from "@/lib/db";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import UploadClassContextButton from "./upload-button";

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
      id: parseInt((await params).id),
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

  async function attachContext(fileUrl: string) {
    "use server";
    await db.file.create({
      data: {
        url: fileUrl,
        userId: userId,
        courseId: parseInt((await params).id),
      },
    });
  }

  const files = await db.file.findMany({
    where: {
      courseId: parseInt((await params).id),
    },
  });

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
        <div className="mt-4">
          <p>class context</p>
          <UploadClassContextButton attachContext={attachContext} />
        </div>
      </div>
    </div>
  );
}
