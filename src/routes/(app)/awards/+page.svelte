<script lang="ts">
	import Card from "$lib/components/card.svelte";
    import type { Award } from "$lib/scripts/types";
    const awards: Record<string, Award> = {
        "Go(Basic)": {
            from: "HackerRank",
            date: "2024-10-02",
            data: [
                "embed",
                "https://ajawtrubycbmbqfwkiyw.supabase.co/storage/v1/object/public/pub_imgs/golang_basic%20certificate.pdf?t=2024-02-11T04%3A10%3A13.405Z&navpane=0&scrollbar=0"
            ]
        },
    }
</script>
<div class="grid grid-cols-3 gap-3 grid-flow-row w-dvw py-14 px-[7%]">
    {#each Object.keys(awards) as award, i (i)}
        <Card
            title={award}
            author={awards[award].from}
            date={awards[award].date}
            enable_image={false}
            background="bg-black/25"
            color="text-white"
            inner_padding="px-[2%] h-full"
        >
            {#if awards[award].data[0] === "embed"}
                <embed src={awards[award].data[1]} height="80%" width="100%">
            {:else}
                {awards[award].data[1]}
            {/if}
        </Card>
    {/each}
</div>