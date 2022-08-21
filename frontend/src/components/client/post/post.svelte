<script lang="ts">
    // import { nanoid } from "nanoid";
    import { onMount } from "svelte";
    import Modal from "./modal.svelte";
    import { openModal } from "svelte-modals";

    export let title = "";
    export let date = "";
    export let content = "";
    export let img_path = "";


    let innerWidth = globalThis.innerWidth;
    let innerHeight = globalThis.innerHeight;

    onMount(() => {
        let post = document.getElementById(title)
        //add style to post
        if(post != null) {
            post.style.backgroundSize = "cover";
            post.style.filter = "blur(2px)";
            //fit image to post
            post.style.width = "50%";
            post.style.height = "50%";
        }
    });


    const handleModal = () => {
        openModal(Modal,{
            title: title,
            date: date,
            message: content,
            img_path: img_path,
            alt_name: title,
        });
    }
</script>

<svelte:window
    bind:innerWidth
    bind:innerHeight
></svelte:window>

<!-- maxh, maxw -->
<div class="cursor-pointer h-full dark:bg-black dark:bg-opacity-40 bg-gray-500 bg-opacity-60 dark:border-black border-gray-500 rounded-lg border-8 dark:border-opacity-0 border-opacity-0" on:click={handleModal}>
    <!-- fontsize -->
    <div class="text-center text-4xl sm:text-4xl text-pink-500">{title}-{date}</div>
    <!-- fontsize -->
    <div class="scrollable max-h-64">
        <div class="text-center text-2xl sm:text-xl text-black dark:text-white text-ellipsis overflow-hidden">{content}</div>
        {#if img_path.length > 0}
            <img src="{img_path}" alt="{title}" id={title}>            
        {/if}
    </div>
</div>