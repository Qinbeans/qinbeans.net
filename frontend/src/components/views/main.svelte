<script lang="ts" is:inline>
    // import { getStateFromQuery } from "../../ts/client"
    import { State } from "../../ts/types";
    import About from "../client/about.svelte";
    import Docs from "../client/docs.svelte";
    import Blog from "../client/blog.svelte";
    import Contact from "../client/contact.svelte";
    import Error from "../error.svelte";
    import Navbar from "../client/navbar.svelte";
    import Loading from "./loading.svelte";
    import { current } from "../../ts/store";
    import { State as AppState } from "../../ts/types";
    import { pong } from "../../ts/verify";
    import type { Error as RequestError } from "../../ts/types"
    // import { getClient, clearClient } from "../../ts/client";
    import { getStateFromQuery, getClient, clearClient } from "../../ts/utils";

    export let search = "";
    // let state = 0;
    let state = getStateFromQuery(search);
    let loading = true;
    current.subscribe(x => {
        if(state == State.NONE){
            let res = getClient()
            if (res == null)
                state = x
        }
        if(x != State.NONE){
            state = x
        }else{
            current.set(state)
        }
    });
    export let pos_err: RequestError = {
        type: "500",
        message: "Oops, the hamsters took a break.  Let's wait until they come back."
    };

    pong().catch(() => {
        console.error("Pong failed");
        pos_err = {
            type: "500",
            message: "Oops, the hamsters took a break.  Let's wait until they come back."
        }
        current.update(x => {
            x = AppState.ERROR
            clearClient()
            return x
        });
        state = -1;
        loading = false;
    }).then(() => {
        loading = false;
    })
</script>
{#if loading}
    <Loading />
{:else}
    {#if state != State.ERROR}
        <Navbar></Navbar>
    {/if}
    <main>
        {#if state == State.ABOUT}
            <About></About>
        {:else if state == State.DOCS}
            <Docs></Docs>
        {:else if state == State.BLOG}
            <Blog></Blog>
        {:else if state == State.CONTACT}
            <Contact></Contact>
        {:else if state == State.ERROR}
            <Error type="{(pos_err.type != null)?pos_err.type:`500`}" message="{pos_err.message}"></Error>
        {:else}
            <About></About>
        {/if}
    </main>
{/if}