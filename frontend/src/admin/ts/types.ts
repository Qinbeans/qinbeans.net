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
    conn: Connection;
}

export const STATES = 2

export enum AdminState {
    NONE = -1,
    LOGIN = 0,
    HOME = 1,
    BLOG = 2
}
