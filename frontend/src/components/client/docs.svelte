<script lang="ts">
import { current } from '../../ts/store';
import { updateURL } from '../../ts/utils';
if(typeof window !== "undefined" && typeof window.location !== 'undefined') {
    current.update((x) => {
        let now = new Date();
        if(x.lastUpdate == undefined || now.getMilliseconds() - x.lastUpdate.getMilliseconds() > 60000) {
            x.lastUpdate = now;
            updateURL(1,true);
        }
        x.state = 1;
        return x
    })
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