<script lang="ts">
    import Card from '$lib/components/card.svelte';
    import Carasel from '$lib/components/carasel.svelte';
	import { Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw h-full py-14 px-1 holder overflow-y-scroll overflow-x-hidden scroll-smooth">
    <Card title="FAQ" title_class="text-3xl" inner_padding="px-[7%] py-4" author="" date="" doc_type="accordion" height="h-fill" background="bg-black/25" color="text-white" width="" enable_image={false}>
        <div class="w-full translate-x-1/2 py-2">
            <Avatar src="/assets/pfp.webp" alt="My profile picture" class="w-24 h-24 rounded-full object-cover object-center -translate-x-1/2"/>
        </div>
        <AccordionItem open>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    What is this website
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <h3 class="pl-1">Purpose</h3>
                <p class="pl-3">It's a place for me to share my thoughts and ideas. I will be posting about my projects, my thoughts, and my experiences.</p>
                <h3 class="pl-1">Philosophy</h3>
                <p class="pl-3">This website was designed to be highly modular and easy to update and deploy. An example of this modularity is the reuse of several components throughout the website--the website is essentially using a singlular component called "Card" that changes state based on content.</p> 
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    What did I use to make this website?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <p class="text-left pl-3">I used <a class="text-gray-200" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a>, <a class="text-gray-200" href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">TailwindCSS</a>, and <a class="text-gray-200" href="https://supabase.io" target="_blank" rel="noopener noreferrer">Supabase</a> to create this website. I used <a class="text-gray-200" href="https://skeleton.dev" target="_blank" rel="noopener noreferrer">Skeleton</a> components and styles to make the website look nice.</p>
                <p class="text-left underline pl-3">Images credits for backgrounds and some images to <a href="https://huggingface.co/Ojimi/anime-kawai-diffusion" target="_blank">Ojimi/anime-kawai-diffusion</a> and <a href="https://openai.com/research/dall-e" target="_blank">OpenAI's DALL-E</a></p>
                <p class="text-left pl-3">Since Github doesn't allow previews of their website in iframes for privacy reasons, I used <a href="https://https://docs.github.com/en/rest/apps?apiVersion=2022-11-28" target="_blank">GitHub's API</a> to scrape my projects for readmes and compile and load them into my website. The projects section loads into sessions as cache. The search function searches through this cache to find relevant information based one your query. Another option that was available was to use webhooks to get changes and update pre-compiled readmes, resulting in faster renders of my project readmes.</p>
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    Why can't I find your projects?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <p class="text-left pl-3">Not all my projects are punlic and I sometimes work in organizations, so those projects are not likely to show up here. I welcome anyone curious to go check out my github.</p>
                <p class="text-left pl-3">I have a lot of projects and I don't want to load them all at once as that could make you wait for minutes. I load them in sessions of 5 and you can load more by clicking the "Load more" button at the bottom of the page. This updates your sessions cache which might help you find the project you're looking for.</p>
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    What are some experiences I have?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <p class="text-left pl-3">I am a full-stack developer with a passion for creating beautiful and functional websites and applications. With 1+ years of experience in web development, I have worked with a variety of technologies including Vue, Svelte, Node.js, Javascript, Golang, Rust, and PostgreSQL.</p>
                <Carasel content={["/assets/examples/calculator.webp", "/assets/examples/bloomlabs.webp", "/assets/examples/editor.webp", "/assets/examples/login.webp", "/assets/examples/yabai.webp"]} height="h-fill" padding="p-0" inner_class="w-fit shrink-0 bg-transparent" image_class="h-[24rem] object-contain"/>
                <small class="text-gray-200">The conversation with the AI was a real test conversation using Pygmalion 14b</small>
                <Accordion>
                    <AccordionItem>
                        <svelte:fragment slot="summary">
                            <h3 class="underline decoration-black underline-offset-4">
                                Bloom Labs
                            </h3>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            Visit <a class="text-white" href="https://bloomlabs.ai" target="_blank" rel="noopener noreferrer">bloomlabs.ai</a> here.
                            <p class="text-left">
                                I worked mostly as an End-to-End developer, working on the frontend, backend, database, security, and deployment. It was a lot of fun and I learned a range of things from distributed systems with Golang to full-stack development with Sveltekit. Tools such as Supabase and Cloudflare Pages made it a lot easier for me to focus on creating the website and all it's APIs.
                            </p>
                            <p class="text-left">
                                While working for them, I worked with another developer to create the frontend—I hashed out getting all the APIs working with the website and he worked on cleaning the UI.
                            </p>
                            <p class="text-left">
                                In many cases I worked with testers to ensure that the website was working as intended—this would range from bugs to unexpected behavior.
                            </p>
                        </svelte:fragment>
                    </AccordionItem>
                    <AccordionItem>
                        <svelte:fragment slot="summary">
                            <h3 class="underline decoration-black underline-offset-4">
                                California State University, Chico - Wild Life
                            </h3>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <p class="text-left">
                                This was a school mock project where we were tasked to form groups and create an application that we could choose to form into a business. We chose to create a website that would allow users to upload pictures of plants they have seen and gather useful data like whether it was a potential irritant. The website would then use the location of the user to create a map of where dangerous plants have been seen.
                            </p>
                            <p class="text-left">
                                I worked a duel role as a fullstack developer and project manager. I worked with the team to create a plan and then I worked on the frontend and backend. I used Vue.js and Node.js to create the website and deployed with docker. As project manager, I worked with another team to handle the UI and UX as well as plan meetings to sync up on the project.
                            </p>
                        </svelte:fragment>
                    </AccordionItem>
                </Accordion>
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    Am I exclusively a web developer?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <p class="text-left pl-3">No, I am not. I have experience with C, C++, Java, Python, Rust, and Golang. I have worked on a variety of projects that range from games to console applications. You can find more projects in my <a class="text-gray-200" href="/projects">projects</a> page.</p>
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    What are my credentials?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <p class="pl-3 text-left">I attended <a class="text-gray-200" href="https://csuchico.edu" target="_blank" rel="noopener noreferrer">California State University, Chico</a> and graduated with a B.S. in Computer Science in 2023. My favorite class was Dr. Sam Siewert's <a class="text-gray-200" href="https://sites.google.com/mail.csuchico.edu/csci-551" target="_blank" rel="noopener noreferrer">Numerical and Parallel Programming</a> course followed by Dr. Kevin Buffardi's Software Engineering Course.</p>
            </svelte:fragment>
        </AccordionItem>
        <AccordionItem>
            <svelte:fragment slot="summary">
                <h2 class="underline decoration-black underline-offset-4">
                    How did I get into programming?
                </h2>
            </svelte:fragment>
            <svelte:fragment slot="content">
                <div class="pl-3 text-left">
                    <h3 class="underline decoration-black underline-offset-4">
                        Middle School
                    </h3>
                    <p>
                        I started coding around 11 years old when I was introduced to <a class="text-gray-200" href="https://scratch.mit.edu" target="_blank" rel="noopener noreferrer">Scratch</a>. I was fascinated by the idea of creating something from nothing and I was hooked.
                    </p>
                    <h3 class="underline decoration-black underline-offset-4">
                        High School
                    </h3>
                    <p>
                        I started learning more about programming and eventually started learning Python and Java, which really got me hooked. During my senior year of High School I made a piano app in Java and then created a Pokemon-like game with a few friends. I wasn't well versed in project management with source control so everything I made was lost or put into Google Drive.
                    </p>
                </div>
            </svelte:fragment>
        </AccordionItem>
    </Card>
</div>

<style>
    p {
        @apply text-sm;
    }
    h2 {
        @apply text-xl;
    }
    h3 {
        @apply text-lg;
    }
</style>