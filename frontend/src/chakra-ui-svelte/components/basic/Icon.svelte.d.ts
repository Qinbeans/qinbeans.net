import { SvelteComponentTyped } from "svelte";
import type { SvelteComponent } from 'svelte';
declare const __propDef: {
    props: {
        [x: string]: any;
        as?: SvelteComponent | string;
        viewBox?: string;
        fill?: string;
        stroke?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type IconProps = typeof __propDef.props;
export declare type IconEvents = typeof __propDef.events;
export declare type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponentTyped<IconProps, IconEvents, IconSlots> {
}
export {};
