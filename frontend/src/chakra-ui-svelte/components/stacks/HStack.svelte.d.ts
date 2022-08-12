/** @typedef {typeof __propDef.props}  HStackProps */
/** @typedef {typeof __propDef.events}  HStackEvents */
/** @typedef {typeof __propDef.slots}  HStackSlots */
export default class HStack extends SvelteComponentTyped<{
    spacing?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type HStackProps = typeof __propDef.props;
export type HStackEvents = typeof __propDef.events;
export type HStackSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        spacing?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
