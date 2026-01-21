import { prisma } from '$lib/index';
import type { Actions, PageServerLoad } from './$types';
import { requireAuth } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const user = await requireAuth(cookies, true);
    return { user };
};
