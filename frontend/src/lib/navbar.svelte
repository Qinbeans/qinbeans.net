<script lang="ts">
    import { current } from "../ts/store";
    import { updateClient } from "../ts/client";
    import { Box, HStack, Stack, Button, ChakraProvider } from '../chakra-ui-svelte';
    
    let state = 0;
    current.subscribe(x => state = x);
    
    let class_state = ["sel","sel","sel","sel"];
    class_state[state] = "curr";
    // console.log("navbar",state)
    // let x_pos = [9,10,12,13];
    // let width = 1;
    // change state in url query
    const updateURL = () => {
        window.location.search = "?state=" + state;
    }
    let menu = false;

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    // console.log("screen_width",screen_width)

    const c_about = () => {
        if(state == 0) return;
        class_state[0] = "curr";
        class_state[1] = "sel";
        class_state[2] = "sel";
        class_state[3] = "sel";
        current.set(0);
        state = 0;
        updateClient();
        updateURL();
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
        updateURL();
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
        updateURL();
    };
    const invert_menu = () => {
        menu = !menu;
    }

    const mobile_check = () => {
        if(innerWidth < 800) {
            bar_buttons = ["1.5","xl","28"];
        }else{
            bar_buttons = ["5","4xl","56"];
        }
    }
    //pt, pb, mb, fontSize, w
    let bar_buttons = ["5","4xl","56"];

    mobile_check();

</script>
<svelte:window
    on:resize={mobile_check}
	bind:innerWidth
    bind:innerHeight

  />
<nav class="bar">
    {#if innerWidth > innerHeight }
        <ChakraProvider>
            <Box class="center">
                <HStack spacing="7" >
                    <Button fontSize="lg" variant="link" on:click={c_about} class={class_state[0]}>
                        About
                    </Button>
                    <Button fontSize="lg" variant="link" on:click={c_docs} class={class_state[1]}>
                        Docs
                    </Button>
                    <Box fontSize="3xl" color="#aaf">
                        Ryan Fong
                    </Box>
                    <Button fontSize="lg" variant="link" on:click={c_blog} class={class_state[2]}>
                        Blog
                    </Button>
                    <Button fontSize="md" variant="link" on:click={c_contact} class={class_state[3]}>
                        Contact
                    </Button>
                </HStack>
            </Box>
        </ChakraProvider>
    {:else}
        <!-- create a hamburger button -->
        <ChakraProvider>
            <Box class="left">
                <Box textAlign="center" fontSize={innerWidth<800?'2xl':'6xl'} color="{menu?'#888':'#aaf'}" bg="#afafaf55" pl="1" pr="1" maxW={innerWidth<800?32:60} borderColor="black" borderWidth="3" on:click={invert_menu}>
                    Ryan Fong
                </Box>
                {#if menu}
                    <ChakraProvider>
                        <Box as="ul" size="lg" bg="grey" maxW={innerWidth<800?32:60} pl={bar_buttons[0]} pt="0">
                            <Button as="li" pt={bar_buttons[0]} pb={bar_buttons[0]} mb={bar_buttons[0]} borderRadius="0" fontSize={bar_buttons[1]} w={bar_buttons[2]} variant="link" on:click={c_about} class={class_state[0]}>
                                About
                            </Button>
                            <Button as="li" pt={bar_buttons[0]} pb={bar_buttons[0]} mb={bar_buttons[0]} borderRadius="0" fontSize={bar_buttons[1]} w={bar_buttons[2]} variant="link" on:click={c_docs} class={class_state[1]}>
                                Docs
                            </Button>
                            <Button as="li" pt={bar_buttons[0]} pb={bar_buttons[0]} mb={bar_buttons[0]} borderRadius="0" fontSize={bar_buttons[1]} w={bar_buttons[2]} variant="link" on:click={c_blog} class={class_state[2]}>
                                Blog
                            </Button>
                            <Button as="li" pt={bar_buttons[0]} pb={bar_buttons[0]} mb={bar_buttons[0]} borderRadius="0" fontSize={bar_buttons[1]} w={bar_buttons[2]} variant="link" on:click={c_contact} class={class_state[3]}>
                                Contact
                            </Button>
                        </Box>
                    </ChakraProvider>
                {/if}
            </Box>
        </ChakraProvider>
    {/if}
</nav>