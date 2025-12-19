import { prisma } from '$lib/index';
import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';

export const load: PageServerLoad = async ({ params, cookies }) => {
  const user = await requireAuth(cookies);
  const { id } = params;

  const character = await prisma.character.findFirst({
    where: { id, userId: user.id },
    include: { games: { orderBy: { playedAt: 'desc' } } }
  });

  if (!character) throw error(404, 'Character not found');

  const totalGames = character.games.length;
  const wins = character.games.filter((g) => g.result === 'win').length;
  const losses = character.games.filter((g) => g.result === 'loss').length;
  const winrate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  return {
    character: {
      id: character.id,
      name: character.name,
      createdAt: character.createdAt,
      totalGames,
      wins,
      losses,
      winrate,
      games: character.games.map((g) => ({
        id: g.id,
        result: g.result,
        playedAt: g.playedAt
      }))
    }
  };
};

export const actions: Actions = {
  createGame: async ({ request, params, cookies }) => {
    const user = await requireAuth(cookies);
    const { id } = params;

    const owned = await prisma.character.findFirst({
      where: { id, userId: user.id },
      select: { id: true }
    });

    if (!owned) throw error(404, 'Character not found');

    const form = await request.formData();
    const result = form.get('result');

    if (result !== 'win' && result !== 'loss') {
      return fail(400, { error: 'Result must be win or loss' });
    }

    await prisma.game.create({
      data: {
        result: result as string,
        playedAt: new Date(),
        characterId: id
      }
    });

    return { success: true };
  }
};
