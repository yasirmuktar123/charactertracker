import type { Actions } from './$types';
import { prisma } from '$lib/index';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = (data.get('username') as string)?.trim();
    const password = (data.get('password') as string)?.trim();
    const emailRaw = (data.get('email') as string)?.trim();
    const email = emailRaw && emailRaw.length > 0 ? emailRaw : null;
    const profileImage = data.get('profileImage') as File;

    if (profileImage && profileImage.size > 5 * 1024 * 1024) {
      return fail(400, { error: 'Profilbilden får inte vara större än 5 MB.' });
    }
    if (profileImage && !profileImage.type.startsWith('image/')) {
      return fail(400, { error: 'Profilbilden måste vara en bildfil.' });
    }

    if (profileImage && (profileImage.name.includes("..") || profileImage.name.includes("/"))) {
      return fail(400, { error: 'Ogiltigt filnamn för profilbild.' });
    }
    


    if (!username || username.length < 3) {
      return fail(400, { error: 'Användarnamn måste vara minst 3 tecken.' });
    }

    if (!password || password.length < 4) {
      return fail(400, { error: 'Lösenord måste vara minst 4 tecken.' });
    }

    const existing = await prisma.user.findUnique({
      where: { username }
    });

    if (existing) {
      return fail(400, { error: 'Användarnamnet är redan taget.' });
    }

    //base 64 encode profile image if provided
    let profileImageBase64: string | null = null;
    if (profileImage) {
      const arrayBuffer = await profileImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      profileImageBase64 = `data:${profileImage.type};base64,${buffer.toString('base64')}`;
    }


    const newUser = await prisma.user.create({
      data: { username, password, email, profileImage: profileImageBase64 }
    });

    cookies.set('userId', newUser.id, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
    });

    throw redirect(303, '/');
  },

  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = (data.get('username') as string)?.trim();
    const password = (data.get('password') as string)?.trim();

    if (!username || !password) {
      return fail(400, { error: 'Användarnamn och lösenord krävs.' });
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user || user.password !== password) {
      return fail(400, { error: 'Fel användarnamn eller lösenord.' });
    }

    cookies.set('userId', user.id, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
    });

    throw redirect(303, '/');
  },

  logout: async ({ cookies }) => {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/login');
  }
};
