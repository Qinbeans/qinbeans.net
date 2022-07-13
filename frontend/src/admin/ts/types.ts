export interface Credentials {
    username: string;
    token: string;
}

export interface AdminUser {
    creds: Credentials;
    conn: WebSocket;
}