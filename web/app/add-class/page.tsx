import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default function AddClass() {
  async function addNewClass(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const code = formData.get("code") as string;

    await prisma.class.create({
      data: {
        name,
        code,
      },
    });

    redirect("/");
  }

  return (
    <div className="p-2">
      <div className="py-10 bg-black w-full font-mono"></div>
      <div className="flex flex-col max-w-[15rem]">
        <h1 className="mt-4 text-2xl font-bold">Add New Class</h1>
        <form action={addNewClass} className="mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-semibold">Class Name</label>
              <input
                name="name"
                required
                className="w-full mt-1 px-2 py-1 border border-black rounded-sm"
              />
            </div>
            <div>
              <label className="font-semibold">Class Code</label>
              <input
                name="code"
                required
                className="w-full mt-1 px-2 py-1 border border-black rounded-sm"
              />
            </div>
            <button
              type="submit"
              className="font-sans tracking-tight px-2 py-1 text-black bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-500 hover:border-neutral-400 border border-black rounded-sm font-normal text-sm inline-block active:scale-95 active:shadow-inner transition-all"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
