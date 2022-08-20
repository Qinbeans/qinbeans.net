<script lang="ts">
    import { closeModal } from 'svelte-modals' 

    export let isOpen: boolean;

    export let title: string;
    export let message: string;

    export let date: string;

    export let img_path: string;
    export let alt_name: string;

</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="bg-gray-500 bg-opacity-60 dark:bg-zinc-800 dark:bg-opacity-80 w-5/6 h-3/5 sm:w-1/2 sm:h-5/6 rounded-lg border-8 border-solid border-black border-opacity-0 p-10">
            <div class="text-center shadow text-pink-500 text-4xl sm:text-5xl">{title}-{date}</div>
            <div class="w-full h-5/6 modal_post overflow-hidden text-ellipsis overflow-y-scroll">
                <div class="text-white shadow text-2xl sm:text-xl">{message}</div>
                {#if img_path.length > 0}
                    <img src={img_path} alt={alt_name} id={alt_name}>
                {/if}
            </div>
            <div on:click={closeModal} class="shadow hover:border-2 border-solid border-pink-500 cursor-pointer pl-1.5 pr-1.5 rounded-lg bg-gray-700 text-pink-500 mt-2.5 w-fit h-fit">Close</div>
        </div>
    </div>
{/if}
