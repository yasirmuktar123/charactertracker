<script lang="ts">
  export let data: {
    character: {
      id: string;
      name: string;
      totalGames: number;
      wins: number;
      losses: number;
      winrate: number;
      games: { id: string; result: string; playedAt: string }[];
    };
  };

  const { character } = data;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();
</script>

<section class="max-w-3xl mx-auto p-6 space-y-6">
  <a href="/" class="text-sm text-blue-600 hover:underline">&larr; Back to characters</a>

  <header class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">{character.name}</h1>
      <p class="text-sm text-gray-600">
        {character.totalGames} matches • {character.wins} wins • {character.losses} losses
      </p>
    </div>
    <div class="text-right">
      <p class="text-xs text-gray-500">Winrate</p>
      <p class="text-xl font-semibold">{character.winrate}%</p>
    </div>
  </header>

  <!-- Winrate bar -->
  <div>
    <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        class="h-3 rounded-full"
        style="width: {character.winrate}%; background: linear-gradient(90deg,#34d399,#60a5fa);"
      ></div>
    </div>
  </div>

  <!-- Match log form -->
  <section class="bg-white rounded-2xl shadow-md p-4">
    <h2 class="text-lg font-semibold mb-3">Log new match</h2>

    <form method="post" action="?/createGame" class="flex gap-2">
      <select name="result" required class="border rounded px-2 py-1 text-sm">
        <option value="">Result</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>

      <button
        type="submit"
        class="px-3 py-1 rounded bg-blue-600 text-white text-sm"
      >
        Save match
      </button>
    </form>
  </section>

  
  <section class="bg-white rounded-2xl shadow-md p-4">
    <h2 class="text-lg font-semibold mb-3">Match history</h2>

    {#if character.games.length === 0}
      <p class="text-sm text-gray-500">No games played yet.</p>
    {:else}
      <ul class="divide-y">
        {#each character.games as game}
          <li class="flex items-center justify-between py-2">
            <div>
              <p class="text-sm font-medium">
                {game.result === 'win' ? 'Win' : 'Loss'}
              </p>
              <p class="text-xs text-gray-500">{formatDate(game.playedAt)}</p>
            </div>

            <span
              class="px-2 py-1 rounded-full text-xs font-semibold
                {game.result === 'win'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'}"
            >
              {game.result.toUpperCase()}
            </span>
          </li>
        {/each}
      </ul>
    {/if}   <!--  -->
  </section>
</section>
