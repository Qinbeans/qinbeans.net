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

export interface Client {
    state: State;
    page?: number;
    lastUpdate: Date;
}

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
