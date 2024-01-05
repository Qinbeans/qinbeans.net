<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-black/35" padding="p-1" class="fixed frosty w-dvw z-10">
	<svelte:fragment slot="lead">
		<a class="text-white text-lg button" href="/">Qinbeans</a>
	</svelte:fragment>
	<div class="flex gap-1 h-8 text-white text-lg">
		<a class="button" href="/about">About</a>
		<a class="button" href="/projects">Projects</a>
		<a class="button" href="/blog">Blog</a>
	</div>
	<svelte:fragment slot="trail">
		<a class="text-white text-lg button" href="/contact">Contact</a>
	</svelte:fragment>
</AppBar>

<div class="bg-image fixed h-dvh w-dvw z-0"></div>

<main class="h-dvh overflow-x-hidden scroll-smooth">
	<slot/>
</main>

<style lang="postcss">
	.button {
		@apply hover:bg-black/25 hover:text-gray-500 hover:rounded-md w-48 text-center py-1 ;
	}
</style>