<script lang="ts">
    import Error from "../assets/error.svg";
    import { Box } from "../chakra-ui-svelte";
    import { current } from "../ts/store";
    import { State } from "../ts/types";
    import { updateClient } from "../ts/client";
    // import { Box } from "../chakra-ui-svelte";
    export let type: string;
    export let message: string;
    const go_home = () => {
        if(type != "500"){
            //change state
            current.set(State.ABOUT);
            //update client
            updateClient();
        }
    };
</script>

<div>
    <Box color="red.500" fontSize="4xl" textAlign="center">
        Error-{type}
    </Box>
    <Box fontSize="2xl" textAlign="center">
        {message}
    </Box>
    <img class="error" src="{Error}" alt="baozi" on:click={go_home}>
</div>