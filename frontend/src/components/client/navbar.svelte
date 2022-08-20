<script lang="ts">
    import { current } from "../../ts/store";
    import { updateClient, updateURL } from "../../ts/utils";

    let state = 0;
    current.subscribe(x => state = x);
    const BASE = "bg-gray-400 hover:border-2 border-pink-500 border-solid bg-opacity-60 cursor-pointer";
    const SEL = "bg-gray-700 bg-opacity-80 cursor-default"

    const BAR = "mr-2 ml-2 rounded-lg pl-2 pr-2 pt-1 pb-1"

    //pt/pb/mb, fontsize, width, button fontsize, button width 
    // bar_buttons = ["0.5","2xl","44","4xl","52"];
    const BURGER_THIN = "pt-0.5 pb-0.5 mb-0.5 text-2xl, w-28"
    // bar_buttons = ["1.5","xl","28","2xl","32"];
    const BURGER_WIDE = "pt-1.5 pb-1.5 mb-1.5 text-xl, w-24"
    const CONTAINER_THIN = "pt-0 w-28 pl-0.5"
    const CONTAINER_WIDE = "pt-0 w-28 pl-1.5"
    const BB_THIN = "text-2xl w-28 p-0.5 text-purple-600"
    const BB_WIDE = "text-2xl w-28 p-0.5 text-purple-600"


    let burger = ["","",""];
    //set all class states to base
    let class_state = [BASE,BASE,BASE,BASE]
    class_state[state] = SEL;
    // change state in url query
    
    let menu = false;

    let innerWidth = globalThis.innerWidth;
    let innerHeight = globalThis.innerHeight;

    const changeFocus = (e:any) => {
        const id = e.target.id
        class_state[state] = BASE;
        switch(id){
            case "0":
                class_state[0] = SEL;
                current.set(0);
                state = 0;
                break;
            case "1":
                class_state[1] = SEL;
                current.set(1);
                state = 1;
                break;
            case "2":
                class_state[2] = SEL;
                current.set(2);
                state = 2;
                break;
            case "3":
                class_state[3] = SEL;
                current.set(3);
                state = 3;
                break;
            default:
                return;
        }
        updateClient();
        updateURL(state);
    }

    const invert_menu = () => {
        menu = !menu;
    }

    const checkResize = () => {
        //true means mobile
        if(innerWidth < 500) {
            burger = [BB_THIN,BURGER_THIN,CONTAINER_THIN];
        } else {
            burger = [BB_WIDE,BURGER_WIDE,CONTAINER_WIDE];
        }
    }

    checkResize();

</script>
<svelte:window
    on:resize={checkResize}
	bind:innerWidth
    bind:innerHeight
  />

<nav>
    <div class="fixed w-screen h-0 top-0 left-0 right-0 bottom-0 z-50">
        {#if innerWidth > innerHeight && innerHeight > 400 && innerWidth > 800 }
            <div class="justify-center">
                <ul class="flex justify-center text-xl">
                    <li class="{BAR} {class_state[0]}">
                        <span id="0" on:click={changeFocus}>About</span>
                    </li>
                    <li class="{BAR} {class_state[1]}">
                        <span id="1" on:click={changeFocus}>Docs</span>
                    </li>
                    <li class="mr-2 ml-2 text-4xl">
                        <span class="text-purple-600">Ryan Fong</span>
                    </li>
                    <li class="{BAR} {class_state[2]}">
                        <span id="2" on:click={changeFocus}>Blog</span>
                    </li>
                    <li class="{BAR} {class_state[3]}">
                        <span id="3" on:click={changeFocus}>Contact</span>
                    </li>
                </ul>
            </div>
        {:else}
            <span class="border-black text-center cursor-pointer {menu?SEL:BASE} {burger[0]}" on:click={invert_menu}>
                Ryan Fong
            </span>
            {#if menu}
                <ul class="text-center bg-gray-500 bg-opacity-60 {burger[2]}">
                    <li class="{burger[1]} {class_state[0]}" id="0" on:click={changeFocus}>About</li>
                    <li class="{burger[1]} {class_state[1]}" id="1" on:click={changeFocus}>Docs</li>
                    <li class="{burger[1]} {class_state[2]}" id="2" on:click={changeFocus}>Blog</li>
                    <li class="{burger[1]} {class_state[3]}" id="3" on:click={changeFocus}>Contact</li>
                </ul>
            {/if}
        {/if}
    </div>
</nav>