<script lang="ts">
    import { logout } from "../../ts/credentials";
</script>

<div class="col-start-2 col-span-2">
    <div class="grid grid-cols-2 w-full text-center">
        <div class="sm:text-lg text-md">
            🎉Welcome to the Admin Panel🎉
        </div>
        <div class="col-span-1 w-full text-end">
            <span class="shadow cursor-pointer pl-1.5 pr-1.5 rounded-lg dark:bg-gray-700 bg-gray-300 text-pink-500 hover:border-2 border-solid border-pink-500 w-fit h-fit" on:click={logout}>logout</span>
        </div>
    </div>
    <!-- Inbox -->
        <!-- rejected -->
        <!-- questionable -->
        <!-- approved -->
    <!-- end inbox -->
    <!-- Blog -->
        <!-- Title -->
        <!-- Content -->
        <!-- Image (serves as background image) -->
    <!-- end blog -->
</div>