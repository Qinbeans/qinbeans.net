<script lang="ts">
    import Post from "./post/post.svelte";
    import type { Post as P } from "../ts/types";
    // import { Box } from "../chakra-ui-svelte";
    import { Modals, closeModal } from "svelte-modals";
    //sends a request to backend and receives a json with a list of posts
    //request 9 posts per scroll, and push them into posts array
    let posts = [
        {
            id: 1,
            title: "Testing",
            date: "1/1/1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            img: "",
        },
        {
            id: 2,
            title: "Testing",
            date: "1/1/1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In egestas erat imperdiet sed euismod nisi porta lorem. Lacus vel facilisis volutpat est velit egestas. Libero justo laoreet sit amet cursus sit amet dictum. Tortor posuere ac ut consequat semper viverra nam. Diam in arcu cursus euismod. Augue eget arcu dictum varius duis at. Nibh mauris cursus mattis molestie a iaculis. In egestas erat imperdiet sed. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Fermentum dui faucibus in ornare quam viverra orci sagittis. Nunc vel risus commodo viverra. Sed id semper risus in hendrerit gravida rutrum quisque non. Fames ac turpis egestas maecenas pharetra convallis posuere.",
            img: "",
        }
    ] as P[];
</script>

<div id="blog" class="main fr-grid">
    {#each posts as post}
        <Post
            title={post.title}
            date={post.date}
            content={post.content}
            img_path={post.img}
        ></Post>
    {/each}
</div>

<Modals>
    <div
      slot="backdrop"
      class="backdrop"
      on:click={closeModal}
    />
</Modals>
