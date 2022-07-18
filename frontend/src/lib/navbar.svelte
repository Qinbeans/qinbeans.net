<script lang="ts">
    import { current } from "../ts/store";
    import { updateClient } from "../ts/client";
    
    let state = 0;
    current.subscribe(x => state = x);
    
    let class_state = ["sel","sel","sel","sel"];
    class_state[state] = "curr";
    console.log("navbar",state)
    let x_pos = [9,10,12,13];
    let width = 1;

    const c_about = () => {
        if(state == 0) return;
        class_state[0] = "curr";
        class_state[1] = "sel";
        class_state[2] = "sel";
        class_state[3] = "sel";
        current.set(0);
        state = 0;
        updateClient();
    };
    const c_docs = () => {
        if(state == 1) return;
        class_state[0] = "sel";
        class_state[1] = "curr";
        class_state[2] = "sel";
        class_state[3] = "sel";
        current.set(1);
        state = 1;
        updateClient();
    };
    const c_blog = () => {
        if(state == 2) return;
        class_state[0] = "sel";
        class_state[1] = "sel";
        class_state[2] = "curr";
        class_state[3] = "sel";
        current.set(2);
        state = 2;
        updateClient();
    };
    const c_contact = () => {
        if(state == 3) return;
        class_state[0] = "sel";
        class_state[1] = "sel";
        class_state[2] = "sel";
        class_state[3] = "curr";
        current.set(3);
        state = 3;
        updateClient();
    };
    
    //check if screen width is less than 800
    if(window.innerWidth < 800){
        x_pos = [7,9,13,15];
        width = 2;
    }
</script>

<nav class="nav n-grid">
<span class="x-{x_pos[0]}-{width} y-2-2 bubble {class_state[0]}" on:click={c_about}>About</span>
<span class="x-{x_pos[1]}-{width} y-2-2 bubble {class_state[1]}" on:click={c_docs}>Docs</span>
<span class="x-11 y-1-2 title">Ryan Fong</span>
<span class="x-{x_pos[2]}-{width} y-2-2 bubble {class_state[2]}" on:click={c_blog}>Blog</span>
<span class="x-{x_pos[3]}-{width} y-2-2 bubble {class_state[3]}" on:click={c_contact}>Contact</span>
</nav>