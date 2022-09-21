import { current } from './store';

export const pong = async (addr: string): Promise<number> => {
    //set timeout to 5 seconds
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 5000)
    // const addr = mode === 'development' ? 'http://0.0.0.0:5069/v1/ping' : 'https://api.qinbeans.net/v1/ping'
    try{
        let res = await fetch(addr, {
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
    }catch(e){
        throw {
            type: "500",
            message: "Oops, the hamsters took a break.  Let's wait until they come back.",
        }
    }
}