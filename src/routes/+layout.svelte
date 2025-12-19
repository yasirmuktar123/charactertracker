<script lang="ts">
  export let data: {
    user: { id: string; username: string } | null;
  };
</script>

<div class="app-root">
  <header class="app-header">
    <div class="app-header-inner">
      <h1 class="logo">Character Tracker</h1>

      <nav class="nav-links">
        <a href="/characters">Characters</a>
      

        {#if data.user}
          <span class="user-pill">
            Inloggad som <strong>{data.user.username}</strong>
          </span>

          <form method="POST" action="/login?/logout" class="logout-form">
            <button type="submit" class="nav-button">Logga ut</button>
          </form>
        {:else}
          <a href="/login" class="nav-button-link">Logga in</a>
        {/if}
      </nav>
    </div>
  </header>

  <main class="app-main">
    <slot />
  </main>

  <footer class="app-footer">
    
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: linear-gradient(135deg, #0f172a, #020617);
    color: #e5e7eb;
  }

  .app-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    border-bottom: 1px solid rgba(148, 163, 184, 0.3);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(15, 23, 42, 0.8);
  }

  .app-header-inner {
    max-width: 960px;
    margin: 0 auto;
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .logo {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    margin: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .nav-links a {
    text-decoration: none;
    color: #cbd5f5;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    border: 1px solid transparent;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.08s ease;
  }

  .nav-links a:hover {
    background: rgba(30, 64, 175, 0.4);
    border-color: rgba(129, 140, 248, 0.5);
    transform: translateY(-1px);
  }

  /* Login/Logout styling (matchar dina pills/links) */
  .user-pill {
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.55);
    color: #e5e7eb;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .logout-form {
    margin: 0;
  }

  .nav-button,
  .nav-button-link {
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.55);
    color: #cbd5f5;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.08s ease;
  }

  .nav-button:hover,
  .nav-button-link:hover {
    background: rgba(30, 64, 175, 0.4);
    border-color: rgba(129, 140, 248, 0.5);
    transform: translateY(-1px);
  }

  .app-main {
    max-width: 960px;
    margin: 1.5rem auto 2.5rem;
    padding: 0 1.25rem;
    flex: 1;
  }

  .app-footer {
    text-align: center;
    padding: 0.75rem 1.25rem 1.25rem;
    font-size: 0.8rem;
    color: #9ca3af;
  }
</style>
