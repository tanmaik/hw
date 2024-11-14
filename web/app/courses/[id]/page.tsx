import { db } from '@/lib/db';
import Link from 'next/link';

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await db.course.findUnique({
    where: {
      id: params.id
    }
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <nav>
        <p><Link href="/">BELCH</Link></p>
      </nav>

      <div className="mt-10">
        <p>{course.name}</p>
        <p>{course.season} {course.year}</p>
      </div>
    </div>
  );
}
