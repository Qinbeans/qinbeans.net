<script >import { current_component } from 'svelte/internal';
import { eventsForward } from '../../core/index.js';
import Button from './Button.svelte';
import Icon from '../basic/Icon.svelte';
export let icon;
const events = eventsForward(current_component);
</script>

<Button {events} {...$$props}>
	<Icon as={icon} />
</Button>
