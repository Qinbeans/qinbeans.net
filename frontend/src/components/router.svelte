<script>
    import { current } from "../ts/store";

    import { stateMap } from "../ts/types";
    import { getClient, updateClient } from "../ts/utils";
    // import { pong } from '../ts/verify'
    import init, { pong, update_url } from "../wasm-lib/pkg";
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
            init().then(() => {
                console.log(addr)
                if(state==-100){
                    state=0
                }
                current.update((x) => {
                    x.state = state;
                    x.addr = addr;
                    x.lastUpdate = now;
                    return x;
                });
                pong(addr,window.location.origin+"/error?code=500")
                .then((_)=>{
                    updateClient()
                    update_url(state,false)
                })
                .catch((e) => {
                    console.log(e)
                })
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