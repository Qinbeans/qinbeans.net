<script lang="ts">
    import { DOC_TYPES } from "$lib/scripts/constants";
	import { Accordion } from "@skeletonlabs/skeleton";

    export let title = '';
    export let title_class = '';
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
    export let image_class: string = "object-cover object-center rounded-2xl";
    export let article_class: string = "flex justify-between";

    export let inner_padding: string = "p-2";
    export let inner_width: string = "w-full";

    // check if doc_type is in DOC_TYPES
    if (!DOC_TYPES.includes(doc_type)) {
        throw new Error(`Invalid doc_type: ${doc_type}`);
    }
</script>

<div class="card frosty {padding} {margin} {background} {color} {height} {width}">
    {#if enable_image}
        <img src={image} alt={title} class="{image_class}"/>
    {/if}    
    <div class="{inner_padding} {inner_width}">
        {#if title != null && title != ''}
            <h1 class="text-center {title_class}">{title}</h1>
            <div class="border-b border-black"></div>
        {/if}
        {#if doc_type == "accordion"}
            <Accordion>
                <slot/>
            </Accordion>
        {:else}
            {#if description != null && description != ''}
                <p>{@html description}</p>
            {:else}
                <slot/>
            {/if}
            {#if doc_type == "article"}
                <div class="{article_class}">
                    <div class="flex items-center">
                        <p class="text-sm">by {author}</p>
                    </div>
                    <div class="flex items-center">
                        <p class="text-sm">{date}</p>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>