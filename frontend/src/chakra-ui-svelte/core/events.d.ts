import type { SvelteComponent } from 'svelte';
export declare function eventsForward(component: SvelteComponent, additionalEvents?: string[]): (node: EventTarget) => {
    destroy: () => void;
};
