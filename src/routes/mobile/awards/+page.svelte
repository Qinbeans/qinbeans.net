<script lang="ts">
    import Card from "$lib/components/card.svelte";
    
	import type { Award } from "$lib/scripts/supabase";
	import { onMount } from "svelte";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const awards: Award[] = data.awards;
    let iframes: Array<HTMLIFrameElement> = new Array(awards.length);

    const responsiveIframe = (evt: Event) => {
        const iframe = evt.target as HTMLIFrameElement;
        if (iframe) {
            const height = iframe.contentWindow?.document.body.scrollHeight;
            iframe.style.height = `${height}px`;
        }
    };

    onMount(() => {
        iframes.forEach((iframe) => {
            if (iframe) {
                iframe.addEventListener("load", responsiveIframe);
            }
        });
    });
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each awards as award, i (i)}
        <Card
            title={award.title}
            author={award.from}
            date={new Date(award.date).toLocaleDateString()}
            title_class="text-3xl truncate"
            inner_padding="px-[5%] py-1 h-full"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            enable_image={false}
        >
            {#if award.data[0] === "embed"}
                <iframe bind:this={iframes[i]} title={award.title} src={award.data[1]} height="80%" width="100%" class="overflow-hidden" frameborder="0"/>
            {:else}
                {award.data[1]}
            {/if}
        </Card>
    {/each}
</div>