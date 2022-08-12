<script >import Box from '../basic/Box.svelte';
import { current_component } from 'svelte/internal';
import { eventsForward } from '../../core/index.js';
const events = eventsForward(current_component);
export const direction = 'row';
</script>

<Box as="div" display="flex" flexDirection={direction} flexWrap="wrap" {events} {...$$props}>
	<slot />
</Box>
