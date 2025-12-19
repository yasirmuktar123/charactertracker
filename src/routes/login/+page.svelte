<script lang="ts">
  export let form: { error?: string } | undefined;
</script>

<section class="max-w-md mx-auto p-6 space-y-6">
  <h1 class="text-2xl font-bold mb-4">Login / Register</h1>

  <section class="bg-white rounded-xl shadow p-4 space-y-3">
    <h2 class="text-lg font-semibold">Logga in</h2>

    <form method="POST" action="?/login" class="space-y-3">
      <div class="flex flex-col gap-1">
        <label>Användarnamn</label>
        <input
          type="text"
          name="username"
          required
          placeholder="Ditt användarnamn"
          class="border rounded-md px-3 py-2"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label>Lösenord</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Ditt lösenord"
          class="border rounded-md px-3 py-2"
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 rounded-md bg-blue-600 text-white"
      >
        Logga in
      </button>
    </form>
  </section>

  <section class="bg-white rounded-xl shadow p-4 space-y-3">
    <h2 class="text-lg font-semibold">Registrera dig</h2>

    <form method="POST" action="?/register" class="space-y-3">
      <div class="flex flex-col gap-1">
        <label>Användarnamn</label>
        <input
          type="text"
          name="username"
          required
          minlength="3"
          placeholder="Välj ett användarnamn"
          class="border rounded-md px-3 py-2"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label>Email (valfritt)</label>
        <input
          type="email"
          name="email"
          placeholder="din@mejl.se"
          class="border rounded-md px-3 py-2"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label>Lösenord</label>
        <input
          type="password"
          name="password"
          required
          minlength="4"
          placeholder="Välj ett lösenord"
          class="border rounded-md px-3 py-2"
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 rounded-md bg-green-600 text-white"
      >
        Skapa konto
      </button>
    </form>
  </section>

  {#if form?.error}
    <div class="bg-red-100 text-red-800 text-sm px-3 py-2 rounded">
      {form.error}
    </div>
  {/if}
</section>
