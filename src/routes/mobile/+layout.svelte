<script lang="ts">
	import { goto } from '$app/navigation';
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { AppBar } from '@skeletonlabs/skeleton';
    /** @type {import('./$types').LayoutServerData}*/
    export let data: any;
    let currentTile: string = (data != null && data.currentTile != null) ? data.currentTile : 'home';
    let activeRail = "app-slide-disabled";
    
    const handleRail = () => {
        activeRail = (activeRail == "app-slide-reverse" || activeRail == "app-slide-disabled") ? "app-slide" : "app-slide-reverse";
    }

    const handleRailChange = () => {
        if (currentTile == data.currentTile) {
            return
        }
        setTimeout(() => {
            goto(`/${currentTile}`)
        }, 500)
    }
</script>

{#if activeRail != 'app-rail-slide'}
    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" padding="p-1" class="text-white frosty fixed z-20 w-dvw bar {activeRail}" background="bg-black/25">	
        <svelte:fragment slot="lead">
                <button class="focus:bg-black/35 p-4 rounded-md" on:click={handleRail}>
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>       
        </svelte:fragment>
        Qinbeans/{data.currentTile.toUpperCase()}
    </AppBar>
{/if}

<main class="bg-image h-dvh w-dvw fixed text-center">
</main>

<AppRail background="bg-black/25" active="text-gray-300 bg-blue-400/30" height="h-dvh" on:change={handleRailChange} class="text-white frosty rounded-r-xl rail {activeRail}">
	<svelte:fragment slot="lead">
		<AppRailAnchor on:click={handleRail}>
            <svelte:fragment slot="lead">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </svelte:fragment>     
        </AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="home" value={'home'} title="home">
        <div class="h-full w-full grid place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>              
        </div>   
		<span class="text-xl">Home</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="blog" value={'blog'} title="blog">
        <div class="h-full w-full grid place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
        </div>      
		<span class="text-xl">Blog</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="projects" value={'projects'} title="projects">
        <div class="h-full w-full grid place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
        </div>
		<span class="text-md">Projects</span>
	</AppRailTile>
    <AppRailTile bind:group={currentTile} name="about" value={'about'} title="about">
        <div class="h-full w-full grid place-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
            </svg>              
        </div>
        <span class="text-xl">About</span>
    </AppRailTile>
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor>
            Contact Me
        </AppRailAnchor>
	</svelte:fragment>
</AppRail>
