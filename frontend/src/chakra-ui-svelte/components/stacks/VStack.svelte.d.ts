/** @typedef {typeof __propDef.props}  VStackProps */
/** @typedef {typeof __propDef.events}  VStackEvents */
/** @typedef {typeof __propDef.slots}  VStackSlots */
export default class VStack extends SvelteComponentTyped<{
    spacing?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type VStackProps = typeof __propDef.props;
export type VStackEvents = typeof __propDef.events;
export type VStackSlots = typeof __propDef.slots;
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
