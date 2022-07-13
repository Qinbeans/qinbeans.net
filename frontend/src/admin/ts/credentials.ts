import axios, {AxiosResponse} from 'axios'
import { user,admin,token } from "./store"
import type { AdminUser,Credentials } from "./types"


export const new_credentials = (username: string, token: string) => {
    return {
        username,
        token
    };
}

const to_form_data = (credentials: Credentials) => {
    const form = new FormData()
    form.set('username', credentials.username)
    form.set('token', credentials.token)
    return form
}

export const submit_credentials = (credentials: Credentials, mode: string) => {
    const addr = (mode=="debug")?"http://localhost:5069/v1/login":"https://api.qinbeans.net/v1/login"
    const ws = (mode=="debug")?"ws://localhost:5069/v1/ws/":"wss://api.qinbeans.net/v1/ws/"
    const form = to_form_data(credentials)
    const headers = {'Content-Type': 'multipart/form-data'};
    axios.post(addr, form, {headers})
        .then((res: AxiosResponse) => {
            //set token
            //receives a json
            const json = res.data
            //get token
            const j_token = json.token
            //set token
            admin.set(1)
            token.set(j_token)
            alert("Login successful")
            user.update( u => {
                u.creds = credentials
                u.conn = new WebSocket(ws+j_token)
                return u
            })
            return json.message
        })
        .catch(err => {
            alert("Login failed")
            return err.response.data.message
        })
}