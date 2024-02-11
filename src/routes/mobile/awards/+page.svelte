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

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each Object.keys(awards) as award, i (i)}
        <Card
            title={award}
            author={awards[award].from}
            date={awards[award].date}
            title_class="text-3xl truncate"
            inner_padding="px-[5%] py-1 h-full"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            enable_image={false}
        >
            {#if awards[award].data[0] === "embed"}
                <iframe title={award} src={awards[award].data[1]} height="80%" width="100%"/>
            {:else}
                {awards[award].data[1]}
            {/if}
        </Card>
    {/each}
</div>