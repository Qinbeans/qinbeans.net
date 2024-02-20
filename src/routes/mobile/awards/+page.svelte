<script lang="ts">
    import Card from "$lib/components/card.svelte";
    
	import type { Award } from "$lib/scripts/supabase";
	import { onMount } from "svelte";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const awards: Award[] = data.awards;

    let canViewSecrets = false;

    onMount(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                canViewSecrets = result.state === "granted";
            });
        }
    });
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each awards as award, i (i)}
        <Card
            title={award.title}
            author={award.from}
            date={new Date(award.date).toLocaleDateString()}
            title_class="text-3xl truncate"
            inner_padding="px-[5%] py-1 h-[80%]"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            enable_image={false}
        >
            {#if award.data[0] === "embed"}
                <object title={award.title} data={award.data[1]} type="application/pdf" class="w-full h-full">
                    <span class="text-center">Your browser does not support PDFs. <a href="/contact">Contact me for further information</a></span>
                </object>
            {:else if award.data[0] === "embed(secret)"}
                <!-- requires location services -->
                {#if canViewSecrets}
                    <object title={award.title} data={award.data[1]} type="application/pdf" class="w-full h-full">
                        <span class="text-center">Your browser does not support PDFs. <a href="/contact">Contact me for further information</a></span>
                    </object>
                {:else}
                    <p class="text-center bg-black/25 p-2 rounded-md text-white">Location services are disabled, as this contains information I'd like to keep private. I would appreciate knowing who requests access to my files.</p>
                {/if}
            {/if}
        </Card>
    {/each}
</div>