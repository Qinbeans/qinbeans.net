<script lang="ts">
    import '$lib/styles/global.css';
    import { initializeStores } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { supabase } from "$lib/scripts/supabase";
    import { expirtation, projects, blogs } from "$lib/scripts/store";

    /** @type {import('./$types').LayoutServerData}*/
    export let data: any;
    const hash = data.unique_pass;
    onMount(async () => {
        if (!$expirtation || $expirtation.getTime() < Date.now() - 86400000) {
            // get user ip address
            // if ip == null, then assume anonymous
            const now = new Date();
            // yyyy-mm-dd
            const {data: _, error} = await supabase.from("unique_visitors").insert({ hash, date: now.toISOString().split("T")[0] });
            if (error) {
                console.error(error);
                return;
            }
            $expirtation = now;
            // empty projects and blogs
            $projects = [];
            $blogs = [];
        }
    });
    initializeStores();
    import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>
<slot/>
