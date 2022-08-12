/** @typedef {typeof __propDef.props}  VisuallyHiddenProps */
/** @typedef {typeof __propDef.events}  VisuallyHiddenEvents */
/** @typedef {typeof __propDef.slots}  VisuallyHiddenSlots */
export default class VisuallyHidden extends SvelteComponentTyped<{
    [x: string]: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type VisuallyHiddenProps = typeof __propDef.props;
export type VisuallyHiddenEvents = typeof __propDef.events;
export type VisuallyHiddenSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
