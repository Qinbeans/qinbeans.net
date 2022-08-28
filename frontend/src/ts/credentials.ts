import { handler } from './socketHandler'
import { user,admin,token } from "./store"
import type { Credentials } from "./types"
import { AdminState } from "./types"

export const new_credentials = (username: string, token: string) => {
    return {
        username,
        token
    };
}

export const new_connection = (socket: WebSocket, token: string) => {
    updateAdmin()
    return {
        socket,
        token
    };
}

const to_form_data = (credentials: Credentials) => {
    const form = new FormData()
    form.append('username', credentials.username)
    form.append('token', credentials.token)
    return form
}

export const submit_credentials = async (credentials: Credentials) => {
    const api:string = import.meta.env.API
    const http:string = import.meta.env.API_HTTP
    const ws_prot:string = import.meta.env.API_WS
    const port:string = import.meta.env.API_PORT
    const addr = `${http}://${(port.length > 0)?`${api}:${port}`:api}/v1/login`
    const ws = `${ws_prot}://${(port.length > 0)?`${api}:${port}`:api}/v1/ws/`
    const form = to_form_data(credentials)
    //check if form is valid
    if (form.get('username') == null || form.get('token') == null) {
        return null
    }
    // send post request to server
    return fetch(addr, {
        method: 'post',
        body: form
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
    }).then(json => {
        // save user and token to store
        const j_token = json.token
        admin.set(AdminState.HOME)
        token.set(j_token)
        alert("Login Successful")
        user.update( u => {
            u.creds = credentials
            u.conn = new_connection(new WebSocket(ws+j_token), j_token)
            return u
        })
        handler()
        return json.message
    }
    ).catch(err => {
        alert("Login failed")
        return err.response
    })
}

export const logout = () => {
    admin.set(AdminState.LOGIN)
    token.set("")
    user.update( u => {
        u.creds = new_credentials("","")
        if (u.conn != null) {
            u.conn.socket.close()
        }
        //check if local storage is available
        try{
            clearAdmin()
        }catch{
            console.log("local storage not available")
        }
        return u
    })
}


export const updateAdmin = () => {
    user.subscribe(u => {
        globalThis.localStorage.setItem('admin', JSON.stringify(u.creds))
    })
}

export const getAdmin = () => {
    const admin = globalThis.localStorage.getItem('admin')
    if(admin == null) {
        return null
    }
    const creds:Credentials = JSON.parse(admin)
    return submit_credentials(creds)
}

export const clearAdmin = () => {
    globalThis.localStorage.removeItem('admin');
}
