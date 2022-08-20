<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    // Import the element definition
    export let src = ""

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

<div class="scrollable h-52 bg-slate-500 bg-opacity-60 dark:bg-black dark:bg-opacity-75 rounded-lg p-1.5">
    <SvelteMarkdown source={content}/>
</div>