import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        spacing?: string | number;
        orientation?: 'horizontal' | 'vertical';
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type StackProps = typeof __propDef.props;
export declare type StackEvents = typeof __propDef.events;
export declare type StackSlots = typeof __propDef.slots;
export default class Stack extends SvelteComponentTyped<StackProps, StackEvents, StackSlots> {
    get spacing(): number;
    get orientation(): "horizontal" | "vertical";
}
export {};
