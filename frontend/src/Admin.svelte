<script lang="ts">
    import Login from "./admin/login.svelte";
    import Blog from "./admin/blog.svelte";
    import Dashboard from "./admin/home.svelte";

    import { admin, token } from "./admin/ts/store";
    import { AdminState } from "./admin/ts/types";
    import { onMount } from "svelte";
    import { getAdmin } from "./admin/ts/credentials";

    let state = AdminState.LOGIN;
    let a_token = "";
    admin.subscribe(x => state = x);
    token.subscribe(x => a_token = x);
    onMount(() => {
        let req = getAdmin();
        if(req == null){
            console.log("No admin credentials found");
            if(state != 0 && a_token.length == 0) {
                alert("You are not logged in");
                admin.set(AdminState.LOGIN);
                state = AdminState.LOGIN;
            }
        }
        req.catch(e => {
            console.log("No admin credentials found");
            if(state != 0 && a_token.length == 0) {
                alert("You are not logged in");
                admin.set(AdminState.LOGIN);
                state = AdminState.LOGIN;
            }
        });
    })
    //cebf65ab-4677-4dca-b7b9-8f586bcbe215
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