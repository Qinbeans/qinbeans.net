<!-- Upload a new blog post, each entry gets a date using auto dating -->
<script lang="ts">
    let img_label = "Image?"
    const change_image = () => {
        const input = document.getElementById("img")
        if(input != null)
            input.click()
    }
    const changed_image = (e:Event) => {
        let files = (<HTMLInputElement>e.target).files
        const file = (files != null)?files[0]:null
        if(file != null)
            img_label = file.name
    }
</script>
<!-- Send form to api of backend https://api.qinbeans.net/v1/post/blog/ -->
<div class="col-start-2 flex justify-center">
    <div class=" grid grid-cols-1 gap-1.5 w-fit h-fit dark:bg-black bg-gray-500 bg-opacity-75 dark:bg-opacity-75 rounded-lg pl-5 pr-5 pb-1.5">
        <div class="text-4xl sm:text-2xl text-pink-500">Upload Blog Post</div>
        <!-- Title -->
        <input class="pl-1.5 pr-1.5 rounded-lg dark:bg-gray-700 bg-gray-300" id="title" type="text" name="title" placeholder="Title">
        <!-- Content -->
        <textarea class="pl-1.5 pr-1.5 rounded-lg dark:bg-gray-700 bg-gray-300" id="content" name="content" placeholder="Content" cols="10" rows="2"></textarea>
        <!-- Image -->
        <label class="text-center shadow cursor-pointer pl-1.5 pr-1.5 rounded-lg dark:bg-gray-700 bg-gray-300 text-pink-500 hover:border-2 border-solid border-pink-500" for="image" on:click={change_image}>{img_label}</label>
        <input id="img" accept="image/*" type="file" name="image" hidden on:change={changed_image}>
        <!-- Submit -->
        <input class="shadow cursor-pointer pl-1.5 pr-1.5 rounded-lg dark:bg-gray-700 bg-gray-300 text-pink-500 hover:border-2 border-solid border-pink-500" type="submit" value="Submit">
    </div>
</div>