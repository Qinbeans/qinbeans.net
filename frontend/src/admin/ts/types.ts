export interface Credentials {
    username: string;
    token: string;
}

export interface AdminUser {
    creds: Credentials;
    conn: WebSocket;
}

export enum AdminState {
    NONE = -1,
    LOGIN = 0,
    HOME = 1,
    BLOG = 2
}