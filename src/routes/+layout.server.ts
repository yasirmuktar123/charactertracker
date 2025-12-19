import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/index';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const userId = cookies.get('userId');

  if (!userId) {
    return { user: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true }
  });

  return { user };
};
