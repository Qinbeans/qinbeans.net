<script lang="ts">
    import { Box } from "../../chakra-ui-svelte";
    // import { closeModal } from 'svelte-modals' 

    export let isOpen: boolean;

    export let title: string;
    export let message: string;

    export let date: string;

    export let img_path: string;
    export let alt_name: string;
</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <Box bg="blackAlpha.800" maxW="xl" borderRadius="10" padding="10">
            <Box textAlign="center" color="blue.500" fontSize="6xl">{title}-{date}</Box>
            <Box color="purple.500" fontSize="4xl">{message}</Box>
            {#if img_path.length > 0}
                <img src={img_path} alt={alt_name} id={alt_name}>
            {/if}
        </Box>
    </div>
{/if}
