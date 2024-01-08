<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { projects } from "$lib/scripts/store";
	import { onMount } from "svelte";
    import { ProgressRadial, Toast, getToastStore, type ToastSettings, type AutocompleteOption, Autocomplete, type PopupSettings, popup  } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";
	
    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const origin = data.origin;

    let parent: HTMLDivElement;
    let current_page = 1;

    let isLoadingMore = false;
    let allProjectsLoaded = false;

    // Alert assets
    const alertToast = getToastStore();
    let alertSettings: ToastSettings;

    // Search assets
    let options:AutocompleteOption<string>[] = [];
    let searchValue = '';
    let searchUrl = '';
    let searchAnchor: HTMLAnchorElement;
    const searchPopup: PopupSettings = {
        event: 'focus-click',
        target: 'searchPopup',
        placement: 'bottom',
    };

    onMount(async () => {
        if ($projects.length > 0) {
            current_page = Math.ceil($projects.length / 5);
            options = $projects.map((project, index) => {
                return {
                    label: `${project.author}/${project.name}`,
                    value: `/projects/render/${index}`,
                    keywords: `${project.author}, ${project.name}, ${project.updated_at}, ${project.created_at}, ${project.readme.full}`,
                    meta: {
                        healthy: true,
                    }
                }
            });
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

    const selectionHandler = (event: CustomEvent<AutocompleteOption<string>>) => {
        searchValue = event.detail.label;
        searchUrl = event.detail.value;
    }

    const searchInput = () => {
        if (searchUrl == '') {
            alertSettings = {
                message: 'Cannot find project from currently loaded projects. Try loading more projects first.',
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        searchAnchor.click();
    }


</script>

<Toast />
<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#if $projects.length != 0}
        <form id="autocomplete" autocomplete="off" class="frosty bg-black/25 p-2 m-2 rounded-xl flex gap-2" on:submit={searchInput}>
            <input required name="autocomplete-search" type="text" class="w-full text-white bg-black/45 px-4 py-1 rounded-xl" use:popup={searchPopup} placeholder="Search for a project..." bind:value={searchValue} />
            <button type="submit" class="hover:bg-black/75 bg-black/45 text-white px-2 py-1 rounded-xl"> Search </button>
            <a bind:this={searchAnchor} href="{searchUrl}" target="_blank" class="hidden"> </a>
        </form>
        <div class="h-32 w-4/5 holder overflow-x-hidden z-50 bg-black/75 rounded-xl" data-popup="searchPopup">
            <Autocomplete class="text-white" bind:input={searchValue} options={options} on:selection={selectionHandler} />
        </div>
    {/if}
    {#each $projects as page, i (i)}
        <Card title='{page.author}/{page.name}' title_class="text-3xl overflow-ellipsis" inner_padding="px-[7%] py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-fill" inner_width="w-full" enable_image={false}>
            <iframe src="/api/projects/{i}" class="mt-2 w-full h-64 mb-2 rounded-xl" title={page.name} frameborder="0"></iframe>
            <span class="text-right text-white text-xs">Last updated: {page.updated_at}</span>
            <br>
            <a href="{page.url}" target="_blank" class="bg-black/25 hover:bg-black/45 frosty text-white rounded-xl py-1 px-2 h-fit w-full">
                View on GitHub
            </a>
            <a href="/projects/render/{i}" target="_blank" class="bg-black/25 hover:bg-black/45 frosty text-white rounded-xl py-1 px-2 h-fit w-full">
                View project
            </a>
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
<style>
    p {
        @apply text-sm;
    }
    h2 {
        @apply text-xl;
    }
    h3 {
        @apply text-lg;
    }
</style>