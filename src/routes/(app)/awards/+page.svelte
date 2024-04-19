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
<div class="grid grid-cols-3 gap-3 grid-flow-row w-dvw py-14 px-[7%]">
    {#each $awards as award, i (i)}
        <Card
            title={award.title}
            title_class="text-4xl truncate"
            author={award.from}
            date={award.date}
            enable_image={false}
            background="bg-black/25"
            color="text-white"
            inner_padding="px-[2%] h-full"
            width="w-full"
        >
            {#if award.data[0] === "embed"}
                <embed src={award.data[1]+"#toolbar=0&navpanes=0&scrollbar=0"} height="80%" width="100%">
            {:else if award.data[0] === "embed(secret)"}
                <!-- requires location services -->
                {#if canViewSecrets}
                    <embed src={award.data[1]+"#toolbar=0&navpanes=0&scrollbar=0"} height="80%" width="100%">
                {:else}
                    <p class="text-center bg-black/25 p-2 rounded-md text-white">Location services are disabled. As this contains information I'd like to keep relatively private, I would appreciate access to location.</p>
                {/if}
            {/if}
        </Card>
    {:else}
        {#if isLoadingMore}
            <div class="flex justify-center items-center h-[80vh]">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        {/if}
        {#if allAwardsLoaded}
            <div class="flex justify-center items-center h-[80vh]">
                <h1 class="text-3xl text-gray-500">No awards to show</h1>
            </div>
        {/if}
    {/each}
</div>