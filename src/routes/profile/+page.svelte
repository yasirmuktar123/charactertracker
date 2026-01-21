<script>
    export let data;
</script>

<section class="max-w-md mx-auto p-6 space-y-6">
  <h1 class="text-2xl font-bold mb-4">Profil</h1>


  {#if data.user}
    <div class="bg-white rounded-xl shadow p-4 space-y-3">
      <h2 class="text-lg font-semibold">Användarinformation</h2>
      <p><strong>Användarnamn:</strong> {data.user.username}</p>
      {#if data.user.profileImage}
        <div>
          <strong>Profilbild:</strong>
          <br />
          <img src="{data.user.profileImage}" alt="Profilbild av {data.user.username}" class="w-32 h-32 object-cover rounded-full mt-2 profile-image" />
        </div>
      {/if}
    </div>
  {:else}
    <p>Du är inte inloggad. Vänligen <a href="/login" class="text-blue-600 hover:underline">logga in</a>.</p>
  {/if}
</section>

<style>
    .profile-image {
        width: 150px;
        height: 150px;
        object-fit: stretch;
        border-radius: 50%;
        margin-top: 10px;
    }
</style>