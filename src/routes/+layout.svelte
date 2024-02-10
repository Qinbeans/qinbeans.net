<script lang="ts">
    import '$lib/styles/global.postcss';
    import { getModalStore, getToastStore, initializeStores, type ModalSettings } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { supabase } from "$lib/scripts/supabase";
    import { expiration, projects, blogs } from "$lib/scripts/store";
    import { storePopup, Toast, Modal } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    
    /** @type {import('./$types').LayoutServerData}*/
    export let data: any;
    const hash = data.unique_pass;
    
    initializeStores();
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    const modalStore = getModalStore();
    const toastStore = getToastStore();

    const requestLocation = async (msg: string | null = null) => {
        // set modal settings
        const modalSettings: ModalSettings ={
            type: 'confirm',
            title: 'Location Request',
            body: msg ? msg : 'I would like to know your location to better understand my audience. Is that okay?',
            buttonTextConfirm: 'Yes',
            buttonTextCancel: 'No',
            response: async (response) => {
                if (!response) {
                    // popup toast requesting location
                    toastStore.trigger({
                        message: 'Location not granted. Assuming anonymous.',
                        background: 'variant-filled-warning',
                        timeout: 5000
                    });
                }
                // if response is true, and location is not granted
                if (response) {
                    navigator.permissions.query({name:'geolocation'}).then(async (result) => {
                        if (result.state != 'granted') {
                            toastStore.trigger({
                                message: 'Open your browser settings to enable location services.',
                                background: 'variant-filled-warning',
                                timeout: 5000
                            });
                        }
                    });
                }
            }
        };
        modalStore.trigger(modalSettings);
    }

    onMount(async () => {
        if (typeof($expiration) === "string") {
            $expiration = new Date($expiration);
        }
        // check if user has location enabled
        navigator.permissions.query({name:'geolocation'}).then(async (result) => {
            if (result.state != 'granted') {
                toastStore.trigger({
                    message: 'Location not granted. Assuming anonymous.',
                    background: 'variant-filled-warning',
                    timeout: 5000
                });
            }
        });
        if (!$expiration || $expiration.getTime() < Date.now() - 86400000) {
            // get user ip address
            // if ip == null, then assume anonymous
            const now = new Date();

            navigator.permissions.query({name:'geolocation'}).then(async (result) => {
                if (result.state != 'granted') {
                    requestLocation();
                }
            });

            navigator.geolocation.getCurrentPosition(async (position) => {
                // Request conversion of the user's location to a human-readable address, but we only need state and country
                // https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1
                // Let's also fuzz the location by a few miles since we don't need exact location. We can do this by omitting a few decimal
                //  places from the latitude and longitude.
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude.toFixed(1)}&lon=${position.coords.longitude.toFixed(1)}&zoom=18&addressdetails=1`)
                    .then(response => response.json())
                    .then(async (data) => {
                        const location = {
                            state: data.address.state,
                            country: data.address.country
                        };
                        console.log(location);
                        const {data: _, error} = await supabase.from("unique_visitors").insert({ hash, date: now.toISOString().split("T")[0], location });
                        if (error) {
                            console.error(error);
                            return;
                        }
                    });
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
</script>
<Toast/>
<Modal/>
<slot/>
