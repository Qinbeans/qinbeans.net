<script>
    import { current } from "../ts/store";

    import { stateMap } from "../ts/types";
    import { getClient } from "../ts/utils";
    import { pong } from '../ts/verify'
    import Loading from './views/loading.svelte'

    export let addr = "";
    export let state = -100;
    let res = null;

    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
        current.update((x) => {
            let now = new Date();
            if(x.lastUpdate == undefined || now.getMilliseconds() - x.lastUpdate.getMilliseconds() > 60000) {
                pong(addr).catch((err) => {
                    console.log(err)
                    window.location.href = window.location.origin+"/error/?code="+err.type
                    return;
                }).then((res) => {
                    console.log("pong",res)
                    if(res == undefined) {
                        window.location.href = window.location.origin+"/error/?code=500"
                        return;
                    }
                    if(state == -100){
                        res = getClient()
                        if(res === null || res === undefined) {
                            state = 0
                        }
                    }else{
                        x.state = state
                    }
                    let redirect = stateMap.get(state)
                    if(redirect != undefined){
                        window.location.href = window.location.origin+"/"+redirect;
                    }
                    return
                })
                x.lastUpdate = Date.now();
            }
            return x
        })
        console.log("router", state);
    }
</script>

<Loading/>