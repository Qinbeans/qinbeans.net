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
    let conn: WebSocket
    user.subscribe(async (u) => {
        conn = u.conn.socket
        console.log(conn.readyState)
        //sleep until connection is established
        while (conn.readyState != 1) {
            console.log("waiting for connection")
            await sleep(1000)
        }
        console.log("connection established")
        conn.onmessage = (event) => {
            //0x09 is ping
            switch (event.data[0]) {
                default: {
                    console.log("Unhandled message type: " + event.data[0])
                    break
                }
            }
        }
        //close connection if error
        conn.onerror = (event) => {
            console.log("Error: " + event.type)
            logout()
        }
        //close connection if closed
        conn.onclose = (event) => {
            console.log("Closed: " + event.type)
            logout()
        }
        conn.onopen = (event) => {
            console.log("Connected: " + event.type)
        }
        conn.send("c")
    })
}