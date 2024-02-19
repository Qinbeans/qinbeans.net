<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import type { Award } from "$lib/scripts/supabase";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const awards: Award[] = data.awards;
</script>
{#if !awards.length}
    <div class="flex justify-center items-center h-[80vh]">
        <h1 class="text-3xl text-gray-500">No awards to show</h1>
    </div>
{:else}
    <div class="grid grid-cols-[repeat(3,1fr)] gap-3 grid-flow-row w-dvw py-14 px-[7%]">
        {#each awards as award, i (i)}
            <Card
                title={award.title}
                title_class="text-4xl truncate"
                author={award.from}
                date={new Date(award.date).toLocaleDateString()}
                enable_image={false}
                background="bg-black/25"
                color="text-white"
                inner_padding="px-[2%] h-full"
                width="w-full"
            >
                {#if award.data[0] === "embed"}
                    <embed src={award.data[1]+"#toolbar=0&navpanes=0&scrollbar=0"} height="80%" width="100%">
                {:else}
                    {award.data[1]}
                {/if}
            </Card>
        {/each}
    </div>
{/if}