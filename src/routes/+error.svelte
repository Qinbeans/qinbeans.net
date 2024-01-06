<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import { page } from '$app/stores';
    // set a timer to redirect to the home page
    onMount(() => {
        if ($page.status === 500) return;
        setTimeout(() => {
            goto("/")
        }, 3000)
    })
</script>

<div class="grid place-content-center h-dvh w-dvw bg-image">
    <div class="text-center rounded-lg bg-white/15 frosty p-4">
        <h1 class="text-6xl font-bold">{$page.status}</h1>
        <h2 class="text-2xl font-bold">{$page.error?.message}</h2>
        <p class="text-xl">Redirecting to home page in 3 seconds...</p>
    </div>
</div>