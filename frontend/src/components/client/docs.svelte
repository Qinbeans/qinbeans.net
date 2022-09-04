<script lang="ts">
    import { current } from '../../ts/store';
    import { getClient, updateURL } from '../../ts/utils';
    if(typeof window !== "undefined" && typeof window.location !== 'undefined') {
        //check if user has pinged the server
        getClient()
        let now = new Date();
        let last = 0;
        current.subscribe((x) => {
            if(x.lastUpdate != undefined){
                let lastTime = new Date(x.lastUpdate)
                last = lastTime.getTime();
            }
        })
        if(now.getTime() - last > 6000000) {
            updateURL(1,true);
        }
    }
</script>
<div class="w-full h-5/6 relative sm:mb-12 sm:p-2 sm:top-11 mb-15 p-1.5 top-10 min-h-fit">
    <div class="text-2xl text-center text-pink-500 underline">Docs</div>
    <div class="grid grid-cols-1 w-full gap-1">
        <iframe class="w-full h-full bg-slate-500 bg-opacity-60 dark:bg-black dark:bg-opacity-75 rounded-lg p-1.5" src="/docs/client/contact" frameborder="0" title="contact"></iframe>
        <div class="divider"/>
        <iframe class="w-full h-full bg-slate-500 bg-opacity-60 dark:bg-black dark:bg-opacity-75 rounded-lg p-1.5" src="/docs/admin/login" frameborder="0" title="login"></iframe>
        <div class="divider"/>
        <iframe class="w-full h-full bg-slate-500 bg-opacity-60 dark:bg-black dark:bg-opacity-75 rounded-lg p-1.5" src="/docs/admin/blog" frameborder="0" title="blog"></iframe>
    </div>
</div>