<script lang="ts">
    import { closeModal } from 'svelte-modals' 

    export let isOpen: boolean;

    export let title: string;
    export let message: string;

    export let date: string;

    export let img_path: string;
    export let alt_name: string;

    export let parent: string;//parent
    export let f_child: string;//first child
    export let s_child: string;//second child
    export let s_f_child: string;//second first child

</script>

{#if isOpen}
    <div role="dialog" class="modal">
        <div class="bg-black bg-opacity-60 {parent} rounded-lg border-8 border-solid border-black border-opacity-0 p-10">
            <div class="text-center text-blue-500 {f_child}">{title}-{date}</div>
            <div class="{s_child} modal_post overflow-hidden text-ellipsis overflow-y-scroll">
                <div class="text-purple-500 {s_f_child}">{message}</div>
                {#if img_path.length > 0}
                    <img src={img_path} alt={alt_name} id={alt_name}>
                {/if}
            </div>
            <div on:click={closeModal} class="hover:border-2 border-solid border-pink-500 cursor-pointer pl-1.5 pr-1.5 rounded-lg bg-gray-700 text-pink-500 mt-2.5 w-fit h-fit">Close</div>
        </div>
    </div>
{/if}
