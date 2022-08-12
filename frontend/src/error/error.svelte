<script lang="ts">
    import Error from "../assets/error.svg";
    // import { Box } from "../chakra-ui-svelte";
    export let type: string;
    export let message: string;
</script>

<div class="error">
    <h1 class="error">Error-{type}</h1>
    <p class="error">
        {message}
    </p>
    {#if type != "500"}
        <a class="error" href="{window.location.origin+'?state=0'}">
            <img class="error" src="{Error}" alt="baozi">
        </a>
    {:else}
        <img class="error" src="{Error}" alt="baozi">
    {/if}
</div>