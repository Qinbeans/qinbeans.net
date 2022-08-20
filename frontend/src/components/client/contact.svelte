<script lang="ts">
</script>

<div class="grid place-content-center w-screen h-screen">
    <div class="grid place-content-center grid-cols-1 bg-black bg-opacity-75 rounded-lg w-fit h-fit p-1.5">
        <div class="text-pink-500 text-2xl">Contact</div>
        <label for="email">E-mail</label>
        <input class="pl-1.5 pr-1.5 mb-1.5 rounded-lg bg-gray-700" type="email" placeholder="someone@example.com">
        <label for="content">Content</label>
        <textarea class="pl-1.5 pr-1.5 rounded-lg bg-gray-700" name="content" id="content" cols="20" rows="10"></textarea>
        <div class="w-full text-center">
            <label for="human">I Am Human</label>
            <input type="checkbox" name="human" id="human" value="human">
        </div>
        <button class="cursor-pointer pl-1.5 pr-1.5 rounded-lg bg-gray-700 text-pink-500">Submit</button>
    </div>
</div>