<script lang="ts">
    import { current } from "../../ts/store";
    import { getClient, updateURL } from "../../ts/utils";
    
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
        if(now.getTime() - last > 60000) {
            updateURL(3,true);
        }
    }

    const submit = () => {
        let email = (<HTMLInputElement>document.getElementById("email")).value;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            alert("Insert a valid email address")
            return
        }
        let content = (<HTMLInputElement>document.getElementById("content")).value;
        if(content.length < 10){
            alert("Please tell elaborate")
            return
        }
        let human = (<HTMLInputElement>document.getElementById("human")).checked
        if (!human) {
            alert("You aren't a human")
            return
        }
    }
</script>
<div class="grid place-content-center w-screen h-screen sm:h-5/6">
    <div class="grid place-content-center grid-cols-1 bg-slate-500 bg-opacity-60 dark:bg-black dark:bg-opacity-75 rounded-lg w-fit h-fit p-1.5 text-3xl sm:text-xl">
        <div class="text-pink-500 text-4xl sm:text-2xl">Contact</div>
        <label for="email">E-mail</label>
        <input id="email" class="pl-1.5 pr-1.5 mb-1.5 rounded-lg bg-gray-700" type="email" placeholder="someone@example.com" required>
        <label for="content">Content</label>
        <textarea class="pl-1.5 pr-1.5 rounded-lg bg-gray-700" name="content" id="content" cols="30" required></textarea>
        <div id="box-frame" class="flex justify-center">
            <label id="box-label" class="w-fit form-control" for="human">
                I Am Human
                <input class="checkbox bg-pink-500" type="checkbox" name="human" id="human" value="human">
            </label>
        </div>
        <button id="submit" class="shadow cursor-pointer pl-1.5 pr-1.5 rounded-lg bg-gray-400 dark:bg-zinc-600 text-pink-500 hover:border-2 border-solid border-pink-500" on:click={submit}>Submit</button>
    </div>
</div>