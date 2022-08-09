<script lang="ts">
  import Navbar from "./lib/navbar.svelte";
  import About from "./lib/about.svelte";
  import Docs from "./lib/docs.svelte";
  import Blog from "./lib/blog.svelte";
  import Contact from "./lib/contact.svelte";
  import Error from "./error/error.svelte";
  import { current } from "./ts/store";
  import { State as AppState } from "./ts/types";
  import { pong } from "./ts/verify";
  import type { Error as RequestError } from "./ts/types"
  import { getClient, clearClient } from "./ts/client";

  let state = 0;
  current.subscribe(x => state = x);
  export let pos_err: RequestError = null;

  pong().catch(e => {
    pos_err = {
      type: "500",
      message: "Oops, the hamsters took a break.  Let's wait until they come back."
    }
    current.update(x => {
      x = AppState.ERROR
      clearClient()
      return x
    });
    state = -1;
  })
  getClient()

  
</script>
{#if state != AppState.ERROR}
  <Navbar></Navbar>
{/if}

<main>
  {#if state == AppState.ABOUT}
    <About></About>
  {:else if state == AppState.DOCS}
    <Docs></Docs>
  {:else if state == AppState.BLOG}
    <Blog></Blog>
  {:else if state == AppState.CONTACT}
    <Contact></Contact>
  {:else if state == AppState.ERROR}
    <Error type="{pos_err.type}" message="{pos_err.message}"></Error>
  {:else}
    <About></About>
  {/if}
</main>
