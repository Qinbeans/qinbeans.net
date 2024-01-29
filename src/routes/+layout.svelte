<script lang="ts">
    import '$lib/styles/global.css';
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { supabase } from "$lib/scripts/supabase";
    import { expiration, projects, blogs } from "$lib/scripts/store";
    import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    
    /** @type {import('./$types').LayoutServerData}*/
    export let data: any;
    const hash = data.unique_pass;
    onMount(async () => {
        if (typeof($expiration) === "string") {
            $expiration = new Date($expiration);
        }
        if (!$expiration || $expiration.getTime() < Date.now() - 86400000) {
            // get user ip address
            // if ip == null, then assume anonymous
            const now = new Date();
            navigator.geolocation.getCurrentPosition(async (position) => {
                const longlat = { long: position.coords.longitude, lat: position.coords.latitude };
                console.log(longlat);
                // yyyy-mm-dd
                const {data: _, error} = await supabase.from("unique_visitors").insert({ hash, date: now.toISOString().split("T")[0], location: longlat });
                if (error) {
                    console.error(error);
                    return;
                }
            }, async () => {
                // yyyy-mm-dd
                const {data: _, error} = await supabase.from("unique_visitors").insert({ hash, date: now.toISOString().split("T")[0] });
                if (error) {
                    console.error(error);
                    return;
                }
            });
            $expiration = now;
            // empty projects and blogs
            $projects = [];
            $blogs = [];
        }
    });
    initializeStores();
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>
<slot/>
