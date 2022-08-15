<script lang="ts">
    import Error from "../assets/error.svg";
    import { Box } from "../chakra-ui-svelte";
    import { current } from "../ts/store";
    import { State } from "../ts/types";
    import { updateClient, updateURL } from "../ts/client";
    // import { Box } from "../chakra-ui-svelte";
    export let type: string;
    export let message: string;
    const go_home = () => {
        if(type != "500"){
            //change state
            current.set(State.ABOUT);
            //update client
            updateClient();
            updateURL(State.ABOUT);
        }
    };

</script>
<svelte:window
    on:load={() => {
        if(type != "500"){
            let baozi = document.getElementById("baozi")
            baozi.style.cursor = "pointer"
        }
    }}
></svelte:window>
<div>
    <Box color="red.500" fontSize="4xl" textAlign="center">
        Error-{type}
    </Box>
    <Box fontSize="2xl" textAlign="center">
        {message}
    </Box>
    <img id="baozi" class="center-rel" width="100" src="{Error}" alt="baozi" on:click={go_home}>
</div>