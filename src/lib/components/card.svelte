<script lang="ts">
    import { DOC_TYPES } from "$lib/scripts/constants";

    export let title = '';
    export let description = '';
    export let image = '/assets/placeholder.webp';
    export let author: string;
    export let date: string;
    export let enable_image: boolean = true;
    export let doc_type: string = 'article';

    export let background: string = "bg-white/25";
    export let color: string = "text-black";
    export let padding: string = "p-2";
    export let height: string = "h-96";
    export let width: string = "w-96";
    export let margin: string = "m-2";

    export let inner_padding: string = "p-2";

    // check if doc_type is in DOC_TYPES
    if (!DOC_TYPES.includes(doc_type)) {
        throw new Error(`Invalid doc_type: ${doc_type}`);
    }
</script>

<div class="grid place-content-center card frosty {padding} {margin} {background} {color} {height} {width}">
    {#if enable_image}
        <img src={image} alt={title} class="object-cover object-center rounded-2xl"/>
    {/if}
    <div class="{inner_padding}">
        <h1 class="text-center">{title}</h1>
        <div class="border-b border-black"></div>
        {#if description != null && description != ''}
            <p>{@html description}</p>
        {:else}
            <slot/>
        {/if}
        {#if doc_type == "article"}
            <div class="border-b border-black"></div>
            <div class="flex justify-between">
                <div class="flex items-center">
                    <p class="text-sm">by {author}</p>
                </div>
                <div class="flex items-center">
                    <p class="text-sm">{date}</p>
                </div>
            </div>
        {/if}
    </div>
</div>