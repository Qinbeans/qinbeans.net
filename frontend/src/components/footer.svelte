<script lang="ts">
  let height = 32;
</script>
<footer class="fixed w-screen pointer-events-none bottom-1 sm:bottom-5 ">
  <!-- make horizontal list -->
  <div class="text-center justify-center pointer-events-auto">
    <ul class="flex justify-center">
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://svelte.dev">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/svelte.png" alt="svelte">
        </a>
      </li>
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://tailwindcss.com">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/tailwind.png" alt="tailwind">
        </a>
      </li>
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://vitejs.dev">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/vite.jpg" alt="vite">
        </a>
      </li>
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://go.dev">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/go.jpg" alt="golang">
        </a>
      </li>
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://gin-gonic.com">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/gin.png" alt="gin">
        </a>
      </li>
      <li class="mr-1 ml-1 sm:mr-4 sm:ml-4">
        <a href="https://astro.build/">
          <img height={height} width={height} class="rounded-md border-solid border-pink-500 hover:border-2" src="/logos/astro.png" alt="astro">
        </a>
      </li>
    </ul>
    <a href="https://github.com/kika/fixedsys" class="text-xs sm:text-lg hover:border-2 rounded-lg border-pink-500 text-white">
      @Kika for Fixedsys
    </a>
    <br>
    <span class="text-sm sm:text-2xl text-white">Made By Ryan Fong</span>
  </div>
</footer>