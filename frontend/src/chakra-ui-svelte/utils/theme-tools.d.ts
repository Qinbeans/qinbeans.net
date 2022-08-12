import type { Theme } from '../theme/index.js';
/**
 * Returns the value based on current theme color mode.
 *
 * @param light
 * @param dark
 * @returns
 */
export declare const mode: (light: unknown, dark: unknown) => (props: any) => unknown;
/**
 * Makes colors transparent
 *
 * @param color color to transform
 * @param opacity opacity to apply from 0 to 1
 * @returns
 */
export declare const transparentize: (color: string, opacity: number) => (theme: Theme) => string;
