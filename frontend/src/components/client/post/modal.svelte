<script lang="ts">
    import { closeModal } from 'svelte-modals' 

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
    export let t_height: string;

</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="bg-black bg-opacity-60 max-w-{width} max-h-{t_height} rounded-lg border-8 border-solid border-black border-opacity-0 p-10">
            <div class="text-center text-blue-500 text-{h_size}">{title}-{date}</div>
            <div class="h-{height} max-h-{height} modal_post overflow-hidden text-ellipsis overflow-y-scroll">
                <div class="text-purple-500 text-{t_size}">{message}</div>
                {#if img_path.length > 0}
                    <img src={img_path} alt={alt_name} id={alt_name}>
                {/if}
            </div>
            <div on:click={closeModal} class="cursor-pointer pl-1.5 pr-1.5 rounded-lg bg-gray-700 text-pink-500 mt-2.5 w-fit h-fit">Close</div>
        </div>
    </div>
{/if}
