'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function ensureUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: user.id }
  });

  if (!existingUser) {
    return await prisma.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim()
      }
    });
  }

  return existingUser;
} 