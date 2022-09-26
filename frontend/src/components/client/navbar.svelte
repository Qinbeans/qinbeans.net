<script lang="ts">
    import { current } from "../../ts/store";
    import { State } from "../../ts/types";
    import { getClient, updateClient } from "../../ts/utils";
    import init, { update_url } from "../../wasm-lib/pkg";
    import FaBrandsGithub from "svelte-icons-pack/fa/FaBrandsGithub";
    import FaBrandsLinkedin from "svelte-icons-pack/fa/FaBrandsLinkedin";
    import Icon from 'svelte-icons-pack/Icon.svelte';

    getClient()
    export let state = -100;
    if(state == -100){
        //grab from localstorage
        current.subscribe(x => {
            if(x.state < 0){
                return
            }
            state = x.state;
            updateClient();
            let now = new Date();
            let last = 0
            if (x.lastUpdate != undefined)
                last = x.lastUpdate.getTime()
            if (now.getTime() - last > 60000) {
                init().then(() => {
                    update_url(state, true);
                })
            }else{
                init().then(() => {
                    update_url(state, false);
                })
            }
        });
    }

    if(state == State.NONE){
        state = State.ABOUT
    }

    const BASE = "bg-gray-400 dark:bg-zinc-600 hover:border-2 border-pink-500 border-solid bg-opacity-80 dark:bg-opacity-60 cursor-pointer";
    const SEL = "bg-gray-700 dark:bg-black bg-opacity-80 dark:bg-opacity-60 cursor-default"
    
    //set all class states to base
    let class_state = [BASE,BASE,BASE,BASE]
    class_state[state] = SEL;
    // change state in url query
    
    let menu = false;

    let innerWidth = globalThis.innerWidth;
    let innerHeight = globalThis.innerHeight;

    const changeFocus = (e:any) => {
        const id = e.target.id
        if(state == id){
            return
        }
        //id is string, so convert to int
        state = parseInt(id);
        class_state[state] = BASE;
        let load_flag = false;
        let last = 0
        current.update(x => {
            x.state = state;
            updateClient();
            let now = new Date();
            if (x.lastUpdate != undefined){
                let lastTime = new Date(x.lastUpdate)
                last = lastTime.getTime()
            }
            if (now.getTime() - last > 60000) {
                load_flag = true;
            }else{
                load_flag = false;
            }
            return x;
        });
        init().then(() => {
            update_url(state, load_flag);
        })
    }

    const invert_menu = () => {
        menu = !menu;
    }


</script>
<svelte:window
	bind:innerWidth
    bind:innerHeight
  />

<nav>
    <div class="fixed w-screen h-0 top-0 left-0 right-0 bottom-0 z-50">
        {#if innerWidth > innerHeight && innerWidth > 640 }
            <div class="justify-center">
                <ul class="flex justify-center text-xl list-none">
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {class_state[0]}">
                        <span id="0" on:click={changeFocus}>About</span>
                    </li>
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {class_state[1]}">
                        <span id="1" on:click={changeFocus}>Docs</span>
                    </li>
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {BASE}" on:click={() => {
                        window.location.href = "https://github.com/Qinbeans";
                    }}>
                        <Icon size="30" src={FaBrandsGithub}/>
                    </li>
                    <li class="mr-2 ml-2 text-4xl">
                        <span class="text-purple-600 shadow">Ryan Fong</span>
                    </li>
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {BASE}" on:click={() => {
                        window.location.href = "https://www.linkedin.com/in/rybeats/";
                    }}>
                        <Icon size="30" color="rgb(37, 99, 235)" src={FaBrandsLinkedin}/>
                    </li>
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {class_state[2]}">
                        <span id="2" on:click={changeFocus}>Blog</span>
                    </li>
                    <li class="mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1 {class_state[3]}">
                        <span id="3" on:click={changeFocus}>Contact</span>
                    </li>
                </ul>
            </div>
        {:else}
            <span class="text-center cursor-pointer {menu?SEL:BASE} text-3xl w-28 p-0.5 text-purple-600" on:click={invert_menu}>
                Ryan Fong
            </span>
            {#if menu}
                <ul class="text-center bg-gray-500 bg-opacity-60 pt-0 w-28 pl-0.5 sm:pl-1.5 list-none">
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {class_state[0]}" id="0" on:click={changeFocus}>About</li>
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {class_state[1]}" id="1" on:click={changeFocus}>Docs</li>
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {class_state[2]}" id="2" on:click={changeFocus}>Blog</li>
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {class_state[3]}" id="3" on:click={changeFocus}>Contact</li>
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {BASE}">
                        <!-- center vertically -->
                        <a class="flex justify-center" href="https://github.com/Qinbeans">
                            <Icon src={FaBrandsGithub}/>
                        </a>
                    </li>
                    <li class="sm:pt-1.5 sm:pb-1.5 sm:mb-1.5 sm:text-xl sm:w-24 pt-0.5 pb-0.5 mb-0.5 text-2xl w-28 {BASE}">
                        <a class="flex justify-center" href="https://www.linkedin.com/in/rybeats/">
                            <Icon src={FaBrandsLinkedin}/>
                        </a>
                    </li>
                </ul>
            {/if}
        {/if}
    </div>
</nav>