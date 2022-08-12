import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type FlexProps = typeof __propDef.props;
export declare type FlexEvents = typeof __propDef.events;
export declare type FlexSlots = typeof __propDef.slots;
export default class Flex extends SvelteComponentTyped<FlexProps, FlexEvents, FlexSlots> {
    get direction(): "row";
}
export {};
