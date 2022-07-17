import { handler } from './socketHandler'
import { user,admin,token } from "./store"
import type { AdminUser,Credentials } from "./types"
import { AdminState } from "./types"

export const new_credentials = (username: string, token: string) => {
    return {
        username,
        token
    };
}

const to_form_data = (credentials: Credentials) => {
    const form = new FormData()
    form.append('username', credentials.username)
    form.append('token', credentials.token)
    return form
}

export const submit_credentials = (credentials: Credentials, mode: string) => {
    const local:string = import.meta.env.ACCESS
    const addr = (mode=="debug")?"http://"+((local==null)?"localhost":local)+":5069/v1/login":"https://api.qinbeans.net/v1/login"
    const ws = (mode=="debug")?"ws://"+((local==null)?"localhost":local)+":5069/v1/ws/":"wss://api.qinbeans.net/v1/ws/"
    const form = to_form_data(credentials)
    //check if form is valid
    if (form.get('username') == null || form.get('token') == null) {
        console.log("invalid form")
    }
    console.log(form, credentials)
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
            u.conn = new WebSocket(ws+j_token)
            return u
        })
        handler()
        return json.message
    }
    ).catch(err => {
        alert("Login failed")
        return err.response.data.message
    })
}

export const logout = () => {
    admin.set(AdminState.LOGIN)
    token.set("")
    user.update( u => {
        u.creds = new_credentials("","")
        if (u.conn != null) {
            u.conn.close()
        }
        return u
    })
}
