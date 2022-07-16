import type { Error } from './types'

// We get mode to find which ip to use and GET request backend, if error, then return error
export const pong = async (): Promise<Error> => {
        const mode = import.meta.env.MODE
        const addr = mode === 'development' ? 'http://localhost:5069/v1/ping' : 'https://api.qinbeans.net/v1/ping'
        await fetch(addr, {
            method: 'GET',
            headers: {}
        }).then(res => {
            if (res.status === 200) {
                return res.text()
            } else {
                throw {
                    status: "500",
                    message: "Uh oh, the hamsters in the back must've taken a break."
                }
            }
        }).then(message => {
            if(message === 'pong') {
                return null
            }else {
                return new Error(message)
            }
        }).catch(err => {
            return err
        })
        return null//Typescript will complain if you don't return something
}