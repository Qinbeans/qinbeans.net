export const pong = async (): Promise<number> => {
    //set timeout to 5 seconds
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 5000)
    const api = import.meta.env.API
    const http = import.meta.env.API_HTTP
    const port = import.meta.env.API_PORT
    // Testing deployment mode
    const addr = `${http}://${(port.length > 0)?`${api}:${port}`:api}/v1/ping`
    // Testing deployment mode
    // console.log("Fetching ping from: " + addr)
    const res = await fetch(addr, {
        method: 'GET',
        headers: {},
        mode: 'cors',
        signal: controller.signal
    })
    if (!res.ok) {
        throw  {
            type: "500",
            message: "Oops, the hamsters took a break.  Let's wait until they come back.",
        }
    }else{
        return 1//Typescript will complain if you don't return something
    }
}