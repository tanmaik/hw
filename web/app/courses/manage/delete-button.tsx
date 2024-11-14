'use client';

export default function DeleteButton({ 
  name, 
  id, 
  deleteCourse
}: { 
  name: string,
  id: string,
  deleteCourse: (id: string) => Promise<void> 
}) {
  return (
    <button
      className="px-4 py-2 text-red-600 hover:text-red-800"
      onClick={async () => {
          await deleteCourse(id);
      }}
    >
      {name}
    </button>
  );
}

