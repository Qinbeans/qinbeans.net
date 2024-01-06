<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { projects } from "$lib/scripts/store";
	import { onMount } from "svelte";
    import { ProgressRadial, Toast, getToastStore, type ToastSettings  } from '@skeletonlabs/skeleton';

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const origin = data.origin;

    let parent: HTMLDivElement;
    let current_page = 1;

    let isLoadingMore = false;
    let allProjectsLoaded = false;

    const alertToast = getToastStore();
    let alertSettings: ToastSettings;

    onMount(async () => {
        if ($projects.length > 0) {
            current_page = Math.ceil($projects.length / 5);
            console.log('Current page:', current_page);
            return;
        }
        const res = await fetch(origin+'/api/projects?page=1&per_page=5');
        const data = await res.json();
        $projects = data;
    });

    const loadMore = async () => {
        isLoadingMore = true;
        console.log('Loading more projects for page', current_page + 1, '...');
        try {
            const res = await fetch(`${origin}/api/projects?page=${current_page + 1}&per_page=5`);
            if (!res.ok) {
                throw new Error('Failed to fetch more projects');
            }
            const data = await res.json();

            if (data.length > 0) {
                $projects = [...$projects, ...data];
                console.log($projects);
                current_page++;
            } else {
                allProjectsLoaded = true; // No more projects to load
            }
        } catch (error: any) {
            alertSettings = {
                message: error.message,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
        }
        isLoadingMore = false;
    };

</script>

<Toast />

<div bind:this={parent} class="grid grid-cols-1 gap-3 grid-flow-row w-dvw py-24 px-96">
    {#each $projects as page, i (i)}
        <Card title='{page.author}/{page.name}' inner_padding="px-14 py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-fill" inner_width="w-full" enable_image={false}>
            <a href="/projects/render/{i}">
                <div class="bg-black/75 text-left rounded-xl p-2 mt-2 h-fit w-full">
                    {@html page.readme.short}
                </div>
            </a>
            <span class="text-right text-white text-xs mt-2">Last updated: {page.updated_at}</span>
        </Card>
    {:else}
        <div class="fixed top-0 left-0 h-dvh translate-y-1/2 w-dvw translate-x-1/2">
            <ProgressRadial width="w-24" class="-translate-y-1/2 -translate-x-1/2" track="stroke-white/25" meter="stroke-red-500/35"/>
        </div>
    {/each}
    {#if $projects.length != 0 && !allProjectsLoaded}
    <div class="flex justify-center items-center">
        <button class="bg-black/25 hover:bg-black/45 mx-[25%] frosty text-white rounded-xl p-2 mt-2 h-fit w-full"
                on:click={loadMore} disabled={isLoadingMore}>
                {#if isLoadingMore}
                    Loading...
                {:else}
                    Load more
                {/if}
            </button>
        </div>
    {/if}
</div>