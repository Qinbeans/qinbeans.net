export interface AccordionData {
    title: string;
    content: string;
    open: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ProjectData {
    visibility: string;
    author: string;
    name: string;
    url: string;
    created_at: string;
    updated_at: string;
    language: string;
    readme: Readme;
    forked: boolean;
}

export interface Readme {
    full: string;
    short: string;
}

export interface Award {
    from: string;
    date: string;
    data: any;
}