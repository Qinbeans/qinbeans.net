<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import { Box } from '../chakra-ui-svelte'
    // Import the element definition
    export let src = ""
    export let height = "96"

    let content = ""

    if(src.length > 0){
        //get file from src
        fetch(src).then(
            response => response.text()
        ).then(
            text => {
                content = text
                console.log(content)
            }
        )
    }

</script>

<Box height={height} class="mini-window">
    <SvelteMarkdown source={content} />
</Box>