<script lang="ts">
	import Card from "$lib/components/card.svelte";
	import { ProgressRadial, getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
    import { blogs } from "$lib/scripts/store";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const page = data.page;
    const num = data.per_page;

    let isLoadingMore = false;
    let allBlogsLoaded = false;
    let current_page = 0;

    const alertToast = getToastStore();
    let alertSettings: ToastSettings;

    const loadMore = async () => {
        if (isLoadingMore || allBlogsLoaded) return;
        isLoadingMore = true;
        current_page++;
        const res = await fetch(`${origin}/api/blog?page=${current_page}&per_page=${num}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { data: new_blogs, error } = await res.json();
        if (error) {
            alertSettings = {
                message: error,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        if (new_blogs.length === 0) {
            allBlogsLoaded = true;
            return;
        }
        if (new_blogs.length < num) {
            allBlogsLoaded = true;
        }
        $blogs = [...$blogs, ...new_blogs];
        isLoadingMore = false;
    }

    const loadPrevious = async () => {
        if (isLoadingMore || current_page === 1) return;
        isLoadingMore = true;
        current_page--;
        const res = await fetch(`${origin}/api/blog?page=${current_page}&per_page=${num}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { data: new_blogs, error } = await res.json();
        if (error) {
            alertSettings = {
                message: error,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        if (new_blogs.length === 0) {
            allBlogsLoaded = true;
            return;
        }
        if (new_blogs.length < num) {
            allBlogsLoaded = true;
        }
        $blogs = [...new_blogs, ...$blogs];
        isLoadingMore = false;
    }

    const reload = async () => {
        $blogs = [];
        if (isLoadingMore) return;
        isLoadingMore = true;
        const res = await fetch(`${origin}/api/blog?page=${current_page}&per_page=${num}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { data: new_blogs, error } = await res.json();
        if (error) {
            alertSettings = {
                message: error,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        if (new_blogs.length === 0) {
            allBlogsLoaded = true;
            return;
        }
        if (new_blogs.length < num) {
            allBlogsLoaded = true;
        }
        $blogs = [...new_blogs];
        isLoadingMore = false;
    }

    onMount(async () => {
        if ($blogs.length > 0) {
            if ($blogs.length % page < num) {
                allBlogsLoaded = true;
            }
            current_page = Math.ceil($blogs.length / num);
            return;
        }
        loadMore();
    });

</script>

<div class="flex flex-col gap-3 w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each $blogs as blog, i (i)}
        <Card
            title={blog.title}
            author="Ryan Fong"
            title_class="truncate text-3xl mb-2 p-1 bg-black/65 rounded-xl"
            date={blog.created_at}
            image={blog.image?blog.image:'/assets/placeholder.webp'}
            doc_type="article"
            inner_padding="px-[7%] py-1"
            image_class="w-full h-[24rem] object-cover rounded-2xl -z-20"
            height="h-[24rem]"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            article_class="flex justify-between px-3 py-1 bg-black/65 rounded-lg"
            extra_class="-translate-y-full"
        >
            <div class="rounded-xl text-left w-full bg-black/65 px-2 py-4 my-2 h-64 holder overflow-y-scroll text-ellipsis">
                {@html blog.content}
            </div>
        </Card>
    {/each}
    {#if !allBlogsLoaded}
        <div class="fixed top-0 left-0 h-dvh translate-y-1/2 w-dvw translate-x-1/2">
            <ProgressRadial class="w-10 h-10" />
        </div>
    {/if}
    <div class="z-10">
        <div class="flex justify-center gap-2">
            {#if !isLoadingMore}
                {#if $blogs.length != 0 && !allBlogsLoaded && current_page > 1}
                    <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45" on:click={loadPrevious} disabled={isLoadingMore}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>                      
                    </button>
                {/if}
                <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45" on:click={reload} disabled={isLoadingMore}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                {#if $blogs.length != 0 && !allBlogsLoaded}
                    <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45" on:click={loadMore} disabled={isLoadingMore}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>                      
                    </button>
                {/if}
            {:else}
                <div class="bg-black/25 frosty rounded px-5 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6 animate-spin">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>                      
                </div>
            {/if}
        </div>
    </div>
</div>