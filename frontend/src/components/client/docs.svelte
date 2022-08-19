<script lang="ts">
    import Markdown from "./markdown.svelte";
    
    // Import the element definition
    let innerHeight = globalThis.innerHeight;
    let innerWidth = globalThis.innerWidth;

    // top, padding, margin
    let format = "mb-15 p-1.5"

    const checkResize = () => {
        if(innerWidth < 500){
            format = "mb-15 p-1.5","14"
        }else{
            format = "mb-12 p-2","12"
        }
    }

    checkResize()

</script>

<svelte:window
    on:resize={checkResize}
    bind:innerWidth
    bind:innerHeight
></svelte:window>


<!-- <ChakraProvider>
    <Box top={sizes[0]} marginBottom={sizes[1]} marginLeft={sizes[2]} marginRight={sizes[2]} padding={sizes[3]} bg="whiteAlpha.500" borderRadius="10" borderStyle="solid" borderColor="blackAlpha.500" class="docs">
        <Markdown height={sizes[1]} src="/docs/client/contact_form.md" />
        <Divider />
        <Markdown height={sizes[1]} src="/docs/admin/admin_form.md" />
        <Divider />
        <Markdown height={sizes[1]} src="/docs/admin/blog_form.md" />
    </Box>
</ChakraProvider> -->
<div class="relative ml-10 mr-10 top-10 {format}">
    <Markdown src="/docs/client/contact_form.md" />
    <div class="divider"></div>
    <Markdown src="/docs/admin/admin_form.md" />
    <div class="divider"></div>
    <Markdown src="/docs/admin/blog_form.md" />
</div>