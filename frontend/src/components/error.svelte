<!-- Sanitize -->
<script lang="ts">
    import Error from "../../assets/error.svg";
    import { current } from "../ts/store";
    import { State } from "../ts/types";
    import { updateClient, updateURL } from "../ts/update";
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
<div class="text-center w-screen">
    <div class="text-red-500 text-4xl">
        Error-{type}
    </div>
    <div class="text-2xl">
        {message}
    </div>
    <div class="flex justify-center w-screen">
        <img id="baozi" width="100" src="{Error}" alt="baozi" on:click={go_home}>
    </div>
</div>