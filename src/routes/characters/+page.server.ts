import { prisma } from '$lib/index';
import type { Actions, PageServerLoad } from './$types';
import { requireAuth } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const user = await requireAuth(cookies);

  const raw = await prisma.character.findMany({
    where: { userId: user.id },
    include: { games: true },
    orderBy: { createdAt: 'desc' }
  });

  const characters = raw.map((c) => {
    const totalGames = c.games.length;
    const wins = c.games.filter((g) => g.result === 'win').length;
    const losses = c.games.filter((g) => g.result === 'loss').length;
    const winrate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    return {
      id: c.id,
      name: c.name,
      createdAt: c.createdAt,
      totalGames,
      wins,
      losses,
      winrate
    };
  });

  return { characters };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const user = await requireAuth(cookies);

    const form = await request.formData();
    const name = (form.get('name') as string | null)?.trim();

    if (!name) {
      return fail(400, { error: 'Name is required' });
    }

    await prisma.character.create({
      data: {
        name,
        userId: user.id // 
      }
    });

    return { success: true };
  }
};
