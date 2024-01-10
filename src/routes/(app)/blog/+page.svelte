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

<div class="grid grid-cols-3 gap-3 grid-flow-row w-dvw py-14 px-[15%]">
    {#each $blogs as blog, i (i)}
        <Card
            title={blog.title}
            author="Ryan Fong"
            title_class="truncate mb-2 p-1 bg-black/65 rounded-2xl"
            date={blog.created_at}
            image={blog.image?blog.image:'/assets/placeholder.webp'}
            doc_type="article"
            inner_padding="px-[2%] py-4"
            image_class="absolute w-full h-full object-cover rounded-2xl -z-20"
            height="h-fill"
            background="bg-black/25"
            color="text-white"
            width="w-fill"
            inner_width="w-full"
            article_class="flex justify-between px-3 py-1 bg-black/65 rounded-lg"
        >
            <div class="rounded-xl w-full bg-black/65 px-2 py-4 my-2 h-64 holder overflow-y-scroll text-ellipsis">
                {@html blog.content}
            </div>
        </Card>
    {:else}
        <div class="fixed top-0 left-0 h-dvh translate-y-1/2 w-dvw translate-x-1/2">
            <ProgressRadial width="w-24" class="-translate-y-1/2 -translate-x-1/2" track="stroke-white/25" meter="stroke-red-500/35"/>
        </div>
    {/each}
    <div class="col-span-3 z-10">
        {#if $blogs.length != 0 && !allBlogsLoaded}
            <div class="flex justify-center gap-2">
                <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>                      
                </button>
                <button class="bg-black/25 frosty rounded px-5 py-1 hover:bg-black/45">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>                      
                </button>
            </div>
        {/if}
    </div>
</div>