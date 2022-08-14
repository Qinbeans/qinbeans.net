<script lang="ts">
    import { v4 as uuid } from "uuid";
    import { onMount } from "svelte";
    import { Box } from "../../chakra-ui-svelte";
    import { mobile } from "../../ts/store";
    import Modal from "./modal.svelte";
    import { openModal } from "svelte-modals";

    export let title = "";
    export let date = "";
    export let content = "";
    export let img_path = "";

    //alt_name is some uuid
    const alt_name = uuid();

    let post_sizes = ["2xl","4xl","xl"];

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    onMount(() => {
        let post = document.getElementById(alt_name)
        //add style to post
        if(post != null) {
            post.style.backgroundSize = "cover";
            post.style.filter = "blur(2px)";
            //fit image to post
            post.style.width = "50%";
            post.style.height = "50%";
        }
    });

    const mobileResize = () => {
        mobile.subscribe(x => {
            if(x && innerWidth > innerHeight) {
                console.log("mobile(vert)");
                post_sizes = ["4xl","8xl","4xl"];
            } else {
                console.log("mobile(hor)");
                post_sizes = ["2xl","4xl","xl"];
            }
        });
    }


    const handleModal = () => {
        console.log("Clicked")
        openModal(Modal,{
            title: title,
            date: date,
            message: content,
            img_path: img_path,
            alt_name: alt_name
        });
    }

    mobileResize();
</script>

<svelte:window
    on:resize={mobileResize}
    bind:innerWidth
    bind:innerHeight
></svelte:window>


<Box maxW={post_sizes[0]} maxH={post_sizes[0]} class="child main_post" bg="gray.300" borderRadius="10" on:click={handleModal}>
    <Box textAlign="center" fontSize={post_sizes[1]} color="purple.300">{title}-{date}</Box>
    <Box textAlign="center" fontSize={post_sizes[2]} color="blackAlpha.800" class="post">{content}</Box>
    {#if img_path.length > 0}
        <img src="{img_path}" alt="{alt_name}" id={alt_name}>            
    {/if}
</Box>