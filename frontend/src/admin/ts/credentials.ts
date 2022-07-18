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

export const submit_credentials = (credentials: Credentials, mode: string) => {
    const local:string = import.meta.env.ACCESS
    const addr = (mode=="development")?"http://"+((local==null)?"localhost":local)+":5069/v1/login":"https://api.qinbeans.net/v1/login"
    const ws = (mode=="development")?"ws://"+((local==null)?"localhost":local)+":5069/v1/ws/":"wss://api.qinbeans.net/v1/ws/"
    console.log("Check:",addr,ws,mode)
    const form = to_form_data(credentials)
    //check if form is valid
    if (form.get('username') == null || form.get('token') == null) {
        console.log("invalid form")
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
        console.log(err)
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
        clearAdmin()
        return u
    })
}


export const updateAdmin = () => {
    user.subscribe(u => {
        localStorage.setItem('admin', JSON.stringify(u.creds))
    })
}

export const getAdmin = () => {
    const mode:string = import.meta.env.MODE
    const admin = localStorage.getItem('admin')
    if(admin == null) {
        return null
    }
    const creds:Credentials = JSON.parse(admin)
    return submit_credentials(creds, mode)
}

export const clearAdmin = () => {
    localStorage.removeItem('admin');
}
