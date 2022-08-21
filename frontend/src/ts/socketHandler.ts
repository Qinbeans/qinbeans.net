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
            console.log("no connection")
            return
        }
        socket = conn.socket
        console.log(socket.readyState)
        //sleep until connection is established
        while (socket.readyState != 1) {
            // console.log("waiting for connection")
            await sleep(1000)
        }
        console.log("connection established")
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
            console.log("Error: " + event.type)
            logout()
        }
        //close connection if closed
        socket.onclose = (event) => {
            console.log("Closed: " + event.type)
            logout()
            return
        }
        socket.onopen = (event) => {
            console.log("Connected: " + event.type)
        }
        socket.send("c")
    })
}