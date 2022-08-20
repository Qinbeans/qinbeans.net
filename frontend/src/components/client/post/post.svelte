<script lang="ts">
    // import { nanoid } from "nanoid";
    import { onMount } from "svelte";
    import Modal from "./modal.svelte";
    import { openModal } from "svelte-modals";

    export let title = "";
    export let date = "";
    export let content = "";
    export let img_path = "";


    let format = ["max-w-xl max-h-96","text-4xl","text-xl"];

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

    const checkResize = () => {
            if(innerWidth < 500 && innerWidth < innerHeight) {
                console.log("mobile(vert)");
                format = ["max-h-64","text-4xl","text-2xl"];
            } else if(innerWidth < 1415) {
                console.log("mobile(hor)");
                format = ["max-h-64","text-4xl","text-xl"];
            } else {
                console.log("desktop");
                format = ["max-h-96","text-4xl","text-xl"];
            }
    }


    const handleModal = () => {
        if(innerWidth < innerHeight) {
            console.log("vertical");
            openModal(Modal,{
                title: title,
                date: date,
                message: content,
                img_path: img_path,
                alt_name: title,
                parent: "w-5/6 h-3/5",
                f_child: "text-4xl",
                s_child: "w-full h-5/6",
                s_f_child: "text-2xl"
            });
        } else {
            console.log("horizontal");
            openModal(Modal,{
                title: title,
                date: date,
                message: content,
                img_path: img_path,
                alt_name: title,
                parent: "w-1/2 h-5/6",
                f_child: "text-6xl",
                s_child: "w-full h-5/6",
                s_f_child: "text-xl"
            });
        }
    }

    checkResize();
</script>

<svelte:window
    on:resize={checkResize}
    bind:innerWidth
    bind:innerHeight
></svelte:window>

<!-- maxh, maxw -->
<div class="cursor-pointer bg-gray-500 border-gray-500 rounded-lg border-8 border-opacity-0" on:click={handleModal}>
    <!-- fontsize -->
    <div class="text-center {format[1]} text-pink-500">{title}-{date}</div>
    <!-- fontsize -->
    <div class="scrollable {format[0]}">
        <div class="text-center {format[2]} text-black text-opacity-80 text-ellipsis overflow-hidden">{content}</div>
        {#if img_path.length > 0}
            <img src="{img_path}" alt="{title}" id={title}>            
        {/if}
    </div>
</div>