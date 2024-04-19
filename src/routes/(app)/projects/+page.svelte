<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { projects } from "$lib/scripts/store";
	import { onMount } from "svelte";
    import { ProgressRadial, getToastStore, type ToastSettings, type AutocompleteOption, Autocomplete, type PopupSettings, popup  } from '@skeletonlabs/skeleton';
	
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
        if (data.error || res.status != 200) {
            data.error = data.error || 'Failed to fetch projects';
            console.error(data.error);
            alertSettings = {
                message: data.error,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        $projects = data;
    });

    const loadMore = async () => {
        isLoadingMore = true;
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

    const reload = async () => {
        $projects = [];
        current_page = 1;
        if (isLoadingMore) return;
        isLoadingMore = true;
        try {
            const res = await fetch(`${origin}/api/projects?page=${current_page}&per_page=5`);
            if (!res.ok) {
                throw new Error('Failed to fetch more projects');
            }
            const data = await res.json();

            if (data.length > 0) {
                $projects = [...data];
                current_page = 1;
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

<div bind:this={parent} class="flex flex-col gap-3 grid-flow-row w-dvw py-14 px-[15%]">
    {#if $projects.length != 0}
        <form id="autocomplete" autocomplete="off" class="frosty bg-black/25 px-14 py-4 rounded-xl w-full flex gap-2" on:submit={searchInput}>
            <input required name="autocomplete-search" type="text" class="w-full text-white bg-black/45 px-4 py-1 rounded-xl" use:popup={searchPopup} placeholder="Search for a project..." bind:value={searchValue} />
            <button type="submit" class="hover:bg-black/75 bg-black/45 text-white px-2 py-1 rounded-xl"> Search </button>
            <a bind:this={searchAnchor} href="{searchUrl}" target="_blank" class="hidden"> </a>
        </form>
        <div class="h-32 w-3/5 holder overflow-x-hidden z-50 bg-black/75 rounded-xl" data-popup="searchPopup">
            <Autocomplete class="text-white" bind:input={searchValue} options={options} on:selection={selectionHandler} />
        </div>
    {/if}
    {#each $projects as page, i (i)}
        <Card title='{page.author}/{page.name}' title_class="truncate" inner_padding="px-14 py-4" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-fill" inner_width="w-full" enable_image={false}>
            <iframe src="/api/projects/{i}" class="mt-2 w-full h-64 mb-2 rounded-xl" title={page.name} frameborder="0"></iframe>
            <span class="text-right text-white text-xs">Last updated: {page.updated_at}</span>
            <a href="{page.url}" target="_blank" class="bg-black/25 hover:bg-black/45 frosty text-white rounded-xl py-1 px-2 h-fit w-full">
                View on GitHub
            </a>
            {#if page.readme.full != ''}
                <a href="/projects/render/{i}" target="_blank" class="bg-black/25 hover:bg-black/45 frosty text-white rounded-xl py-1 px-2 h-fit w-full">
                    View project
                </a>
            {/if}
        </Card>
    {:else}
        <div class="fixed top-0 left-0 h-dvh translate-y-1/2 w-dvw translate-x-1/2">
            <ProgressRadial width="w-24" class="-translate-y-1/2 -translate-x-1/2" track="stroke-white/25" meter="stroke-red-500/35"/>
        </div>
    {/each}
    {#if $projects.length != 0 && !allProjectsLoaded}
        <div class="flex justify-center items-center gap-2">
            {#if !isLoadingMore}
                <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45" on:click={reload} disabled={isLoadingMore}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
            {:else}
                <div class="bg-black/25 frosty rounded px-5 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6 animate-spin">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>                      
                </div>
            {/if}
            <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45"
                on:click={loadMore} disabled={isLoadingMore}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </button>
        </div>
    {/if}
</div>