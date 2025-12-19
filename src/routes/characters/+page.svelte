<script lang="ts">
  export let data: { characters: Array<any> };
  const { characters } = data;
</script>

<section class="max-w-4xl mx-auto p-6">
  <h1 class="text-2xl font-semibold mb-4">Characters</h1>

  <!-- Create form -->
  <form method="post" class="mb-6 flex gap-2">
    <input
      name="name"
      placeholder="Character name"
      required
      class="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring"
    />
    <button
      type="submit"
      class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
    >
      Create
    </button>
  </form>

  <!-- Cards grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each characters as char}
      <article class="p-4 rounded-2xl shadow-md bg-white">
        <header class="flex items-center justify-between mb-3">
          <a href={`/characters/${char.id}`}>
          <h2 class="text-lg font-bold">{char.name}</h2> </a>
          <span class="text-sm font-medium text-gray-600">{char.winrate}%</span>
        </header>

        <div class="mb-3">
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              class="h-3 rounded-full"
              style="width: {char.winrate}%; background: linear-gradient(90deg,#34d399,#60a5fa);"
              aria-hidden="true"
            ></div>
          </div>
        </div>

        <ul class="text-sm text-gray-700 space-y-1">
          <li><strong>Matches:</strong> {char.totalGames}</li>
          <li><strong>Wins:</strong> {char.wins}</li>
          <li><strong>Losses:</strong> {char.losses}</li>
        </ul>
      </article>
    {/each}
  </div>
</section>
