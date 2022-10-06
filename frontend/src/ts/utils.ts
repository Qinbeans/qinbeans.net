import type { Client } from "./types"
import { current } from "./store"

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
