import { writable } from 'svelte/store';
import * as components from './components/index.js';
import core from './core/index.js';
const direction = 'ltr';
const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
    cssVarPrefix: 'chakra'
};
export const theme = {
    direction,
    components,
    ...core,
    config
};
export const themeStore = writable(theme);
themeStore.subscribe((newTheme) => {
    Object.assign(theme, newTheme);
});
export * from './theme.types.js';
export default theme;
