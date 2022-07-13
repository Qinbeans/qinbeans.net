<!-- Upload a new blog post, each entry gets a date using auto dating -->
<script lang="ts">
    let img_label = "Image?"
    const change_image = (e:any) => {
        const input = document.getElementById("img")
        input.click()
    }
    const changed_image = (e:Event) => {
        const file = e.target.files[0]
        if(file != null) {
            img_label = file.name
        }
    }
</script>
<!-- Send form to api of backend https://api.qinbeans.net/v1/post/blog/ -->
<div class="b-grid">
    <!-- Title -->
    <input class="x-5-3 y-1 bubble input" id="title" type="text" name="title" placeholder="Title">
    <!-- Content -->
    <textarea class="x-3-7 y-3-5 bubble input" id="content" name="content" placeholder="Content"></textarea>
    <!-- Image -->
    <label class="submit bubble x-5-3 y-9-1" for="image" on:click={change_image}>{img_label}</label>
    <input id="img" accept="image/*" type="file" name="image" hidden on:change={changed_image}>
    <!-- Submit -->
    <input class="submit x-5-3 y-11-1" type="submit" value="Submit">
</div>