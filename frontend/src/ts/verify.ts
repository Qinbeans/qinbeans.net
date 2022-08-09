export const pong = async (): Promise<number> => {
    //set timeout to 5 seconds
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1000)
    const mode = import.meta.env.MODE
    const addr = mode === 'development' ? 'http://localhost:5069/v1/ping' : 'https://api.qinbeans.net/v1/ping'
    console.log("Fetching ping from: " + addr)
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