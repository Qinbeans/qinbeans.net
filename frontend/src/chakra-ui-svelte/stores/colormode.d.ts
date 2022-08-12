declare type ColorMode = 'light' | 'dark';
export declare const colorMode: {
    set(this: void, value: ColorMode): void;
    update(this: void, updater: import("svelte/store").Updater<ColorMode>): void;
    subscribe(this: void, run: import("svelte/store").Subscriber<ColorMode>, invalidate?: (value?: ColorMode) => void): import("svelte/store").Unsubscriber;
    initial: ColorMode;
    get: any;
};
/** Checks if current colorMode is 'dark' or 'light' */
export declare const isDarkMode: import("svelte/store").Readable<boolean>;
/**
 * Here is a function similar to useColorModeValue
 *
 * @param light
 * @param dark
 * @returns
 */
export declare const colorModeValue: (light: unknown, dark: unknown) => {
    set(this: void, value: unknown): void;
    update(this: void, updater: import("svelte/store").Updater<unknown>): void;
    subscribe(this: void, run: import("svelte/store").Subscriber<unknown>, invalidate?: (value?: unknown) => void): import("svelte/store").Unsubscriber;
    initial: unknown;
    get: any;
};
export {};
