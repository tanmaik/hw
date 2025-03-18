"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { createClass, getClasses } from "../actions/classes";

interface Class {
  id: string;
  name: string;
  createdAt: string;
}

export default function Sidebar() {
  const { user } = useUser();
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassName, setNewClassName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.error("Error loading classes:", error);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;

    try {
      const newClass = await createClass(newClassName);
      setClasses([newClass, ...classes]);
      setNewClassName("");
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col">
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Your Classes</h2>
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Create New Class
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Enter class name"
                className="w-full px-3 py-2 border rounded-md"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateClass}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewClassName("");
                  }}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {cls.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm font-medium">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </aside>
  );
}
