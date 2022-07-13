<script lang="ts">
    import Blog from "./blog.svelte";
    import { admin, token } from "./ts/store";
    const logout = () => {
        //logout
        admin.set(0);
        token.set("");
        //implement logout in backend
    }
</script>

<div>
    <h1 class="h1">
        🎉Welcome to the Admin Panel🎉
    </h1>
    <span class="logout" on:click={logout}>logout</span>
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
    <Blog></Blog>
</div>