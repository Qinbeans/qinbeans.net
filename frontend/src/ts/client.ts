import { current } from './store'
import type { Client } from './types'
import { newClient } from './types'

export const updateClient = (page?:number) => {
    current.subscribe(state => {
        //create a json
        const client:Client = newClient(state, page)
        //send json to localstorage
        localStorage.setItem('client', JSON.stringify(client))
    });
}

//returns a page number if there is one in sessionStorage, otherwise returns null
export const getClient = () => {
    const client = localStorage.getItem('client')
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
    current.set(parsed.state)
    return parsed.page
}

export const clearClient = () => {
    sessionStorage.removeItem('client');
}