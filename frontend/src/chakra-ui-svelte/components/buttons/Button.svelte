<script>
	import { current_component } from 'svelte/internal';
	import { eventsForward } from '../../core/index.js';

	import Box from '../basic/Box.svelte';

	const events = eventsForward(current_component);
</script>

<Box as="button" apply="Button" {events} variant="solid" {...$$props}>
	<slot />
</Box>
