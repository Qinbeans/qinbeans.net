<script >import Flex from './Flex.svelte';
import { current_component } from 'svelte/internal';
import { eventsForward } from '../../core/index.js';
const events = eventsForward(current_component);
export const spacing = 2;
export const orientation = null;
</script>

<Flex gap={spacing} direction={orientation === 'vertical' ? 'column' : 'row'} {events} {...$$props}>
	<slot />
</Flex>
