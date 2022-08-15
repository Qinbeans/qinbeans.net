<!-- some cool animation with an explaination about me -->
<script lang="ts">
    import { mobile } from "../ts/store"
    import { Box, ChakraProvider} from "../chakra-ui-svelte"
import { text } from "svelte/internal";

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    //header font, text font, padding, top
    let text_sizes = ["5xl","3xl", "96", "20"]

    const checkResize = () => {
        mobile.subscribe((x) => {
            console.log("mobile",x,"sizes",innerWidth,innerHeight)
            if ((x && innerWidth < innerHeight)) {
                text_sizes = ["8xl","5xl", "20", "28"]
                console.log("About -> Mobile")
            } else if (innerWidth < 1415) {
                text_sizes = ["5xl","2xl", "20", "28"]
                console.log("About -> Thin")
            } else {
                text_sizes = ["5xl","2xl", "96", "20"]
                console.log("About -> Desktop")
            }
        })
    }

    checkResize();

</script>
<svelte:window
    on:resize={checkResize}
    bind:innerWidth
    bind:innerHeight
></svelte:window>

<ChakraProvider>
    <div class="wai-img"></div>
    <Box top={text_sizes[3]} paddingLeft={text_sizes[2]} paddingRight={text_sizes[2]} class="center-rel text">
        <Box textAlign="center" fontSize={text_sizes[0]} color="purple.100">Who Am I</Box>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.400">
            My name is Ryan Fong.  I started off coding, if you can call visual languages like Scratch and Snap coding, in middle school.  I never imagined myself becoming a Computer Science major back then, but I think I'd be satisifed with the path I've chosen.
        </Box>
        <br>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.200">
            Ever since I was probably a toddler, I've had a curiosity for things like climbing trees to see what trees had to offer or playing with LEGOs to see what I could make.  I think this curiosity is what drove me to Computer Science and to this day, I play with just about anything I can get my hands on.  This website is probably proof that I still play with whatever I can get my hands on since it's built with some niche methods, but you can read all about it in my docs.
        </Box>
        <br>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.100">
            Most of my childhood consisted of me playing sports, participating in Boy Scouts, and occasionally watching TV.  I spent a lot of time in Boy Scouts, and it probably contributes to my character as a person the most.  I rose to the rank of Eagle Scout at the age of 18, which while not impressive alone, I achieved that and was elected to the highest role offered by Boy Scout troops all within the same year.
        </Box>
    </Box>
    <div class="exp-img"></div>
    <Box top={text_sizes[3]} paddingLeft={text_sizes[2]} paddingRight={text_sizes[2]} class="center-rel text">
        <Box textAlign="center" fontSize={text_sizes[0]} color="purple.100">Experiences</Box>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.400">
            For most of my experience in coding, I've used C++, but I was also playing with other languages like Rust and Golang.  Prior to university, I used Java.  My Java is a little rusty, but I'm pretty sure I retained most of the important aspects.  I have a good amount of experience with machine learning and by extension Python.  Other than that, I have used Javascript, SCSS/CSS, HTML, Vue, and Svelte in making websites.
        </Box>
    </Box>
    <div class="aatf-img"></div>
    <Box paddingLeft={text_sizes[2]} paddingRight={text_sizes[2]} class="center-rel text">
        <Box textAlign="center" fontSize={text_sizes[0]} color="purple.100">Ambitions And The Future</Box>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.400">
            I aim to be a software engineer.  My intests currently are web development and mobile app design.  As for experience in those fields, I have used game engines like Unity and Cocos2D to build mobile apps and I've used frameworks like Vue, Svelte, Django, Revel, Chi, Gin, and Actix.  I most enjoyed backend development in Go for its simplicity and speed.  For frontend, I'm stuck between Vue and Svelte.  Svelte is the most straight forward but Vue has a larger user base than Vue.  I've slowly grown to like Svelte more and more, but I'm not committed to anyone framework.
        </Box>
        <br>
        <Box textAlign="center" fontSize={text_sizes[1]} color="blue.200">
            In the future I hope to expand upon everything as a whole, from hardware to software.  I hope to see myself playing with embedded systems and making websites as easily as this website with more functionality.
        </Box>
    </Box>
</ChakraProvider>