import { writable, get } from 'svelte/store';
/**
 * Creates a custom store for use by Chakra UI Svelte
 *
 * @param initialValue - The initial value of the store
 * @param subscription - A function that will be called when the store is updated
 * @returns
 */
export function createStore(initialValue, subscription = () => null) {
    const initial = initialValue();
    const store = writable(initial);
    store.subscribe(subscription);
    return {
        initial,
        get: get.bind({}, store),
        ...store
    };
}
