<!-- Sanitize -->
<script lang="ts">
    import Error from "../assets/error.svg";
    import { current } from "../ts/store";
    import { State } from "../ts/types";
    import { updateClient, updateURL } from "../ts/utils";
    import { onMount } from "svelte";

    export let type: string;
    export let message: string;
    const go_home = () => {
        if(type != "500"){
            // change state
            current.set(State.ABOUT);
            // update client
            updateClient();
            updateURL(State.ABOUT);
        }
    };
    onMount(() => {
        console.log("click")
        if(type != "500"){
            let baozi = document.getElementById("baozi")
            if(baozi)
                baozi.style.cursor = "pointer"
        }
    });
</script>
<div class="w-screen h-screen grid place-content-center text-center">
    <div class="text-red-500 text-5xl">
        Error-{type}
    </div>
    <span class="text-xl dark:text-white text-gray-900">
        {message}
    </span>
    <div class="flex justify-center w-screen">
        <img id="baozi" width="100" src="{Error}" alt="baozi" on:click={go_home}>
    </div>
</div>