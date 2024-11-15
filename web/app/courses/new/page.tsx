import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
export default async function NewCourse() {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  return (
    <div>
      <nav>
        <p>
          <Link href="/">BELCH</Link>,{" "}
          <span className="text-black/50">NEW COURSE</span>
        </p>
      </nav>
      <div className="mt-10">
        <form
          className="mt-4 flex flex-col gap-2"
          action={async (formData: FormData) => {
            "use server";
            const name = formData.get("name");
            const season = formData.get("season");
            const year = formData.get("year");

            await db.course.create({
              data: {
                name: name as string,
                season: season as string,
                year: parseInt(year as string),
                userId,
              },
            });
            redirect("/");
          }}
        >
          <label className="text-sm">name</label>
          <input className="p-2 border border-black" name="name" type="text" />

          <label className="text-sm">semester</label>
          <select className="p-2 border border-black" name="season">
            <option value="fall">fall</option>
            <option value="spring">spring</option>
            <option value="summer">summer</option>
            <option value="winter">winter</option>
          </select>

          <label className="text-sm">year</label>
          <select className="p-2 border border-black" name="year">
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          <button className="p-2 mt-4 border bg-black text-white">
            create
          </button>
        </form>
      </div>
    </div>
  );
}
