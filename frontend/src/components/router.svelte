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
        current.subscribe((x)=>{
            if (x.lastUpdate != undefined){
                let lastTime = new Date(x.lastUpdate)
                last = lastTime.getTime()
            }
        })
        if(now.getTime() - last > 60000) {
            pong(addr).catch((err) => {
                window.location.href = window.location.origin+"/error/?code="+err.type
            }).then((res) => {
                if(res == undefined) {
                    window.location.href = window.location.origin+"/error/?code=500"
                }
                current.update((x2) => {
                    if(state == -100){
                        if(exists === null || exists === undefined) {
                            state = 0
                        }
                    }
                    x2.state = state
                    let redirect = stateMap.get(state)
                    if(redirect != undefined){
                        redir = window.location.origin+"/"+redirect;
                    }
                    x2.lastUpdate = now
                    return x2
                })
                updateClient()
                window.location.href = redir
            })
        }else{
            current.update((x) => {
                if(state == -100){
                    if(exists === null || exists === undefined) {
                        state = 0
                    }
                }
                x.state = state
                let redirect = stateMap.get(state)
                if(redirect != undefined){
                    redir = window.location.origin+"/"+redirect;
                }
                x.lastUpdate = now
                return x
            })
            updateClient()
            window.location.href = redir
        }
    }
</script>

<Loading/>