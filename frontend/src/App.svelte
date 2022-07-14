<script lang="ts">
  import Navbar from "./lib/navbar.svelte";
  import About from "./lib/about.svelte";
  import Docs from "./lib/docs.svelte";
  import Blog from "./lib/blog.svelte";
  import Contact from "./lib/contact.svelte";
  import { current } from "./ts/store";
  import { State as AppState } from "./ts/types";

  let state = 0;
  current.subscribe(x => state = x);
</script>

<Navbar></Navbar>
<main>
  {#if state == AppState.ABOUT}
    <About></About>
  {:else if state == AppState.DOCS}
    <Docs></Docs>
  {:else if state == AppState.BLOG}
    <Blog></Blog>
  {:else if state == AppState.CONTACT}
    <Contact></Contact>
  {:else}
    <About></About>
  {/if}
</main>