export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    img: string;
}

export enum State {
    ERROR = -1,
    ABOUT = 0,
    DOCS = 1,
    BLOG = 2,
    CONTACT = 3,
}

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