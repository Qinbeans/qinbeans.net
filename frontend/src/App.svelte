<script lang="ts">
  import Navbar from "./lib/navbar.svelte";
  import About from "./lib/about.svelte";
  import Docs from "./lib/docs.svelte";
  import Blog from "./lib/blog.svelte";
  import Contact from "./lib/contact.svelte";
  import { current } from "./ts/store";

  let state = 0;
  current.subscribe(x => state = x);
</script>

<Navbar></Navbar>
<main>
  {#if state == 0}
    <About></About>
  {:else if state == 1}
    <Docs></Docs>
  {:else if state == 2}
    <Blog></Blog>
  {:else if state == 3}
    <Contact></Contact>
  {:else}
    <About></About>
  {/if}
</main>