<script lang="ts">
    import { Box } from "../../chakra-ui-svelte";
    // import { closeModal } from 'svelte-modals' 

    export let isOpen: boolean;

    export let title: string;
    export let message: string;

    export let date: string;

    export let img_path: string;
    export let alt_name: string;

    export let h_size: string;
    export let t_size: string;
    export let width: string;
    export let height: string;

</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <Box bg="blackAlpha.800" maxW={width} maxH={height} borderRadius="10" padding="10">
            <Box textAlign="center" color="blue.500" fontSize={h_size}>{title}-{date}</Box>
            <Box height={height} color="purple.500" fontSize={t_size} class="modal_post">{message}</Box>
            {#if img_path.length > 0}
                <img src={img_path} alt={alt_name} id={alt_name}>
            {/if}
        </Box>
    </div>
{/if}

<style>
    
</style>