//admin
export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    img: string;
}

export enum State {
    NONE = -100,
    LOADING = -2,
    ERROR = -1,
    ABOUT = 0,
    DOCS = 1,
    BLOG = 2,
    CONTACT = 3,
}


//admin
export const C_STATES = 3;

export interface Error {
    type?: string;
    message: string;
}

export const errMap = new Map<string, Error>([
    ["400", { type: "400", message: "Uh oh something went wrong.  Are you sure this is the way back?" }],
    ["404", { type: "404", message: "Are you lost?  Let's head back to safety :P" }],
    ["500", { type: "500", message: "I think someone let the monkey's loose in the lab 😨"}],
    ["503", { type: "503", message: "Whoops. Seems like that's not gonna work." }],
    ["504", { type: "504", message: "0_0" }],
    ["505", { type: "505", message: "These aren't the [protocols] you're looking for..." }],
]);

export interface Client {
    state: State;
    page?: number;
    lastUpdate?: Date;
}

//map of state to string
export const stateMap = new Map<State, string>([
    [State.ABOUT, "about"],
    [State.DOCS, "docs"],
    [State.BLOG, "blog"],
    [State.CONTACT, "contact"],
    [State.ERROR, "error"],
]);

export const newClient = (state: State, page?: number): Client => {
    if(page==null) {
        return {
            state: state,
            lastUpdate: new Date(),
        };
    }
    return {
        state,
        page,
        lastUpdate: new Date(),
    };
}

export interface Credentials {
    username: string;
    token: string;
}

export interface Connection {
    socket: WebSocket;
    token: string;
}

export interface AdminUser {
    creds: Credentials;
    conn?: Connection;
}

export const A_STATES = 2

export enum AdminState {
    NONE = -1,
    LOGIN = 0,
    HOME = 1,
    BLOG = 2
}
