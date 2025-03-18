"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { ensureUser } from "./user";

const prisma = new PrismaClient();

export async function createClass(name: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  // Ensure user exists in our database
  await ensureUser();

  return prisma.class.create({
    data: {
      name,
      userId: user.id,
    },
  });
}

export async function getClasses() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.class.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
} 