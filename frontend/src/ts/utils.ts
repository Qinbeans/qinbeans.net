import { State, Client, stateMap } from "./types";
import { current } from "./store"
import { newClient } from "./types";

export const sleep = (ms: number) => {
    let now = new Date()
    let exitTime = now.getTime() + ms
    while (now.getTime() > exitTime) {}
}

export const updateURL = (state: State, load: boolean) => {
    if(load) {
        globalThis.location.href = globalThis.location.origin + "/loading/?backtrace=" + state;
    } else {
        globalThis.location.href = globalThis.location.origin + "/" + stateMap.get(state);
    }
}

export const updateClient = () => {
    current.subscribe(state => {
        //send json to localstorage
        globalThis.localStorage.setItem('client', JSON.stringify(state))
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
    let diff = 0
    let last = 0
    if(parsed != undefined && parsed.lastUpdate != undefined) {
        let parsedTime: Date = new Date(parsed.lastUpdate)
        last = parsedTime.getTime()
    }else{
        return null
    }
    diff = now.getTime() - last
    //if the client is more than an hour old, simply return null
    if(diff > 1000 * 60 * 60) {
        clearClient()
        return null
    }
    current.set(parsed)
    return parsed.page
}