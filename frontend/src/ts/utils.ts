import { State, Client } from "./types";
import { current } from "./store"
import { newClient } from "./types";

export const updateURL = (state: State) => {
    globalThis.location.href = globalThis.location.origin + "?state=" + state;
}

export const updateClient = (page?:number) => {
    current.subscribe(state => {
        //create a json
        const client:Client = newClient(state, page)
        //send json to localstorage
        globalThis.localStorage.setItem('client', JSON.stringify(client))
    });
}

export const clearClient = () => {
    globalThis.localStorage.removeItem('client');
}

//returns a page number if there is one in sessionStorage, otherwise returns null
export const getClient = () => {
    let client = globalThis.localStorage.getItem('client')
    if(client == null) {
        return null
    }
    const parsed:Client = JSON.parse(client)
    const now = new Date()
    const old = new Date(parsed.lastUpdate)
    const diff = now.getTime() - old.getTime()
    //if the client is more than an hour old, simply return null
    if(diff > 1000 * 60 * 60) {
        clearClient()
        return null
    }
    console.log("Parsed State",parsed.state)
    current.set(parsed.state)
    return parsed.page
}

export const getStateFromQuery = (search: string) => {
    let query = new URLSearchParams(search);
    let state = query.get('state')
    if(state == null) {
        return State.NONE
    }
    switch (state) {
        case "0": //about
            return State.ABOUT
        case "1": //docs
            return State.DOCS;
        case "2": //blog
            return State.BLOG;
        case "3": //contact
            return State.CONTACT;
        default:
            return State.ERROR;
    }
}
