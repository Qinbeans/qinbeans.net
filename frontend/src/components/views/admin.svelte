<script lang="ts">
    //admin state
    import { admin, token } from "../../ts/store";
    import { AdminState } from "../../ts/types";
    import { onMount } from "svelte";
    import { getAdmin } from "../../ts/credentials";

    import Login from "../admin/login.svelte";

    let state = AdminState.LOGIN;
    let a_token = "";
    admin.subscribe(x => {
        if(x != AdminState.NONE){
            state = x
        }
    });
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
        }else{
            req.catch(() => {
                console.log("No admin credentials found");
                if(state != 0 && a_token.length == 0) {
                    alert("You are not logged in");
                    admin.set(AdminState.LOGIN);
                    state = AdminState.LOGIN;
                }
            });
        }
    })
</script>
<!-- Grid -->
{#if state == AdminState.LOGIN}
    <div class="relative top-10 w-screen grid place-content-center">
        <Login/>
    </div>
{:else}
    <div class="w-screen h-screen grid grid-cols-3 grid-rows-6">
    </div>
{/if}
