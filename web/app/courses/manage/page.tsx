import { db } from '@/lib/db';
import Link from 'next/link';
import DeleteButton from './delete-button';

export default async function ManageCourses() {
  const courses = await db.course.findMany();

  async function deleteCourse(id: string) {
    'use server';
    await db.course.delete({
      where: { id }
    });
  }

  return (
    <div>
      <nav>
        <p><Link href="/">BELCH</Link>,{" "}
        <span className="text-black/50">MANAGE COURSES</span></p>
      </nav>

      <div className="mt-4">
        <h1>ADD COURSE</h1>
        <form className="mt-4 flex flex-col gap-2">
          <label className="text-sm">name</label>
          <input className="p-2 border border-black" type="text" />
          
          <label className="text-sm">semester</label>
          <select className="p-2 border border-black">
            <option value="FALL">fall</option>
            <option value="SPRING">spring</option>
            <option value="SUMMER">summer</option>
            <option value="WINTER">winter</option>
          </select>

          <label className="text-sm">year</label>
          <select className="p-2 border border-black">
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </form>

        <hr className="my-4"/>
        
        <div>
          <h1>REMOVE COURSES</h1>
          <ul className="mt-1">
            {courses.map((course) => (
              <DeleteButton
                key={course.id}
                name={course.name}
                id={course.id}
                deleteCourse={deleteCourse}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
