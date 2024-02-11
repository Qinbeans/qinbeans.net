<!-- render the full compiled markdown -->
<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { projects } from "$lib/scripts/store";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

    /** @type {import('./$types').PageServerData} */
    export let data: any;
    onMount(async () => {
        if ($projects.length > 0) {
            data.project = data.project % $projects.length;
            return;
        }
        // get page number
        const page_num = Math.floor(data.project / 5) + 1;
        const res = await fetch(`${data.origin}/api/projects?page=${page_num}&per_page=5`);
        // get remainder
        data.project = data.project % 5;
        $projects = await res.json();
    });

</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw py-14 px-[15%]">
    {#if $projects.length == 0}
        <div class="fixed top-0 left-0 h-dvh translate-y-1/2 w-dvw translate-x-1/2">
            <ProgressRadial width="w-24" class="-translate-y-1/2 -translate-x-1/2" track="stroke-white/25" meter="stroke-red-500/35"/>
        </div>
    {:else}
        <Card title="{$projects[data.project].author}/{$projects[data.project].name}" inner_padding="px-14 py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-full" inner_width="w-full" enable_image={false}>
            <div class="mt-2 py-2 px-4 bg-black/25 rounded-xl">
                {@html $projects[data.project].readme.full}
            </div>
        </Card>
    {/if}
</div>