import { user } from "./store"
import { logout } from "./credentials"

// enum Outgoing {
//     TEXT = 1,
//     BINARY = 2,
//     CLOSE = 8,
//     PING = 9,
//     PONG = 10,
// }

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const handler = async () => {
    let socket: WebSocket
    user.subscribe(async (u) => {
        const conn = u.conn
        if (conn === undefined) {//guard case
            return
        }
        socket = conn.socket
        //sleep until connection is established
        while (socket.readyState != 1) {
            await sleep(1000)
        }
        socket.onmessage = (event) => {
            //0x09 is ping
            switch (event.data[0]) {
                default: {
                    console.log("Unhandled message type: " + event.data[0])
                    break
                }
            }
        }
        //close connection if error
        socket.onerror = (event) => {
            logout()
        }
        //close connection if closed
        socket.onclose = (event) => {
            logout()
            return
        }
        socket.onopen = (event) => {
        }
        socket.send("c")
    })
}