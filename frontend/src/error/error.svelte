<script lang="ts">
    import Error from "../assets/error.svg";
    export let type: string;
    export let message: string;
</script>

<div class="error">
    <h1 class="error">Error-{type}</h1>
    <p class="error">
        {message}
        
    </p>
    <img class="error" src="{Error}" alt="baozi">
</div>