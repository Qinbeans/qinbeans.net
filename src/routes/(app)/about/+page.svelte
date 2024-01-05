<script lang="ts">
    import Card from '$lib/components/card.svelte';
    import Carasel from '$lib/components/carasel.svelte';
</script>

<div class="grid grid-cols-1 gap-3 grid-flow-row w-dvw py-24 px-96">
    <Card title="What is this website?" inner_padding="px-28 py-14" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-full" enable_image={false}>
        <p>
            It's a place for me to share my thoughts and ideas. I will be posting about my projects, my thoughts on various topics, and my experiences.
        </p>
        <h2 class="underline decoration-black underline-offset-4">
            What did I use to make this website?
        </h2>
        <p>
            I used <a class="text-gray-200" href="https://svelte.dev">SvelteKit</a>, <a class="text-gray-200" href="https://tailwindcss.com">TailwindCSS</a>, and <a class="text-gray-200" href="https://supabase.io">Supabase</a> to create this website. I used <a class="text-gray-200" href="https://skeletonlabs.com">Skeleton Labs</a> components and styles to make the website look nice.
        </p>
    </Card>
    <Card title="Who am I?" inner_padding="px-28 py-14" author="" date="" doc_type="document" height="h-fill" background="bg-black/25" color="text-white" width="w-full" enable_image={false}>
        <h2 class="underline decoration-black underline-offset-4">
            Experience & Projects
        </h2>
        <p>
            I am a full-stack developer with a passion for creating beautiful and functional websites and applications. With 1+ years of experience in web development, I have worked with a variety of technologies including Vue, Svelte, Node.js, and PostgreSQL.
        </p>
        <Carasel content={["/assets/examples/calculator.webp", "/assets/examples/bloomlabs.webp", "/assets/examples/editor.webp", "/assets/examples/login.webp", "/assets/examples/yabai.webp"]} height="h-fill" padding="p-0" inner_class="w-fill shrink-0" image_class="h-64 w-full object-contain"/>
        <div class="pl-5">
            <h3 class="underline decoration-black underline-offset-4">
                <a class="text-white" href="https://bloomlabs.ai">Bloom Labs</a>
            </h3>
            <p>
                I worked mostly as an End-to-End developer, working on the frontend, backend, database, security, and deployment. It was a lot of fun and I learned a range of things from distributed systems with Golang to full-stack development with Sveltekit. Tools such as Supabase and Cloudflare Pages made it a lot easier for me to focus on creating the website and all it's APIs.
            </p>
            <p>
                While working for them, I worked with another developer to create the frontend—I hashed out getting all the APIs working with the website and he worked on cleaning the UI.
            </p>
            <p>
                In many cases I worked with testers to ensure that the website was working as intended—this would range from bugs to unexpected behavior.
            </p>
        </div>
        <h2 class="underline decoration-black underline-offset-4">
            Education
        </h2>
        <p>
            I attended <a class="text-gray-200" href="https://csuchico.edu">California State University, Chico</a> and graduated with a B.S. in Computer Science in 2023. My favorite class was Dr. Sam Siewert's <a class="text-gray-200" href="https://sites.google.com/mail.csuchico.edu/csci-551">Numerical and Parallel Programming</a> course followed by Dr. Kevin Buffardi's Software Engineering Course.
        </p>
    </Card>
</div>

<style lang="postcss">
    a {
        @apply hover:text-blue-600;
    }
</style>