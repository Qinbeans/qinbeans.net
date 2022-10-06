<script lang="ts">
    import { getClient } from "../../ts/utils";
    import { current } from "../../ts/store";
    import init, { update_url } from "../../wasm-lib/pkg";

    if(typeof window !== "undefined" && typeof window.location !== 'undefined') {
        //check if user has pinged the server
        getClient();
        let now = new Date();
        let last = 0;
        current.subscribe((x) => {
            if(x.lastUpdate != undefined){
                let lastTime = new Date(x.lastUpdate)
                last = lastTime.getTime();
            }
        })
        if(now.getTime() - last > 60000) {
            init().then(() => {
                update_url(0, true);
            })
        }
    }

</script>

<div class="h-screen">
    <div class="absolute top-10 sm:top-11 pl-3 pr-3 sm:pl-24 sm:pr-24 justify-center scrollable z-10 text-pa">
        <div class="text-3xl sm:text-4xl text-center text-purple-500">Who Am I</div>
        <div class="text-md sm:text-2xl text-center text">
            My name is Ryan Fong.  I started off coding, if you can call visual languages like Scratch and Snap coding, in middle school.  I never imagined myself becoming a Computer Science major back then, but I think I'd be satisifed with the path I've chosen.
        </div>
        <br>
        <div class="text-md sm:text-2xl text-center text">
            Ever since I was probably a toddler, I've had a curiosity for things like climbing trees to see the world beyond what my height allowed me or playing with LEGOs to see what I could make.  I think this curiosity is what drove me to Computer Science and to this day, I play with just about anything I can get my hands on.  This website is probably proof that I still play with whatever I can get my hands on since it's built with some niche methods, but you can read all about it in my docs.
        </div>
        <br>
        <div class="text-md sm:text-2xl text-center text">
            Most of my childhood consisted of me playing sports, participating in Boy Scouts, and occasionally watching TV.  I spent a lot of time in Boy Scouts, and it probably contributes to my character as a person the most.  I rose to the rank of Eagle Scout at the age of 18, which while not impressive alone, I achieved that and was elected to the highest role offered by Boy Scout troops all within the same year.
        </div>
    </div>
    <div class="wai-img dark:opacity-75"></div>
</div>
<div class="h-screen">
    <div class="pl-3 pr-3 sm:pl-24 sm:pr-24 justify-center absolute scrollable z-10 text-pa">
        <div class="text-center text-3xl sm:text-4xl text-purple-400">Experiences</div>
        <div class="text-center text-md sm:text-2xl text">
            For most of my experience in coding, I've used C++, but I was also playing with other languages like Rust and Golang.  Prior to university, I used Java.  My Java is a little rusty, but I'm pretty sure I retained most of the important aspects.  I have a good amount of experience with machine learning and by extension Python.  Other than that, I have used Javascript, SCSS/CSS, HTML, Vue, and Svelte in making websites.
        </div>
    </div>
    <div class="exp-img dark:opacity-75"></div>
</div>
<div class="h-screen">
    <div class="pl-3 pr-3 sm:pl-24 sm:pr-24 justify-center absolute scrollable z-10 text-pa">
        <div class="text-center text-3xl sm:text-4xl text-purple-300">Ambitions And The Future</div>
        <div class="text-center text-md sm:text-2xl text">
            I aim to be a software engineer.  My intests currently are web development and mobile app design.  As for experience in those fields, I have used game engines like Unity and Cocos2D as well as Flutter to build  cross-platform mobile apps and I've used frameworks like Vue, Svelte, Django, Revel, Chi, Gin, and Actix.  I mostly enjoyed backend development in Go for its simplicity and speed.  For frontend, I'm stuck between Vue, Svelte, and Astro.  Svelte is the most straight forward and adding Astro to handle cases where Svelte might not be supported very well but Vue has a larger user base than Svelte and Astro.  I've slowly grown to like Astro + Svelte more and more, but I'm not committed to any single framework.
        </div>
        <br>
        <div class="text-center text-md sm:text-2xl text">
            In the future I hope to expand upon everything as a whole, from hardware to software.  I hope to see myself playing with embedded systems and making websites as easily as this website with more functionality.
        </div>
    </div>
    <div class="aatf-img dark:opacity-75"></div>
</div>