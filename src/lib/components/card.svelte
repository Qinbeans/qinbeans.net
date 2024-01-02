<script lang="ts">
    export let title = '';
    export let description = '';
    export let image = '/assets/placeholder.webp';
    export let author: string;
    export let date: string;
</script>

<div class="grid place-content-center card frosty py-2 px-2 bg-white/25">
    <img src={image} alt={title} class="object-cover object-center rounded-2xl"/>
    <div>
        <h1>{title}</h1>
        {#if description != null && description != ''}
            <p>{@html description}</p>
        {:else}
            <slot/>
        {/if}
        <div class="border-b border-black"></div>
        <div class="flex justify-between">
            <div class="flex items-center">
                <p class="text-gray-700 text-sm">by {author}</p>
            </div>
            <div class="flex items-center">
                <p class="text-gray-700 text-sm">{date}</p>
            </div>
        </div>
    </div>
</div>