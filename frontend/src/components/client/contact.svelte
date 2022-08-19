<script lang="ts">
</script>

<div class="grid place-content-center w-screen h-screen">
    <div class="text-center bg-white bg-opacity-60 rounded-lg w-fit h-fit p-1.5">
        <label for="email">Contact</label>
        <input class="mb-1.5" type="email" placeholder="someone@example.com">
        <br>
        <label for="content">Content</label>
        <textarea name="content" id="content" cols="20" rows="10"></textarea>
        <br>
        <div>
            <label for="human">I Am Human</label>
            <input type="checkbox" name="human" id="human" value="human">
        </div>
        <div class="w-full relative justify-center">
            <button class="text-base bg-black bg-opacity-50 rounded-lg w-fit cursor-pointer pl-1.5 pr-1.5">Submit</button>
        </div>
    </div>
</div>