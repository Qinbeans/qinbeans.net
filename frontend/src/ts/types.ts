export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    img: string;
}

export enum State {
    ABOUT = 0,
    DOCS = 1,
    BLOG = 2,
    CONTACT = 3,
}