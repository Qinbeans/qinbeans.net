<script lang="ts">
    import Post from "./post.svelte";
    import type { Post as P } from "../ts/types";
    //sends a request to backend and receives a json with a list of posts
    let posts = [
        {
            id: 1,
            title: "Testing",
            date: "1/1/1",
            content: "Something",
            img: "",
        },
        {
            id: 2,
            title: "Testing",
            date: "1/1/1",
            content: "Something",
            img: "",
        }
    ] as P[];
</script>

<div class="main fr-grid">
    {#each posts as post}
        <Post
            title={post.title}
            date={post.date}
            content={post.content}
            img_path={post.img}
        ></Post>
    {/each}
</div>