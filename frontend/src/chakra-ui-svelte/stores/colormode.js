import { derived } from 'svelte/store';
import { createStore } from '../utils/index.js';
export const colorMode = createStore(() => {
    let mode = 'light';
    if (typeof window !== 'undefined') {
        const system = window?.matchMedia('(prefers-color-scheme: dark)').matches;
        const storage = window?.localStorage.getItem('chakra-ui-color-mode') === 'dark';
        system || storage ? 'dark' : 'light';
    }
    return mode;
}, (mode) => {
    if (typeof window !== 'undefined') {
        window?.localStorage.setItem('chakra-ui-color-mode', mode);
    }
});
/** Checks if current colorMode is 'dark' or 'light' */
export const isDarkMode = derived(colorMode, (colorMode) => colorMode === 'dark');
/**
 * Here is a function similar to useColorModeValue
 *
 * @param light
 * @param dark
 * @returns
 */
export const colorModeValue = (light, dark) => {
    const store = createStore(() => light);
    colorMode.subscribe((val) => {
        store.set(val === 'light' ? light : dark);
    });
    return store;
};
