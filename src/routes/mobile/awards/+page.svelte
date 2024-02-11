<script lang="ts">
    import Card from "$lib/components/card.svelte";
    
	import type { Award } from "$lib/scripts/supabase";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const awards: Award[] = data.awards;
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each awards as award, i (i)}
        <Card
            title={award.title}
            author={award.from}
            date={award.date}
            title_class="text-3xl truncate"
            inner_padding="px-[5%] py-1 h-full"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            enable_image={false}
        >
            {#if award.data[0] === "embed"}
                <iframe title={award.title} src={award.data[1]} height="80%" width="100%"/>
            {:else}
                {award.data[1]}
            {/if}
        </Card>
    {/each}
</div>