<script lang="ts">
    import Login from "./admin/login.svelte";
    import Blog from "./admin/blog.svelte";
    import Dashboard from "./admin/home.svelte";

    import { admin, token } from "./admin/ts/store";
    import { AdminState } from "./admin/ts/types";

    let state = AdminState.LOGIN;
    let a_token = "";
    admin.subscribe(x => state = x);
    token.subscribe(x => a_token = x);
    if(state != 0 && a_token.length == 0) {
        alert("You are not logged in");
        admin.set(AdminState.LOGIN);
        state = AdminState.LOGIN;
    }
</script>

<main>
    {#if state == AdminState.LOGIN}
    <Login></Login>
    {:else if state == AdminState.HOME}
    <Dashboard></Dashboard>
    {:else if state == AdminState.BLOG}
    <Blog></Blog>
    {:else}
    <Login></Login>
    {/if}
</main>