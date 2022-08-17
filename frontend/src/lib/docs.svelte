<script lang="ts">
    import Markdown from "./markdown.svelte";
    import { Box, ChakraProvider } from "../chakra-ui-svelte";
    import { mobile } from "../ts/store";
    
    // Import the element definition
    let innerHeight = window.innerHeight;
    let innerWidth = window.innerWidth;

    //padding, top
    let sizes = ["20","48"]

    const checkResize = () => {
        mobile.subscribe(x => {
            if (x && innerWidth < innerHeight) {
                sizes = ["20", "48"]
            } else {
                sizes = ["20", "48"]
            }
        })
    }

    checkResize()

</script>

<svelte:window
    on:resize={checkResize}
    bind:innerWidth
    bind:innerHeight
></svelte:window>


<ChakraProvider>
    <Box top={sizes[1]} paddingLeft={sizes[0]} paddingRight={sizes[0]}>
        <Markdown src="/docs/client/contact_form.md" />
        <Markdown src="/docs/admin/admin_form.md" />
        <Markdown src="/docs/admin/blog_form.md" />
    </Box>
</ChakraProvider>