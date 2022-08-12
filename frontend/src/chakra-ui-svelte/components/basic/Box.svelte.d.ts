import { SvelteComponentTyped } from "svelte";
import type { SvelteComponent } from 'svelte';
declare const __propDef: {
    props: {
        [x: string]: any;
        events?: (node: EventTarget) => {
            destroy: () => void;
        };
        as?: SvelteComponent | string;
        colormode?: "light" | "dark";
        apply?: string;
        props?: {};
    };
    events: {
        click: any;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type BoxProps = typeof __propDef.props;
export declare type BoxEvents = typeof __propDef.events;
export declare type BoxSlots = typeof __propDef.slots;
export default class Box extends SvelteComponentTyped<BoxProps, BoxEvents, BoxSlots> {
    get apply(): string;
}
export {};
