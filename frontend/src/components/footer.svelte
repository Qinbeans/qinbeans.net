<script lang="ts">
  //footer, li, img
  let innerWidth = globalThis.innerWidth;
  let innerHeight = globalThis.innerHeight;
  let height = 32;
  let format = ["","","","",""]
  const checkResize = () => {
    if(innerWidth < 500 && innerWidth < innerHeight){
      format = ["bottom-1","mr-1 ml-1","w-4 h-4","text-xs","text-sm"]
      height = 16;
    }else if(innerWidth < 1415){
      format = ["bottom-3","mr-2 ml-2","w-5 h-5","text-sm","text-md"]
      height = 24;
    }else{
      format = ["bottom-5","mr-4 ml-4","w-9 h-9","text-lg","text-2xl"]
      height = 32;
    }
  }
  checkResize();
</script>
<svelte:window
  on:resize={checkResize}
  bind:innerHeight
  bind:innerWidth
/>
<footer class="fixed w-screen pointer-events-none {format[0]}">
  <!-- make horizontal list -->
  <div class="text-center justify-center pointer-events-auto">
    <ul class="flex justify-center">
      <li class="{format[1]}">
        <a href="https://svelte.dev">
          <img height={height} class="rounded-md {format[2]}" src="/logos/svelte.png" alt="svelte">
        </a>
      </li>
      <li class="{format[1]}">
        <a href="https://tailwindcss.com">
          <img height={height} class="rounded-md {format[2]}" src="/logos/tailwind.png" alt="tailwind">
        </a>
      </li>
      <li class="{format[1]}">
        <a href="https://vitejs.dev">
          <img height={height} class="rounded-md {format[2]}" src="/logos/vite.jpg" alt="vite">
        </a>
      </li>
      <li class="{format[1]}">
        <a href="https://go.dev">
          <img height={height} class="rounded-md {format[2]}" src="/logos/go.jpg" alt="golang">
        </a>
      </li>
      <li class="{format[1]}">
        <a href="https://gin-gonic.com">
          <img height={height} class="rounded-md {format[2]}" src="/logos/gin.png" alt="gin">
        </a>
      </li>
      <li class="{format[1]}">
        <a href="https://astro.build/">
          <img height={height} class="rounded-md {format[2]}" src="/logos/astro.png" alt="astro">
        </a>
      </li>
    </ul>
    <a href="https://github.com/kika/fixedsys" class="{format[3]} text-white">
      @Kika for Fixedsys
    </a>
    <br>
    <span class="{format[4]} text-white">Made By Ryan Fong</span>
  </div>
</footer>