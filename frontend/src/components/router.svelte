<script>
    import { current } from "../ts/store";

    import { stateMap } from "../ts/types";
    import { getClient, updateClient } from "../ts/utils";
    import { pong } from '../ts/verify'
    import Loading from './views/loading.svelte'

    export let addr = "";
    export let state = -100;
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
        let redir = window.location.origin+"/about"
        let last = 0
        let now = new Date();
        let exists = getClient()
        console.log("Entering router:",now)
        current.subscribe((x)=>{
            if (x.lastUpdate != undefined){
                console.log("Getting time:",x.lastUpdate)
                let lastTime = new Date(x.lastUpdate)
                last = lastTime.getTime()
            }
            console.log("Time:",last)
        })
        console.log("Diff",now.getTime()-last)
        if(now.getTime() - last > 60000) {
            pong(addr).catch((err) => {
                console.log("Err",err)
                window.location.href = window.location.origin+"/error/?code="+err.type
            }).then((res) => {
                if(res == undefined) {
                    console.log("Err res is undefined")
                    window.location.href = window.location.origin+"/error/?code=500"
                }
                current.update((x2) => {
                    if(state == -100){
                        if(exists === null || exists === undefined) {
                            console.log("Unknown state")
                            state = 0
                        }
                    }
                    console.log("Updating state with value",x2.state,"to",state)
                    x2.state = state
                    let redirect = stateMap.get(state)
                    console.log("Redirect",redirect)
                    if(redirect != undefined){
                        redir = window.location.origin+"/"+redirect;
                    }
                    x2.lastUpdate = now
                    console.log("Updating time",x2.lastUpdate,now)
                    return x2
                })
                updateClient()
                window.location.href = redir
            })
        }else{
            console.log("Known user")
            current.update((x) => {
                if(state == -100){
                    if(exists === null || exists === undefined) {
                        console.log("Unknown state")
                        state = 0
                    }
                }
                x.state = state
                let redirect = stateMap.get(state)
                console.log("Redirect",redirect)
                if(redirect != undefined){
                    redir = window.location.origin+"/"+redirect;
                }
                x.lastUpdate = now
                return x
            })
            updateClient()
            console.log("Redirecting to",redir)
            window.location.href = redir
        }
        console.log("router", state,"redir",redir);
    }
</script>

<Loading/>