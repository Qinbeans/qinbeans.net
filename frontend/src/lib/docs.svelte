<script lang="ts">
    import Markdown from "./markdown.svelte";
    import Divider from "./divider.svelte";
    import { Box, ChakraProvider } from "../chakra-ui-svelte";
    import { mobile } from "../ts/store";
    
    // Import the element definition
    let innerHeight = window.innerHeight;
    let innerWidth = window.innerWidth;

    //top, padding, margin
    let sizes = ["20","48","10","5"]

    const checkResize = () => {
        mobile.subscribe(x => {
            if (x && innerWidth < innerHeight) {
                sizes = ["20", "60", "10", "1.5"]
            } else {
                sizes = ["20", "48", "10", "5"]
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
    <Box top={sizes[0]} marginBottom={sizes[1]} marginLeft={sizes[2]} marginRight={sizes[2]} padding={sizes[3]} bg="whiteAlpha.500" borderRadius="10" borderStyle="solid" borderColor="blackAlpha.500" class="docs">
        <Markdown height={sizes[1]} src="/docs/client/contact_form.md" />
        <Divider />
        <Markdown height={sizes[1]} src="/docs/admin/admin_form.md" />
        <Divider />
        <Markdown height={sizes[1]} src="/docs/admin/blog_form.md" />
    </Box>
</ChakraProvider>