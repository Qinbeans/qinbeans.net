<script lang="ts">
    export let content: Array<string> = [];
    export let padding: string = "px-4 py-10";
    export let gap: string = "gap-4";
    export let height: string = "h-96";
    export let width: string = "w-full";
    export let scroll_padding: string = "px-4";
    // Inner content
    export let inner_class: string = "shrink-0 py-20 h-96 w-full";
    export let image_class: string = "h-52 w-full object-contain";
</script>


<div class="ca-scrollbar wsnap-x {scroll_padding} snap-mandatory scroll-smooth flex overflow-x-auto {padding} {gap} {height} {width}">
    {#each content as content, i}
        <div class="snap-start card text-center {inner_class}">
            <img src="{content}" alt="{i.toString()}" class="{image_class}">
        </div>
    {/each}
</div>

<style lang="postcss">
    /* restyle the scroll bar */
    .ca-scrollbar::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }
    .ca-scrollbar::-webkit-scrollbar-track {
        background: transparent;
        @apply rounded-lg;
    }
</style>