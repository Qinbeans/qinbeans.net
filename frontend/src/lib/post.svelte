<script lang="ts">
    import { v4 as uuid } from "uuid";
    import { onMount } from "svelte";
    export let title = "";
    export let date = "";
    export let content = "";
    export let img_path = "";
    //alt_name is some uuid
    const alt_name = uuid();
    if(img_path.length == 0) {
        img_path = "/imgs/default.png";
    }
    onMount(() => {
        let post = document.getElementById(alt_name)
        //add style to post
        if(post != null) {
            post.style.backgroundImage = "url(" + img_path + ")";
            post.style.backgroundSize = "cover";
            post.style.height = "25%";
        }
    });
</script>

<div class="frame">
    <div id="{alt_name}" class="content">
        <h1 class="h1">{title}</h1>
        <p class="txt">{content}</p>
        <p class="date">{date}</p>    
    </div>
</div>