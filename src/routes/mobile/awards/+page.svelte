<script lang="ts">
    import Card from "$lib/components/card.svelte";
	import { awards } from "$lib/scripts/store";
	import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

    /** @type {import('./$types').PageServerData}*/
    export let data: any;

    const origin = data.origin;

    let isLoadingMore = false;
    let allAwardsLoaded = false;

    let canViewSecrets = false;

    const alertToast = getToastStore();
    let alertSettings: ToastSettings;

    const loadAwards = async () => {
        if (isLoadingMore || allAwardsLoaded) return;
        isLoadingMore = true;
        const res = await fetch(`${origin}/api/awards`,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { data: new_awards, error } = await res.json();
        if (error) {
            console.error(error);
            alertSettings = {
                message: error,
                background: "variant-filled-error",
                timeout: 5000
            }
            alertToast.trigger(alertSettings);
            return;
        }
        if (new_awards.length === 0) {
            allAwardsLoaded = true;
            return;
        }
        if (new_awards.length < 5) {
            allAwardsLoaded = true;
        }
        $awards = [...$awards, ...new_awards];
        console.log($awards.length);
        isLoadingMore = false;
    };

    onMount(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                canViewSecrets = result.state === "granted";
            });
        }
        if ($awards.length > 0) {
            return;
        }
        loadAwards();
    });
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-scroll scroll-smooth">
    {#each $awards as award, i (i)}
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
                    <p class="text-center bg-black/25 p-2 rounded-md text-white">Location services are disabled. As this contains information I'd like to keep relatively private, I would appreciate access to location.</p>
                {/if}
            {/if}
        </Card>
    {:else}
        {#if isLoadingMore}
            <div class="w-full h-20 flex justify-center items-center">
                <div class="loader"></div>
            </div>
        {/if}
        {#if allAwardsLoaded}
            <div class="w-full h-20 flex justify-center items-center">
                <h1 class="text-3xl text-gray-500">No awards to show</h1>
            </div>
        {/if}
    {/each}
</div>