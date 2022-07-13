<script lang="ts">
    import Login from "./admin/login.svelte";
    import Blog from "./admin/blog.svelte";
    import Dashboard from "./admin/home.svelte";

    import { admin, token } from "./admin/ts/store";

    let state = 0;
    let a_token = "";
    admin.subscribe(x => state = x);
    token.subscribe(x => a_token = x);
    if(state != 0 && a_token.length == 0) {
        alert("You are not logged in");
        admin.set(0);
        state = 0;
    }
</script>

<main>
    {#if state == 0}
    <Login></Login>
    {:else if state == 1}
    <Dashboard></Dashboard>
    {:else if state == 2}
    <Blog></Blog>
    {:else}
    <Login></Login>
    {/if}
</main>