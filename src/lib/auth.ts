import { prisma } from '$lib/index';
import { redirect } from '@sveltejs/kit';

export async function requireAuth(cookies: any) {
  const userId = cookies.get('userId');

  if (!userId) {
    throw redirect(303, '/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true }
  });

  if (!user) {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/login');
  }

  return user;
}
