<!-- Sanitize -->
<script lang="ts">
    import Error from "../assets/error.webp";
    import { current } from "../ts/store";
    import { errMap } from "../ts/types";
    import { updateClient } from "../ts/utils";
    import { onMount } from "svelte";
    import type { Error as EStat } from "../ts/types";
    import init, { update_url } from "../wasm-lib/pkg";

    export let err: EStat;
    if (err === undefined) {
        let tmp = errMap.get("500")
        if(tmp != undefined)
            err = tmp;
    }
    if (err.type === undefined) {
        let tmp = errMap.get("400")
        if(tmp != undefined)
            err = tmp;
    }
    const go_home = () => {
        if(err.type != "500"){
            // change state
            current.update((x) => {
                x.state = 0;
                return x;
            });
            // update client
            updateClient();
            init().then(() => {
                update_url(0, true);
            })
        }
    };
    onMount(() => {
        if(err.type != "500"){
            let baozi = document.getElementById("baozi")
            if(baozi)
                baozi.style.cursor = "pointer"
        }
    });
</script>
<div class="w-screen h-screen grid place-content-center text-center">
    <div class="text-red-500 text-5xl">
        Error-{err.type}
    </div>
    <span class="text-xl dark:text-white text-gray-900">
        {err.message}
    </span>
    <div class="flex justify-center w-screen">
        <img id="baozi" width="100" src="{Error}" alt="baozi" on:click={go_home}>
    </div>
</div>